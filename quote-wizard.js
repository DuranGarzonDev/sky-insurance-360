(() => {
  'use strict';

  const dialog = document.querySelector('#quote-wizard');
  const form = dialog.querySelector('form');
  const content = dialog.querySelector('#wizard-content');
  const title = dialog.querySelector('#wizard-title');
  const progress = dialog.querySelector('#wizard-progress');
  const back = dialog.querySelector('#wizard-back');
  const next = dialog.querySelector('#wizard-next');
  const send = dialog.querySelector('#wizard-send');
  const flows = window.SKY_QUOTE_FLOWS;
  const currency = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
  const year = new Date().getFullYear();
  let flow, branch, stepIndex, values, context, trigger, previousFlow;

  const element = (tag, text, className) => {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (className) node.className = className;
    return node;
  };
  const visible = (item, source = values) => !item.when || source[item.when[0]] === item.when[1];
  const steps = () => (branch?.steps || flow.steps || []).filter(step => visible(step));

  function control(field, value) {
    const definitions = {
      plate: { type: 'text', pattern: '[A-Za-z0-9]{5,7}', maxLength: 7, placeholder: 'ABC123', autocomplete: 'off' },
      ciiu: { type: 'text', pattern: '[0-9]{4}', maxLength: 4, inputMode: 'numeric' },
      year: { type: 'number', min: 1900, max: year + 2 },
      number: { type: 'number', min: 0 },
      tel: { type: 'tel', pattern: '[+0-9 ]{7,20}', autocomplete: 'tel' },
      email: { type: 'email', autocomplete: 'email' },
      date: { type: 'date' },
      text: { type: 'text', maxLength: 120 }
    };
    const input = element(field.type === 'select' ? 'select' : field.type === 'textarea' ? 'textarea' : 'input');
    if (field.type === 'select') {
      input.append(new Option('Selecciona una opción', ''));
      for (const option of field.choices) input.append(new Option(option, option));
    } else if (field.type === 'textarea') {
      input.maxLength = 280;
      input.rows = 3;
    } else {
      Object.assign(input, definitions[field.type] || definitions.text);
    }
    input.required = !field.optional;
    if (field.max !== undefined) input.max = field.max;
    input.value = value ?? '';
    return input;
  }

  function listControl(field, items) {
    const root = element('fieldset', '', 'wizard-list');
    root.append(element('legend', field.label));
    const list = element('div', '', 'wizard-rows');
    const family = field.type === 'family';
    const definitions = family
      ? [{ key: 'relationship', label: 'Parentesco', type: 'select', choices: ['Cónyuge o pareja', 'Hijo/a', 'Padre o madre', 'Otro'] }, { key: 'birth', label: 'Fecha de nacimiento', type: 'date' }]
      : [{ key: 'plate', label: 'Placa', type: 'plate' }, { key: 'year', label: 'Modelo (año)', type: 'year' }, { key: 'lien', label: 'Prenda financiera', type: 'select', choices: ['No', 'Sí'] }];
    const add = (initial = {}) => {
      const row = element('div', '', 'wizard-row');
      for (const definition of definitions) {
        const label = element('label', definition.label);
        const input = control(definition, initial[definition.key]);
        input.dataset.rowField = definition.key;
        label.append(input);
        row.append(label);
      }
      const remove = element('button', 'Quitar', 'wizard-secondary');
      remove.type = 'button';
      remove.addEventListener('click', () => {
        row.remove();
        addButton.disabled = false;
        addButton.focus();
        if (!family && !list.children.length) add();
      });
      row.append(remove);
      list.append(row);
      addButton.disabled = list.children.length >= 10;
      return row;
    };
    const addButton = element('button', family ? '+ Agregar persona' : '+ Agregar vehículo', 'wizard-secondary');
    addButton.type = 'button';
    addButton.addEventListener('click', () => add().querySelector('input, select').focus());
    root.append(list, addButton);
    for (const item of items || (family ? [] : [{}])) add(item);
    return root;
  }

  function fieldControl(field) {
    const value = values[field.key];
    if (['fleet', 'family'].includes(field.type)) return listControl(field, value);
    if (field.type === 'checkboxes') {
      const group = element('fieldset', '', 'wizard-options');
      group.append(element('legend', field.label));
      for (const option of field.choices) {
        const label = element('label', '', 'wizard-check');
        const check = element('input');
        check.type = 'checkbox';
        check.value = option;
        check.checked = value?.includes(option) || false;
        label.append(check, option);
        group.append(label);
      }
      return group;
    }
    if (field.type === 'consent') {
      const label = element('label', '', 'wizard-check wizard-consent');
      const input = element('input');
      input.type = 'checkbox';
      input.required = true;
      input.checked = Boolean(value);
      label.append(input, field.label);
      return label;
    }
    const label = element('label', field.label + (field.optional ? ' (opcional)' : ''));
    label.append(control(field, value));
    return label;
  }

  function read(wrapper) {
    const type = wrapper.dataset.type;
    if (['fleet', 'family'].includes(type)) {
      return [...wrapper.querySelectorAll('.wizard-row')].map(row =>
        Object.fromEntries([...row.querySelectorAll('[data-row-field]')].map(input => [input.dataset.rowField, input.value.trim()])));
    }
    if (type === 'checkboxes') return [...wrapper.querySelectorAll('input:checked')].map(input => input.value);
    const input = wrapper.querySelector('input, select, textarea');
    if (type === 'consent') return input.checked;
    return type === 'plate' ? input.value.trim().toUpperCase() : input.value.trim();
  }

  function updateConditions() {
    const fields = [...content.querySelectorAll('[data-field]')];
    const current = { ...values };
    for (const wrapper of fields) current[wrapper.dataset.field] = read(wrapper);
    for (const wrapper of fields) {
      const field = steps()[stepIndex].fields.find(item => item.key === wrapper.dataset.field);
      wrapper.hidden = !visible(field, current);
      for (const input of wrapper.querySelectorAll('input, select, textarea')) input.disabled = wrapper.hidden;
    }
  }

  function save() {
    for (const wrapper of content.querySelectorAll('[data-field]:not([hidden])')) values[wrapper.dataset.field] = read(wrapper);
  }

  function summaryValue(field, value) {
    if (!value || (Array.isArray(value) && !value.length)) return '';
    if (field.type === 'fleet') return value.map(row => [row.plate.toUpperCase(), row.year, 'prenda ' + row.lien.toLowerCase()].join(' · ')).join('; ');
    if (field.type === 'family') return value.map(row => row.relationship + ' · ' + row.birth).join('; ');
    if (Array.isArray(value)) return value.join(', ');
    if (field.money) return currency.format(value);
    return value;
  }

  function rows() {
    return steps().flatMap(step => step.fields
      .filter(field => field.type !== 'consent' && visible(field))
      .map(field => [field.label, summaryValue(field, values[field.key])])
      .filter(([, value]) => value));
  }

  function showReview() {
    const details = rows();
    const list = element('dl', '', 'wizard-summary');
    if (context.insurer) details.unshift(['Aseguradora de preferencia', context.insurer]);
    for (const [label, value] of details) list.append(element('dt', label), element('dd', value));
    content.append(list);
    if (flow.documentHint) content.append(element('p', flow.documentHint, 'wizard-hint'));
    content.append(element('p', 'WhatsApp abrirá el mensaje preparado. Confirma el envío desde la conversación.', 'wizard-hint'));
    const message = ['Hola, equipo de Sky. Quiero solicitar una cotización de ' + (branch?.label || flow.title) + '.', '', ...details.map(([label, value]) => label + ': ' + value)].join('\n');
    send.href = 'https://wa.me/' + context.phone + '?text=' + encodeURIComponent(message);
  }

  function render() {
    const sequence = steps();
    const choosing = stepIndex === -1;
    const reviewing = !choosing && stepIndex === sequence.length;
    title.textContent = choosing ? flow.title : reviewing ? 'Revisa tu solicitud' : sequence[stepIndex].title;
    const offset = flow.countChoice ? 1 : 0;
    progress.textContent = choosing ? 'Elige qué quieres cotizar' : (branch?.label || flow.title) + ' · Paso ' + (stepIndex + offset + 1) + ' de ' + (sequence.length + offset + 1);
    content.replaceChildren();
    send.hidden = !reviewing;
    next.hidden = choosing || reviewing;
    next.textContent = stepIndex === sequence.length - 1 ? 'Revisar solicitud →' : 'Continuar →';
    back.hidden = choosing && !previousFlow;
    back.textContent = stepIndex <= 0 && !flow.choices ? 'Cerrar' : '← Volver';
    if (choosing) {
      const choices = element('div', '', 'wizard-choices');
      for (const option of flow.choices) {
        const button = element('button', '', 'wizard-choice');
        button.type = 'button';
        button.append(element('strong', option.label), element('span', option.description));
        button.addEventListener('click', () => {
          if (option.route) {
            previousFlow = flow;
            flow = flows[option.route];
            stepIndex = -1;
          } else {
            if (branch !== option) values = {};
            branch = option;
            stepIndex = 0;
          }
          render();
        });
        choices.append(button);
      }
      content.append(choices);
    } else if (reviewing) {
      showReview();
    } else {
      const grid = element('div', '', 'wizard-fields');
      for (const field of sequence[stepIndex].fields) {
        const wrapper = element('div', '', 'wizard-field');
        wrapper.dataset.field = field.key;
        wrapper.dataset.type = field.type;
        wrapper.append(fieldControl(field));
        grid.append(wrapper);
      }
      content.append(grid);
      updateConditions();
    }
    dialog.scrollTop = 0;
    title.focus({ preventScroll: true });
  }

  form.addEventListener('change', () => {
    if (steps()[stepIndex]) updateConditions();
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!steps()[stepIndex]) return;
    save();
    stepIndex++;
    render();
  });
  back.addEventListener('click', () => {
    if (stepIndex === -1 && previousFlow) {
      flow = previousFlow;
      previousFlow = null;
      branch = null;
      values = {};
    } else if (stepIndex === 0 && !flow.choices) {
      dialog.close();
      return;
    } else {
      save();
      stepIndex--;
    }
    render();
  });
  dialog.querySelector('[data-wizard-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    if (trigger?.isConnected) trigger.focus();
    content.replaceChildren();
    send.removeAttribute('href');
    values = {};
  });

  window.SkyQuotes = {
    has: key => Object.hasOwn(flows, key),
    open(key, options) {
      flow = flows[key];
      if (!flow || dialog.open) return;
      trigger = document.activeElement;
      context = options;
      values = {};
      branch = null;
      previousFlow = null;
      stepIndex = flow.choices ? -1 : 0;
      dialog.showModal();
      render();
    }
  };
})();
