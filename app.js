(() => {
  'use strict';

  const WHATSAPP_NUMBER = '573227931513';
  const PRODUCTS = {
    hogar: { title: 'Protege tu hogar', kicker: 'HOGAR', description: 'Opciones para cuidar tu vivienda y los bienes que hacen parte de ella.', coverages: [
      ['Seguro de hogar', 'Protección de la vivienda ante eventos cubiertos.'],
      ['Seguro de contenidos', 'Protección de los bienes que están dentro del hogar.'],
      ['Responsabilidad civil familiar', 'Respaldo ante daños a terceros según las condiciones de la póliza.']
    ]},
    muebles: { title: 'Protege tus muebles y enseres', kicker: 'HOGAR / CONTENIDOS', description: 'Protección para los bienes que forman parte de tu hogar.', coverages: [
      ['Muebles y enseres', 'Protección para muebles, decoración y objetos de uso cotidiano.'],
      ['Electrodomésticos', 'Respaldo para equipos y electrodomésticos según las coberturas contratadas.'],
      ['Objetos de valor', 'Alternativas para proteger bienes especiales declarados.']
    ]},
    empresa: { title: 'Protege tu empresa', kicker: 'EMPRESARIAL', description: 'Soluciones para proteger instalaciones, operación y responsabilidades del negocio.', coverages: [
      ['Seguro empresarial', 'Protección de bienes y operación empresarial.'],
      ['Responsabilidad civil empresarial', 'Respaldo ante reclamaciones de terceros.'],
      ['Transporte de mercancías', 'Protección de mercancías durante su traslado.']
    ]},
    construccion: { title: 'Protege tu proyecto', kicker: 'CONSTRUCCIÓN', description: 'Opciones para obras, equipos y riesgos propios de la construcción.', coverages: [
      ['Todo riesgo construcción', 'Protección de la obra durante su ejecución.'],
      ['Responsabilidad civil de obra', 'Respaldo frente a daños a terceros relacionados con el proyecto.']
    ]},
    transporte: { title: 'Protege tu carga', kicker: 'TRANSPORTE', description: 'Alternativas para camiones, carga y mercancías durante sus recorridos.', coverages: [
      ['Transporte de mercancías', 'Protección de la carga durante el traslado.'],
      ['Seguro para camiones', 'Coberturas para vehículos de transporte y su operación.']
    ]},
    responsabilidad: { title: 'Responsabilidad civil', kicker: 'RESPONSABILIDAD CIVIL', description: 'Respaldo frente a daños que puedan afectar a otras personas.', coverages: [
      ['Daños a terceros', 'Protección según los límites y condiciones de la póliza.'],
      ['Responsabilidad para motociclistas', 'Respaldo ante eventos cubiertos en la vía.'],
      ['Acompañamiento jurídico', 'Orientación jurídica en los eventos contemplados.']
    ]},
    'vida-salud': { title: 'Vida y salud', kicker: 'VIDA Y SALUD', description: 'Opciones para cuidar tu bienestar y proteger a quienes más importan.', coverages: [
      ['Seguro de vida', 'Protección económica para beneficiarios según la póliza contratada.'],
      ['Seguro de salud', 'Acceso a servicios de salud según el plan contratado.']
    ]},
    moto: { title: 'Protege tu moto', kicker: 'VEHÍCULOS / MOTO', description: 'Muévete con respaldo en cada trayecto.', coverages: [
      ['Seguro de moto', 'Protección para tu motocicleta según las coberturas contratadas.'],
      ['Responsabilidad civil para moto', 'Respaldo ante daños causados a terceros.']
    ]},
    carro: { title: 'Protege tu carro', kicker: 'VEHÍCULOS / CARRO', description: 'Alternativas para afrontar imprevistos en carretera.', coverages: [
      ['Seguro de auto', 'Protección para tu vehículo según las coberturas contratadas.'],
      ['Responsabilidad civil para auto', 'Respaldo ante daños causados a terceros.']
    ]},
    avion: { title: 'Protege tu avión', kicker: 'VEHÍCULOS / AVIACIÓN', description: 'Alternativas para aeronaves y responsabilidad aeronáutica.', coverages: [
      ['Seguro de aeronave', 'Protección para la aeronave según la póliza contratada.'],
      ['Responsabilidad civil aeronáutica', 'Respaldo ante riesgos frente a terceros.']
    ]},
    'construccion-transporte': { title: 'Construcción y transporte', kicker: 'PROYECTOS', description: 'Opciones para proteger obras y mercancías en movimiento.', coverages: [
      ['Todo riesgo construcción', 'Protección de la obra durante su ejecución.'],
      ['Transporte de mercancías', 'Protección de mercancías durante su traslado.']
    ]}
  };

  const ZONES = {
    empresa: { title: 'EMPRESARIAL', icon: 'building', product: 'empresa', route: 'empresa', benefits: ['Protección del patrimonio', 'Continuidad de la operación', 'Responsabilidad frente a terceros'] },
    hogar: { title: 'HOGAR', icon: 'house', route: 'hogar', product: 'hogar', benefits: ['Vivienda y contenidos', 'Daños accidentales cubiertos', 'Responsabilidad civil familiar'] },
    construccion: { title: 'CONSTRUCCIÓN', icon: 'hard-hat', product: 'construccion', benefits: ['Obra y maquinaria', 'Riesgos durante la ejecución', 'Responsabilidad civil de obra'] },
    vehiculos: { title: 'VEHÍCULOS', icon: 'car', route: 'vehiculos', product: 'carro', benefits: ['Autos y motocicletas', 'Daños y asistencia', 'Responsabilidad frente a terceros'] },
    transporte: { title: 'TRANSPORTE', icon: 'truck', product: 'transporte', benefits: ['Camiones y carga', 'Mercancías en movimiento', 'Coberturas según el recorrido'] },
    responsabilidad: { title: 'RESPONSABILIDAD CIVIL', icon: 'shield', product: 'responsabilidad', benefits: ['Daños a terceros', 'Protección para peatones y ciclistas', 'Responsabilidad en motocicletas', 'Acompañamiento jurídico'] },
    vida: { title: 'VIDA Y SALUD', icon: 'heart', product: 'vida-salud', benefits: ['Protección personal y familiar', 'Alternativas de atención en salud', 'Respaldo económico'] }
  };

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const sleep = (ms) => new Promise(resolve => window.setTimeout(resolve, ms));
  const iconSvg = name => `<svg class="ui-icon" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const main = $('#app-main');
  const worldHeader = $('#world-header');
  const worldFooter = $('#world-footer');
  const cityView = $('#city-view');
  const companyView = $('#company-view');
  const homeView = $('#home-view');
  const vehiclesView = $('#vehicles-view');
  const viewport = $('#city-viewport');
  const scene = $('#city-scene');
  const worldMenu = $('#world-menu');
  const zonePanel = $('#zone-panel');
  const overlay = $('#panel-overlay');
  const panel = $('#insurance-panel');
  const guide = $('#guide-overlay');
  const quoteButton = $('#quote-button');
  const quoteForm = $('#quote-form');
  const nameInput = $('#client-name');

  let currentProduct = null;
  let selectedZone = 'responsabilidad';
  let lastFocused = null;
  let suppressClick = false;
  let drag = null;
  let sceneSize = { width: 0, height: 0 };
  let pan = { x: 0, y: 0, scale: 1 };
  let cityNeedsLayout = false;
  let uiSounds = false;

  function updateScene() {
    scene.style.transform = `translate(${pan.x}px, ${pan.y}px) scale(${pan.scale})`;
  }

  function clampPan() {
    const w = viewport.clientWidth;
    const h = viewport.clientHeight;
    const contentW = sceneSize.width * pan.scale;
    const contentH = sceneSize.height * pan.scale;
    pan.x = contentW <= w ? (w - contentW) / 2 : Math.min(0, Math.max(w - contentW, pan.x));
    pan.y = contentH <= h ? (h - contentH) / 2 : Math.min(0, Math.max(h - contentH, pan.y));
  }

  function layoutScene() {
    const w = viewport.clientWidth;
    const h = viewport.clientHeight;
    const imageHeight = window.innerWidth <= 700 ? Math.max(520, h * .82) : Math.max(h, w / 2);
    sceneSize = { width: imageHeight * 2, height: imageHeight };
    scene.style.width = `${sceneSize.width}px`;
    scene.style.height = `${sceneSize.height}px`;
    pan.scale = window.innerWidth <= 700 ? 1.15 : 1.3;
    pan.x = (w - sceneSize.width * pan.scale) / 2;
    pan.y = (h - sceneSize.height * pan.scale) / 2;
    clampPan();
    updateScene();
  }

  function layoutDiscoveryScene() {
    const w = viewport.clientWidth;
    const h = viewport.clientHeight;
    const imageHeight = window.innerWidth <= 700 ? Math.max(520, h * .82) : Math.max(h, w / 2);
    sceneSize = { width: imageHeight * 2, height: imageHeight };
    scene.style.width = `${sceneSize.width}px`;
    scene.style.height = `${sceneSize.height}px`;
    pan.scale = Math.min(w / sceneSize.width, h / sceneSize.height);
    pan.x = (w - sceneSize.width * pan.scale) / 2;
    pan.y = (h - sceneSize.height * pan.scale) / 2;
    updateScene();
  }

  function zoomAt(factor, pointX = viewport.clientWidth / 2, pointY = viewport.clientHeight / 2) {
    const old = pan.scale;
    const next = Math.min(2.7, Math.max(1, old * factor));
    pan.x = pointX - (pointX - pan.x) * (next / old);
    pan.y = pointY - (pointY - pan.y) * (next / old);
    pan.scale = next;
    clampPan();
    updateScene();
  }

  viewport.addEventListener('pointerdown', (event) => {
    if (event.button !== 0 || !overlay.hidden || !guide.hidden || !vehiclesView.hidden) return;
    drag = { id: event.pointerId, startX: event.clientX, startY: event.clientY, x: pan.x, y: pan.y, moved: false };
    viewport.classList.add('dragging');
  });
  viewport.addEventListener('pointermove', (event) => {
    if (!drag || drag.id !== event.pointerId) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (Math.hypot(dx, dy) > 6 && !drag.moved) {
      drag.moved = true;
      viewport.setPointerCapture(event.pointerId);
    }
    if (!drag.moved) return;
    pan.x = drag.x + dx;
    pan.y = drag.y + dy;
    clampPan();
    updateScene();
  });
  function finishDrag(event) {
    if (!drag || drag.id !== event.pointerId) return;
    suppressClick = drag.moved;
    drag = null;
    viewport.classList.remove('dragging');
    if (suppressClick) window.setTimeout(() => { suppressClick = false; }, 100);
  }
  viewport.addEventListener('pointerup', finishDrag);
  viewport.addEventListener('pointercancel', finishDrag);
  viewport.addEventListener('wheel', (event) => {
    event.preventDefault();
    const box = viewport.getBoundingClientRect();
    zoomAt(event.deltaY < 0 ? 1.08 : .92, event.clientX - box.left, event.clientY - box.top);
  }, { passive: false });

  function layoutVehicles() {
    const svg = $('#vehicles-svg');
    const options = $$('.vehicle-option');
    if (window.innerWidth <= 700) {
      svg.setAttribute('viewBox', '0 0 340 1170');
      options[0].setAttribute('transform', 'translate(0 0)');
      options[1].setAttribute('transform', 'translate(-370 390)');
      options[2].setAttribute('transform', 'translate(-740 780)');
    } else {
      svg.setAttribute('viewBox', '0 0 1080 390');
      options.forEach(option => option.removeAttribute('transform'));
    }
  }

  function setWorldChrome(visible) {
    worldHeader.hidden = !visible;
    worldFooter.hidden = !visible;
  }

  function setView(view) {
    cityView.hidden = view !== 'city';
    companyView.hidden = view !== 'company';
    homeView.hidden = view !== 'home';
    vehiclesView.hidden = view !== 'vehicles';
    setWorldChrome(view === 'city');
    if (view === 'city' && cityNeedsLayout) {
      layoutScene();
      cityNeedsLayout = false;
    }
    if (view === 'vehicles') $('#back-to-city').focus();
  }

  window.addEventListener('resize', () => {
    if (cityView.hidden) cityNeedsLayout = true;
    else layoutScene();
    layoutVehicles();
    if (!companyView.hidden && companyState === 'arrived') layoutCompanyStage();
  });

  function selectZone(key, openOnMobile = true) {
    const zone = ZONES[key];
    if (!zone) return;
    selectedZone = key;
    $$('.hotspot-control').forEach(el => {
      const active = el.dataset.zone === key;
      el.classList.toggle('is-active', active);
      el.setAttribute('aria-pressed', String(active));
    });
    $$('.world-menu-list [data-zone]').forEach(el => {
      const active = el.dataset.zone === key;
      el.classList.toggle('is-active', active);
      el.setAttribute('aria-pressed', String(active));
    });
    $('#zone-icon').innerHTML = iconSvg(zone.icon);
    $('#zone-title').textContent = zone.title;
    $('#zone-benefits').replaceChildren(...zone.benefits.map(text => {
      const li = document.createElement('li');
      li.textContent = text;
      return li;
    }));
    $('#zone-action').innerHTML = `${zone.route === 'empresa' ? 'Iniciar recorrido' : zone.route === 'vehiculos' ? 'Explorar vehículos' : 'Conocer coberturas'} <span aria-hidden="true">→</span>`;
    if (openOnMobile && window.innerWidth <= 900) zonePanel.classList.add('is-open');
    worldMenu.classList.remove('is-open');
    $('#menu-toggle').setAttribute('aria-expanded', 'false');
    playUiSound(540);
  }

  function activateSelectedZone() {
    const zone = ZONES[selectedZone];
    if (zone.route === 'empresa') startCompanyJourney();
    else if (zone.route === 'hogar') startHomeJourney();
    else if (zone.route === 'vehiculos') setView('vehicles');
    else openProduct(zone.product);
  }

  function openProduct(key) {
    const product = PRODUCTS[key];
    if (!product) return;
    currentProduct = key;
    lastFocused = document.activeElement;
    $('#panel-kicker').textContent = product.kicker;
    $('#panel-title').textContent = product.title;
    $('#panel-description').textContent = product.description;
    const options = $('#coverage-options');
    options.replaceChildren();
    product.coverages.forEach(([name, description], index) => {
      const label = document.createElement('label');
      label.className = 'coverage-option';
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'coverage';
      input.value = name;
      input.checked = index === 0;
      const text = document.createElement('span');
      const strong = document.createElement('strong');
      const small = document.createElement('small');
      strong.textContent = name;
      small.textContent = description;
      text.append(strong, small);
      label.append(input, text);
      options.append(label);
    });
    quoteButton.hidden = false;
    quoteForm.hidden = true;
    quoteForm.reset();
    overlay.hidden = false;
    panel.querySelector('.close-btn').focus();
  }

  function closePanel() {
    overlay.hidden = true;
    currentProduct = null;
    if (lastFocused?.isConnected) lastFocused.focus();
  }
  let guideReturnFocus = null;
  function openGuide() {
    guideReturnFocus = document.activeElement;
    guide.hidden = false;
    guide.querySelector('.close-btn').focus();
  }
  function closeGuide() {
    guide.hidden = true;
    if (guideReturnFocus?.isConnected) guideReturnFocus.focus();
  }

  function playUiSound(frequency = 620) {
    if (!uiSounds) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(.035, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .08);
    oscillator.connect(gain).connect(ctx.destination);
    oscillator.start();
    oscillator.stop(ctx.currentTime + .08);
    oscillator.addEventListener('ended', () => ctx.close());
  }

  /* Recorrido Empresarial */
  const companyViewport = $('#company-viewport');
  const companyStage = $('#company-stage');
  const companyFrames = $$('.company-frame');
  const journeyProgress = $('#journey-progress-bar');
  const cinemaSpeed = $('.cinema-speed');
  const forwardTimes = [0, 650, 1320, 2050, 2780, 3480, 4160, 4760];
  const backwardTimes = [0, 330, 670, 1010, 1350, 1690, 2030, 2310];
  let companyState = 'idle';
  let companyAssetsPromise = null;
  let companySize = { width: 0, height: 0 };
  let companyPan = { x: 0, y: 0, scale: 1 };
  let companyDrag = null;

  function clampCompanyPan() {
    const w = companyViewport.clientWidth, h = companyViewport.clientHeight;
    const contentW = companySize.width * companyPan.scale, contentH = companySize.height * companyPan.scale;
    companyPan.x = contentW <= w ? (w - contentW) / 2 : Math.min(0, Math.max(w - contentW, companyPan.x));
    companyPan.y = contentH <= h ? (h - contentH) / 2 : Math.min(0, Math.max(h - contentH, companyPan.y));
  }
  function renderCompanyPan() { companyStage.style.transform = `translate(${companyPan.x}px, ${companyPan.y}px) scale(${companyPan.scale})`; }
  function centeredCompanyPan(scale = 1) { return { x: (companyViewport.clientWidth - companySize.width * scale) / 2, y: (companyViewport.clientHeight - companySize.height * scale) / 2, scale }; }
  function layoutCompanyStage() {
    const w = companyViewport.clientWidth, h = companyViewport.clientHeight;
    const imageHeight = window.innerWidth <= 700 ? Math.max(520, h * .82) : Math.max(h, w / 2);
    companySize = { width: imageHeight * 2, height: imageHeight };
    companyStage.style.width = `${companySize.width}px`;
    companyStage.style.height = `${companySize.height}px`;
    companyPan = centeredCompanyPan(1);
    clampCompanyPan();
    renderCompanyPan();
  }
  function zoomCompanyAt(factor, x = companyViewport.clientWidth / 2, y = companyViewport.clientHeight / 2) {
    const old = companyPan.scale, next = Math.min(2.7, Math.max(1, old * factor));
    companyPan.x = x - (x - companyPan.x) * (next / old);
    companyPan.y = y - (y - companyPan.y) * (next / old);
    companyPan.scale = next;
    clampCompanyPan();
    renderCompanyPan();
  }
  function preloadCompanyAssets() {
    if (companyAssetsPromise) return companyAssetsPromise;
    companyAssetsPromise = Promise.all(companyFrames.slice(1).map(frame => new Promise((resolve, reject) => {
      const element = frame.querySelector('img');
      if (element.src) { resolve(); return; }
      const image = new Image();
      image.onload = async () => {
        element.src = element.dataset.src;
        try { await element.decode?.(); } catch (_) {}
        resolve();
      };
      image.onerror = () => reject(new Error(`No se pudo cargar ${element.dataset.src}`));
      image.src = element.dataset.src;
    })));
    return companyAssetsPromise;
  }
  function ease(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function animateCompany(reverse, startingPan) {
    const order = reverse ? [7,6,5,4,3,2,1,0] : [0,1,2,3,4,5,6,7];
    const times = reverse ? backwardTimes : forwardTimes;
    const total = reverse ? 2550 : 5400;
    const fade = reverse ? 300 : 520;
    const center = centeredCompanyPan(1);
    if (reducedMotion.matches) {
      companyFrames.forEach((frame, i) => { frame.style.opacity = i === order[7] ? '1' : '0'; frame.style.transform = 'scale(1)'; });
      companyStage.style.transform = `translate(${reverse ? pan.x : center.x}px, ${reverse ? pan.y : center.y}px) scale(${reverse ? pan.scale : 1})`;
      journeyProgress.style.width = reverse ? '0%' : '100%';
      return Promise.resolve();
    }
    const started = performance.now();
    return new Promise(resolve => {
      function tick(now) {
        const t = Math.min(total, now - started);
        let segment = 0;
        while (segment < 7 && t >= times[segment + 1]) segment++;
        const nextTime = times[segment + 1] ?? total;
        const local = Math.min(1, Math.max(0, (t - times[segment]) / Math.max(1, nextTime - times[segment])));
        const blend = segment < 7 ? ease(Math.min(1, Math.max(0, (t - (nextTime - fade)) / fade))) : 0;
        companyFrames.forEach(item => { item.style.opacity = '0'; });
        const current = companyFrames[order[segment]];
        current.style.opacity = String(1 - blend);
        current.style.transform = `scale(${(segment === 7 ? 1.045 - .045 * ease(local) : 1.015 + .075 * ease(local)).toFixed(3)})`;
        if (segment < 7) {
          const next = companyFrames[order[segment + 1]];
          next.style.opacity = String(blend);
          next.style.transform = `scale(${(1.025 + .035 * blend).toFixed(3)})`;
        }
        let stagePan = center;
        if (t < times[1]) {
          const e = ease(t / times[1]);
          stagePan = { x: startingPan.x + (center.x - startingPan.x) * e, y: startingPan.y + (center.y - startingPan.y) * e, scale: startingPan.scale + (1 - startingPan.scale) * e };
        }
        if (reverse && t > times[7]) {
          const e = ease((t - times[7]) / (total - times[7]));
          stagePan = { x: center.x + (pan.x - center.x) * e, y: center.y + (pan.y - center.y) * e, scale: 1 + (pan.scale - 1) * e };
        }
        companyStage.style.transform = `translate(${stagePan.x}px, ${stagePan.y}px) scale(${stagePan.scale})`;
        cinemaSpeed.style.opacity = String(.13 * Math.sin(Math.PI * t / total));
        journeyProgress.style.width = `${reverse ? (1 - t / total) * 100 : (t / total) * 100}%`;
        if (t < total) requestAnimationFrame(tick);
        else {
          companyFrames.forEach((item, i) => { item.style.opacity = i === order[7] ? '1' : '0'; item.style.transform = 'scale(1)'; });
          cinemaSpeed.style.opacity = '0';
          resolve();
        }
      }
      requestAnimationFrame(tick);
    });
  }
  async function startCompanyJourney() {
    if (companyState !== 'idle') return;
    companyState = 'preparing';
    const departurePan = { ...pan };
    setView('company');
    layoutCompanyStage();
    companyFrames.forEach((frame, i) => { frame.style.opacity = i === 0 ? '1' : '0'; frame.style.transform = 'scale(1)'; });
    $('#company-travel-status').hidden = false;
    $('#company-arrival').hidden = true;
    companyViewport.inert = true;
    try {
      await preloadCompanyAssets();
      companyState = 'forward';
      companyView.classList.add('is-traveling');
      await animateCompany(false, departurePan);
      companyState = 'arrived';
      layoutCompanyStage();
      companyView.classList.remove('is-traveling');
      companyView.classList.add('is-arrived');
      $('#company-travel-status').hidden = true;
      $('#company-arrival').hidden = false;
      companyViewport.inert = false;
      $('#company-arrival button').focus();
    } catch (error) {
      console.error(error);
      companyState = 'idle';
      companyAssetsPromise = null;
      companyView.classList.remove('is-traveling', 'is-arrived');
      companyViewport.inert = false;
      $('#company-travel-status').hidden = true;
      setView('city');
      openProduct('empresa');
    }
  }
  async function returnCompanyJourney() {
    if (companyState !== 'arrived') return;
    companyState = 'reverse';
    companyView.classList.remove('is-arrived');
    companyView.classList.add('is-traveling');
    $('#company-arrival').hidden = true;
    $('#company-travel-status').hidden = false;
    $('#company-travel-status').textContent = 'Volviendo al Mundo Sky…';
    companyViewport.inert = true;
    await animateCompany(true, { ...companyPan });
    companyView.classList.remove('is-traveling');
    $('#company-travel-status').hidden = true;
    $('#company-travel-status').textContent = 'Entrando a Sky Insurance…';
    companyViewport.inert = false;
    companyState = 'idle';
    setView('city');
    $('#hotspot-empresa').focus();
  }
  companyViewport.addEventListener('pointerdown', event => {
    if (companyState !== 'arrived' || event.button !== 0) return;
    companyDrag = { id:event.pointerId, startX:event.clientX, startY:event.clientY, x:companyPan.x, y:companyPan.y, moved:false };
  });
  companyViewport.addEventListener('pointermove', event => {
    if (!companyDrag || companyDrag.id !== event.pointerId) return;
    if (Math.hypot(event.clientX-companyDrag.startX,event.clientY-companyDrag.startY)>6 && !companyDrag.moved) {
      companyDrag.moved=true; companyViewport.setPointerCapture(event.pointerId);
    }
    if (!companyDrag.moved) return;
    companyPan.x=companyDrag.x+event.clientX-companyDrag.startX; companyPan.y=companyDrag.y+event.clientY-companyDrag.startY;
    clampCompanyPan(); renderCompanyPan();
  });
  function endCompanyDrag(event) {
    if (!companyDrag || companyDrag.id !== event.pointerId) return;
    suppressClick=companyDrag.moved; companyDrag=null;
    if (suppressClick) setTimeout(()=>{suppressClick=false;},100);
  }
  companyViewport.addEventListener('pointerup',endCompanyDrag); companyViewport.addEventListener('pointercancel',endCompanyDrag);
  companyViewport.addEventListener('wheel',event=>{if(companyState!=='arrived')return;event.preventDefault();const b=companyViewport.getBoundingClientRect();zoomCompanyAt(event.deltaY<0?1.08:.92,event.clientX-b.left,event.clientY-b.top);},{passive:false});

  /* Recorrido Hogar */
  const homeTransition = $('#home-transition');
  const homeBackground = $('#home-background');
  const homeConfig = $('#home-config');
  const homeSummary = $('#home-summary');
  const HOME_ITEMS = {
    fachada: {
      techo: ['Techo', 'Protección de cubiertas ante eventos incluidos en la póliza.'],
      paredes: ['Paredes', 'Protección de muros y elementos estructurales declarados.'],
      ventanas: ['Ventanas', 'Cobertura para vidrios y elementos fijos declarados.'],
      puertas: ['Puertas y accesos', 'Protección de accesos y elementos instalados.'],
      pisos: ['Pisos y acabados', 'Respaldo para acabados permanentes de la vivienda.']
    },
    interior: {
      muebles: ['Muebles', 'Protección para sofás, mesas, sillas y mobiliario del hogar.'],
      terraza: ['Terraza', 'Protección para muebles y elementos de exterior previamente declarados.'],
      comedor: ['Comedor', 'Respaldo para mesa, sillas y mobiliario del comedor.'],
      decoracion: ['Decoración', 'Alternativas para objetos decorativos previamente declarados.'],
      sala: ['Sala', 'Protección para el conjunto de muebles y elementos de la sala.']
    }
  };
  const HOME_HOTSPOTS = {
    fachada: [
      ['techo','48%','10%','1'],['paredes','58%','39%','2'],['ventanas','47%','30%','3'],['puertas','49%','57%','4'],['pisos','49%','84%','5']
    ],
    interior: [
      ['terraza','35%','47%','1'],['comedor','69%','45%','2'],['muebles','16%','65%','3'],['decoracion','69%','27%','4'],['sala','55%','65%','5']
    ]
  };
  let homeState = 'idle';
  let homeMode = 'fachada';

  function rebuildHomeHotspots(mode) {
    const holder = $('#home-hotspots');
    holder.replaceChildren(...HOME_HOTSPOTS[mode].map(([key,x,y,number]) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.homeItem = key;
      button.style.setProperty('--x', x);
      button.style.setProperty('--y', y);
      const label = HOME_ITEMS[mode][key][0];
      button.innerHTML = `<span>${number}</span> ${label}`;
      return button;
    }));
  }

  function updateHomeEstimate() {
    const format = value => new Intl.NumberFormat('es-CO', { style:'currency', currency:'COP', maximumFractionDigits:0 }).format(value);
    const structureValue = Math.max(50000000, Number($('#home-building-value').value) || 1200000000);
    const contentsValue = Math.max(5000000, Number($('#home-contents-value').value) || 80000000);
    $('#home-structure-value').textContent = format(structureValue);
    $('#home-contents-summary').textContent = format(contentsValue);
    $('#home-estimated-value').textContent = format(structureValue + (homeMode === 'interior' ? contentsValue : 0));
  }

  function selectHomeItem(key) {
    const item = HOME_ITEMS[homeMode][key];
    if (!item) return;
    $$('#home-hotspots button').forEach(button => button.classList.toggle('is-active', button.dataset.homeItem === key));
    $('#home-item-title').textContent = item[0];
    $('#home-item-description').textContent = item[1];
    if (window.matchMedia('(max-width: 1180px), (max-height: 760px)').matches) homeSummary.classList.add('is-open');
  }

  function renderHomeMode(mode) {
    homeMode = mode;
    const interior = mode === 'interior';
    homeView.classList.toggle('is-interior', interior);
    homeBackground.src = interior ? 'assets/home/interior.webp' : 'assets/home/facade.webp';
    homeBackground.alt = interior ? 'Sala del mundo Hogar' : 'Fachada del mundo Hogar';
    homeView.classList.remove('is-questioning');
    $('#home-step-one').textContent = interior ? '✓' : '1';
    $('#home-step-one').classList.toggle('is-done', interior);
    $('#home-step-one').classList.toggle('is-active', !interior);
    $('#home-step-two').classList.toggle('is-active', interior);
    $('#home-step-label').textContent = 'Infraestructura';
    $('#home-config-kicker').textContent = interior ? 'PASO 2' : 'PASO 1';
    $('#home-config-title').textContent = interior ? 'Muebles y enseres' : 'Infraestructura';
    $('#home-structure-fields').hidden = interior;
    $('#home-contents-fields').hidden = !interior;
    $('#home-contents-line').hidden = !interior;
    $('#home-protection-count').textContent = interior ? '2' : '1';
    $('#home-back').textContent = interior ? '← Volver a infraestructura' : '← Volver al Mundo Sky';
    $('#home-continue').textContent = interior ? 'Agregar a mi protección →' : 'Confirmar y continuar →';
    $('#home-quote').textContent = interior ? 'Siguiente: Resumen →' : 'Siguiente: Muebles y enseres →';
    $$('.home-bottom-nav [data-home-section]').forEach(button => button.classList.toggle('is-active', button.dataset.homeSection === (interior ? 'muebles' : 'infraestructura')));
    rebuildHomeHotspots(mode);
    selectHomeItem(interior ? 'muebles' : 'techo');
    homeConfig.classList.remove('is-open'); homeSummary.classList.remove('is-open');
    updateHomeEstimate();
  }

  function showHomeQuestion() {
    if (homeState !== 'facade') return;
    homeView.classList.add('is-questioning');
    $('#home-step-one').textContent = '✓';
    $('#home-step-one').classList.replace('is-active', 'is-done');
    $('#home-step-two').classList.add('is-active');
    homeBackground.src = 'assets/home/portal.webp';
    homeBackground.alt = 'Portal de ingreso al interior del mundo Hogar';
    $('#home-question').hidden = false;
    $('#home-no-furniture').focus();
  }

  function closeHomeQuestion() {
    $('#home-question').hidden = true;
    homeView.classList.remove('is-questioning');
    if (homeMode === 'fachada') {
      $('#home-step-one').textContent = '1';
      $('#home-step-one').classList.remove('is-done');
      $('#home-step-one').classList.add('is-active');
      $('#home-step-two').classList.remove('is-active');
      homeBackground.src = 'assets/home/facade.webp';
      homeBackground.alt = 'Fachada del mundo Hogar';
    }
  }

  function playHomeVideo(source) {
    homeState = 'transition';
    homeView.classList.add('is-transitioning');
    homeTransition.src = source;
    homeTransition.classList.add('is-playing');
    homeTransition.currentTime = 0;
    return new Promise(resolve => {
      let finished = false;
      const done = () => {
        if (finished) return;
        finished = true;
        homeTransition.removeEventListener('ended', done);
        homeTransition.removeEventListener('error', done);
        homeTransition.classList.remove('is-playing');
        homeView.classList.remove('is-transitioning');
        homeTransition.removeAttribute('src');
        homeTransition.load();
        resolve();
      };
      homeTransition.addEventListener('ended', done, { once:true });
      homeTransition.addEventListener('error', done, { once:true });
      homeTransition.play().catch(done);
    });
  }

  async function startHomeJourney() {
    if (homeState !== 'idle') return;
    setView('home');
    renderHomeMode('fachada');
    await playHomeVideo('assets/home/enter-home.mp4');
    homeState = 'facade';
    $('#home-back').focus();
  }

  async function enterHomeInterior() {
    if (homeState !== 'facade') return;
    closeHomeQuestion();
    await playHomeVideo('assets/home/enter-interior.mp4');
    renderHomeMode('interior');
    homeState = 'interior';
  }

  async function leaveHomeJourney() {
    if (homeState === 'transition') return;
    closeHomeQuestion();
    if (homeState === 'interior') {
      await playHomeVideo('assets/home/leave-interior.mp4');
      renderHomeMode('fachada');
      homeState = 'facade';
      return;
    }
    if (homeState === 'facade') await playHomeVideo('assets/home/leave-home.mp4');
    homeState = 'idle';
    setView('city');
    $('#hotspot-hogar').focus();
  }

  $('#home-back').addEventListener('click', leaveHomeJourney);
  $('#home-hotspots').addEventListener('click', event => { const button=event.target.closest('[data-home-item]');if(button)selectHomeItem(button.dataset.homeItem); });
  $('#home-area').addEventListener('input', () => { $('#home-building-value').value = Math.max(20, Number($('#home-area').value) || 250) * 4800000; updateHomeEstimate(); });
  $('#home-building-value').addEventListener('input', updateHomeEstimate);
  $('#home-contents-value').addEventListener('input', updateHomeEstimate);
  $$('.property-type button').forEach(button => button.addEventListener('click', () => { $$('.property-type button').forEach(item=>item.classList.toggle('is-active',item===button));updateHomeEstimate(); }));
  $('#home-continue').addEventListener('click', () => { if(homeMode==='interior')openProduct('muebles');else showHomeQuestion(); });
  $('#home-yes-furniture').addEventListener('click', enterHomeInterior);
  $('#home-no-furniture').addEventListener('click', () => { closeHomeQuestion();openProduct('hogar'); });
  $('#home-quote').addEventListener('click', () => { if (homeMode === 'interior') openProduct('muebles'); else showHomeQuestion(); });
  $('#home-protection').addEventListener('click', () => {homeConfig.classList.remove('is-open');homeSummary.classList.add('is-open');});
  $('#home-help').addEventListener('click', openGuide);
  $('#home-assistance').addEventListener('click', () => openProduct('hogar'));
  $('#open-home-config').addEventListener('click', () => {homeSummary.classList.remove('is-open');homeConfig.classList.add('is-open');});
  $('#open-home-summary').addEventListener('click', () => {homeConfig.classList.remove('is-open');homeSummary.classList.add('is-open');});
  $$('[data-close-home-config]').forEach(button => button.addEventListener('click',()=>homeConfig.classList.remove('is-open')));
  $$('[data-close-home-summary]').forEach(button => button.addEventListener('click',()=>homeSummary.classList.remove('is-open')));
  $$('.home-bottom-nav [data-home-section]').forEach(button => button.addEventListener('click', async () => {
    if(button.dataset.homeSection==='muebles'&&homeState==='facade')showHomeQuestion();
    if(button.dataset.homeSection==='infraestructura'&&homeState==='interior')await leaveHomeJourney();
  }));

  /* Eventos de interfaz */
  document.addEventListener('click', event => {
    if (suppressClick) { event.preventDefault(); return; }
    if (event.target.closest('[data-close-guide]')) { closeGuide(); return; }
    if (event.target.closest('[data-close-panel]')) { closePanel(); return; }
    const zoneTarget = event.target.closest('[data-zone]');
    if (zoneTarget) {
      if (zoneTarget.dataset.zone === 'empresa') startCompanyJourney();
      else if (zoneTarget.dataset.zone === 'hogar') startHomeJourney();
      else selectZone(zoneTarget.dataset.zone);
      return;
    }
    const target = event.target.closest('[data-product],[data-route]');
    if (!target) return;
    if (target.dataset.route === 'vehiculos') {
      companyState = 'idle';
      companyView.classList.remove('is-arrived');
      setView('vehicles');
      return;
    }
    openProduct(target.dataset.product);
  });
  $('#zone-action').addEventListener('click', activateSelectedZone);
  $('#advisor-button').addEventListener('click', () => openProduct(ZONES[selectedZone].product));
  $('#quick-quote').addEventListener('click', () => openProduct(ZONES[selectedZone].product));
  $('#open-guide').addEventListener('click', openGuide);
  $('#close-guide-cta').addEventListener('click', closeGuide);
  $('#menu-toggle').addEventListener('click', () => {
    const open = !worldMenu.classList.contains('is-open');
    worldMenu.classList.toggle('is-open', open);
    $('#menu-toggle').setAttribute('aria-expanded', String(open));
  });
  $('#close-world-menu').addEventListener('click', () => { worldMenu.classList.remove('is-open'); $('#menu-toggle').setAttribute('aria-expanded','false'); });
  $('#close-zone-panel').addEventListener('click', () => zonePanel.classList.remove('is-open'));
  $('#sound-toggle').addEventListener('click', event => {
    uiSounds = !uiSounds;
    event.currentTarget.setAttribute('aria-pressed', String(uiSounds));
    event.currentTarget.setAttribute('aria-label', uiSounds ? 'Desactivar sonidos' : 'Activar sonidos');
    event.currentTarget.classList.toggle('is-muted', !uiSounds);
    playUiSound(680);
  });
  $('#home-link').addEventListener('click', event => {
    event.preventDefault();
    if (!overlay.hidden) closePanel();
    if (!guide.hidden) closeGuide();
    if (companyState === 'arrived') { returnCompanyJourney(); return; }
    if (!homeView.hidden) { leaveHomeJourney(); return; }
    setView('city'); layoutScene(); selectZone('responsabilidad', false);
  });
  $('#back-to-city').addEventListener('click', () => setView('city'));
  $('#company-back').addEventListener('click', returnCompanyJourney);
  $('#zoom-in').addEventListener('click', () => zoomAt(1.2));
  $('#zoom-out').addEventListener('click', () => zoomAt(1/1.2));
  $('#zoom-reset').addEventListener('click', layoutScene);
  $('#company-zoom-in').addEventListener('click', () => zoomCompanyAt(1.2));
  $('#company-zoom-out').addEventListener('click', () => zoomCompanyAt(1/1.2));
  $('#company-zoom-reset').addEventListener('click', layoutCompanyStage);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !overlay.hidden) { closePanel(); return; }
    if (event.key === 'Escape' && !guide.hidden) { closeGuide(); return; }
    if (event.key === 'Escape' && worldMenu.classList.contains('is-open')) { worldMenu.classList.remove('is-open'); return; }
    if (event.key === 'Escape' && zonePanel.classList.contains('is-open')) { zonePanel.classList.remove('is-open'); return; }
    if (event.key === 'Escape' && companyState === 'arrived') { returnCompanyJourney(); return; }
    if (event.key === 'Escape' && !homeView.hidden) {
      if (!$('#home-question').hidden) { closeHomeQuestion(); return; }
      leaveHomeJourney(); return;
    }
    if (event.key === 'Escape' && !vehiclesView.hidden) { setView('city'); return; }
    if (document.activeElement === viewport && ['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)) {
      event.preventDefault();
      if(event.key==='ArrowLeft')pan.x+=65;if(event.key==='ArrowRight')pan.x-=65;if(event.key==='ArrowUp')pan.y+=65;if(event.key==='ArrowDown')pan.y-=65;
      clampPan();updateScene();return;
    }
    if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('.hotspot-control,.vehicle-option,.service-hotspot')) {
      event.preventDefault();event.target.click();return;
    }
    const activeDrawer = !overlay.hidden ? panel : (!guide.hidden ? guide.querySelector('.guide-panel') : null);
    if (event.key === 'Tab' && activeDrawer) {
      const focusable = $$('button:not([hidden]),input:not([hidden])').filter(el => activeDrawer.contains(el) && el.offsetParent !== null);
      const first=focusable[0],last=focusable[focusable.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    }
  });

  quoteButton.addEventListener('click', () => { quoteButton.hidden=true;quoteForm.hidden=false;nameInput.focus(); });
  quoteForm.addEventListener('submit', event => {
    event.preventDefault();
    const name=nameInput.value.trim().replace(/\s+/g,' ');
    if(!name){nameInput.setCustomValidity('Escribe tu nombre.');nameInput.reportValidity();return;}
    nameInput.setCustomValidity('');
    const coverage=panel.querySelector('input[name="coverage"]:checked')?.value;
    if(!coverage||!currentProduct)return;
    const homeDetail = currentProduct === 'hogar'
      ? ` El valor declarado de la infraestructura es ${$('#home-structure-value').textContent}.`
      : currentProduct === 'muebles'
        ? ` Los valores declarados son ${$('#home-structure-value').textContent} para infraestructura y ${$('#home-contents-summary').textContent} para muebles y enseres.`
        : '';
    const message=`Hola, equipo de Sky. Soy ${name}, estoy interesado en adquirir un ${coverage} y me gustaría recibir una cotización.${homeDetail}`;
    window.location.assign(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`);
  });
  nameInput.addEventListener('input',()=>nameInput.setCustomValidity(''));

  /* Orden de entrada: carga -> video -> puntos uno a uno -> señal de paneo -> interfaz completa */
  const loadingScreen=$('#loading-screen'),progress=$('#loading-progress'),loadingMessage=$('#loading-message'),retry=$('#loading-retry');
  const introFilm=$('#intro-film'),introVideo=$('#intro-video'),playFilm=$('#play-film');
  let introFinished=false;
  function mediaReady(element,successEvent) {
    return new Promise(resolve => {
      if (element instanceof HTMLMediaElement && element.error) { resolve(false); return; }
      if ((element instanceof HTMLImageElement && element.complete) || (element instanceof HTMLVideoElement && element.readyState >= 2)) { resolve(true); return; }
      const ok=()=>{cleanup();resolve(true);},bad=()=>{cleanup();resolve(false);};
      const cleanup=()=>{element.removeEventListener(successEvent,ok);element.removeEventListener('error',bad);};
      element.addEventListener(successEvent,ok,{once:true});element.addEventListener('error',bad,{once:true});
    });
  }
  async function enterDiscovery() {
    if(introFinished)return;
    introFinished=true;
    introVideo.pause();
    introFilm.style.opacity='0';
    await sleep(reducedMotion.matches?0:650);
    introFilm.hidden=true;
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-discovering');
    setView('city');
    layoutDiscoveryScene();
    const hotspots=$$('.hotspot-control');
    hotspots.forEach(item=>item.classList.remove('is-revealed'));
    for(const hotspot of hotspots){
      hotspot.classList.add('is-revealed');
      await sleep(reducedMotion.matches?20:390);
    }
    const cue=$('#discovery-cue');
    cue.classList.add('is-visible');
    scene.classList.add('is-shaking');
    await sleep(reducedMotion.matches?50:1450);
    scene.classList.remove('is-shaking');
    cue.classList.remove('is-visible');
    scene.classList.add('is-entering-world');
    layoutScene();
    await sleep(reducedMotion.matches?20:720);
    scene.classList.remove('is-entering-world');
    document.body.classList.remove('is-discovering');
    document.body.classList.add('is-ready');
    worldHeader.inert=false;worldFooter.inert=false;main.inert=false;
    selectZone('responsabilidad',false);
  }
  async function showFilm(videoAvailable) {
    progress.style.width='100%';
    loadingMessage.textContent='Todo listo';
    await sleep(450);
    loadingScreen.hidden=true;
    if(!videoAvailable){enterDiscovery();return;}
    introFilm.hidden=false;
    introFilm.style.opacity='1';
    try{await introVideo.play();}catch(_){playFilm.hidden=false;playFilm.focus();}
  }
  async function loadExperience() {
    retry.hidden=true;progress.style.width='8%';loadingMessage.textContent='Preparando tu experiencia 360°';
    const cityImage=new Image();cityImage.src='assets/city-master.webp';
    progress.style.width='52%';
    const videoPromise=mediaReady(introVideo,'loadeddata');
    const imagePromise=mediaReady(cityImage,'load');
    const [imageOkay,videoOkay]=await Promise.all([imagePromise,Promise.race([videoPromise,sleep(8000).then(()=>false)])]);
    if(!imageOkay){loadingMessage.textContent='No se pudo cargar la ciudad';retry.hidden=false;return;}
    progress.style.width='86%';
    try{await cityImage.decode?.();}catch(_){}
    showFilm(videoOkay);
  }
  introVideo.addEventListener('ended',enterDiscovery);
  introVideo.addEventListener('error',()=>{if(!loadingScreen.hidden)return;enterDiscovery();});
  $('#skip-film').addEventListener('click',enterDiscovery);
  playFilm.addEventListener('click',async()=>{playFilm.hidden=true;try{await introVideo.play();}catch(_){enterDiscovery();}});
  retry.addEventListener('click',loadExperience);

  layoutScene();
  layoutVehicles();
  loadExperience();
})();
