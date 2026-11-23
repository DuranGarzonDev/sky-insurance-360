(() => {
  'use strict';

  const field = (key, label, type = 'text', options = {}) => ({ key, label, type, ...options });
  const select = (key, label, choices) => field(key, label, 'select', { choices });
  const optional = (key, label, type = 'text') => field(key, label, type, { optional: true });
  const money = (key, label, options) => field(key, label, 'number', { money: true, ...options });
  const multi = (key, label, choices) => field(key, label, 'checkboxes', { choices, optional: true });
  const yesNo = (key, label) => select(key, label, ['No', 'Sí']);
  const step = (title, ...fields) => ({ title, fields });
  const choice = (label, description, steps) => ({ label, description, steps });
  const contact = step('Tus datos',
    field('name', 'Nombre de contacto'), field('phone', 'Celular / WhatsApp', 'tel'),
    field('email', 'Correo electrónico', 'email'),
    field('consent', 'Autorizo a Sky Insurance a usar mis datos para gestionar esta solicitud y contactarme.', 'consent')
  );
  const company = [
    field('company', 'Razón social o nombre del negocio'),
    field('nit', 'NIT o identificación de la empresa'),
    field('city', 'Ciudad o municipio')
  ];
  const person = [
    select('person', '¿A quién quieres asegurar?', ['A mí', 'A otra persona', 'A mí y a mi familia']),
    field('birth', 'Fecha de nacimiento', 'date'), field('city', 'Ciudad')
  ];
  const applicant = step('Datos básicos',
    field('applicant', 'Nombres y apellidos o razón social'),
    select('idType', 'Tipo de documento', ['Cédula de ciudadanía', 'Cédula de extranjería', 'NIT', 'Otro']),
    field('document', 'Número de documento'), optional('birth', 'Fecha de nacimiento (persona natural)', 'date'),
    field('city', 'Ciudad de circulación'), optional('address', 'Dirección de residencia o domicilio')
  );
  const individual = (label, details) => [
    applicant,
    step(label, field('plate', 'Placa', 'plate'), field('year', 'Modelo (año)', 'year'),
      yesNo('lien', '¿Tiene prenda financiera?'), ...details),
    contact
  ];
  const vehicle = {
    moto: ['Motos', 'Tu moto', []],
    particular: ['Autos particulares', 'Tu vehículo', []],
    taxi: ['Taxis', 'Tu taxi', [optional('company', 'Empresa afiliadora')]],
    pesado: ['Vehículos de carga', 'Tu vehículo', [optional('cargoClass', 'Tipo de carga')]],
    publico: ['Transporte público', 'Tu vehículo', [optional('company', 'Empresa afiliadora'), optional('capacity', 'Capacidad de pasajeros', 'number')]]
  };
  const vehicleFlows = Object.fromEntries(Object.entries(vehicle).map(([key, [title, label, details]]) =>
    [key, { title, steps: individual(label, details), documentHint: 'El asesor podrá solicitar el documento de identidad, la tarjeta de propiedad y, si aplica, la Cámara de Comercio.' }]
  ));
  vehicleFlows.colectiva = {
    title: 'Pólizas colectivas',
    steps: [applicant, step('Vehículos', field('fleet', 'Vehículos de la solicitud', 'fleet')), contact],
    documentHint: 'Ten a mano los documentos del solicitante y las tarjetas de propiedad de los vehículos. Puedes compartirlos con el asesor durante la conversación.'
  };

  const work = (label, ...extra) => step('Datos de la obra',
    field('workType', 'Tipo de obra'), field('city', 'Municipio'), field('location', 'Dirección o tramo'),
    money('contractValue', label), field('start', 'Fecha de inicio', 'date'),
    field('end', 'Fecha de terminación', 'date'), yesNo('started', '¿La obra ya empezó?'),
    field('percent', 'Avance actual (%)', 'number', { max: 100, when: ['started', 'Sí'] }),
    yesNo('neighbors', '¿Hay construcciones a menos de 20 m?'),
    yesNo('utilities', '¿Hay redes subterráneas en la zona?'),
    yesNo('traffic', '¿Trabajas con tráfico abierto?'), ...extra);
  const civilWork = work('Valor del contrato (COP)', money('requiredRc', 'RC exigida en el contrato (COP)'), ...company.slice(0, 2), ...contact.fields.slice(0, 3));
  const civilCoverage = [
    'Predios, labores y operaciones', 'Contratistas y subcontratistas', 'Responsabilidad civil patronal',
    'Vehículos propios y no propios', 'Daños a propiedades vecinas', 'Redes subterráneas',
    'RC cruzada', 'Gastos médicos'
  ];
  const constructionCoverage = choices => step('Coberturas y documentos',
    multi('coverage', 'Coberturas solicitadas', choices),
    money('liability', 'Límite solicitado de responsabilidad civil (COP)', { optional: true }),
    yesNo('claims', '¿Hubo reclamaciones de terceros en los últimos cinco años?'),
    field('claimDetails', 'Describe las reclamaciones', 'textarea', { when: ['claims', 'Sí'] }),
    field('accurate', 'Declaro que la información suministrada es veraz.', 'consent'), contact.fields[3]);
  const cargo = step('Tu carga',
    multi('goods', 'Tipo de mercancía', ['Carga general', 'Alimentos y perecederos', 'Refrigerados', 'Electrónicos', 'Electrodomésticos', 'Materiales de construcción', 'Graneles', 'Contenedores', 'Mercancías peligrosas', 'Maquinaria', 'Otra']),
    select('route', 'Trayectos', ['Dentro de la ciudad', 'Entre ciudades', 'Importación', 'Exportación']),
    money('maxValue', 'Valor máximo por envío (COP)'), field('shipments', 'Envíos aproximados al mes', 'number'),
    money('annual', 'Valor movilizado o facturado al año (COP)'));
  const security = step('Seguridad e historial',
    multi('security', 'Medidas de seguridad', ['GPS satelital', 'Escolta', 'Localización de vehículos', 'Puestos de control', 'Estudio de conductores']),
    yesNo('claims', '¿Has tenido pérdidas o robos en los últimos tres años?'),
    field('claimDetails', 'Cuándo sucedió, qué pasó y cuánto se perdió', 'textarea', { when: ['claims', 'Sí'] }),
    yesNo('existingPolicy', '¿Tienes póliza de transporte actualmente?'),
    field('insurer', 'Aseguradora actual', 'text', { when: ['existingPolicy', 'Sí'] }),
    field('expires', 'Vencimiento de tu póliza', 'date', { when: ['existingPolicy', 'Sí'] }));
  const carrier = step('Tu empresa', ...company,
    select('carrierScope', '¿Qué quieres asegurar?', ['Solo mi empresa', 'Mi empresa y mi flota']));
  const fleet = {
    ...step('Tu flota', field('fleetSize', 'Número de vehículos', 'number'),
      field('oldest', 'Modelo más antiguo', 'year'),
      select('ownership', '¿De quién son los vehículos?', ['Todos de la empresa', 'Propios y vinculados', 'Vinculados o de terceros']),
      multi('fleetCoverage', '¿Qué quieres cubrir?', ['Daños a la carga', 'Daños a terceros', 'Accidentes del conductor'])),
    when: ['carrierScope', 'Mi empresa y mi flota']
  };

  window.SKY_QUOTE_FLOWS = {
    ...vehicleFlows,
    'vida-salud': {
      title: 'Vida y Salud',
      countChoice: true,
      choices: [
        choice('Seguro de vida', 'Apoyo económico para tus beneficiarios.', [
          step('Cotiza tu seguro de vida', ...person, field('occupation', 'Ocupación u oficio'),
            money('amount', 'Valor a asegurar (COP)', { optional: true }),
            multi('advice', 'Asesoría', ['Necesito ayuda para elegir el monto']), ...contact.fields)
        ]),
        choice('Seguro de salud', 'Opciones de atención y gastos médicos.', [
          step('Cotiza tu seguro de salud', ...person,
            select('care', 'Tipo de atención', ['Consultas y exámenes', 'Hospitalización', 'Protección integral']),
            optional('affiliation', 'Afiliación a salud'),
            field('family', 'Personas adicionales', 'family', { when: ['person', 'A mí y a mi familia'], optional: true }), ...contact.fields)
        ]),
        choice('Accidentes personales', 'Apoyo económico por accidentes cubiertos.', [
          step('Cotiza accidentes personales', ...person, field('occupation', 'Ocupación u oficio'), ...contact.fields)
        ])
      ]
    },
    pymes: {
      title: 'Pymes y Comercio',
      steps: [
        step('Datos del solicitante', ...company, ...contact.fields.slice(0, 3)),
        step('Tu negocio y tu local', field('activity', 'Actividad del negocio'),
          field('ciiu', 'Código CIIU', 'ciiu'), field('address', 'Dirección del local'),
          select('ownership', 'El local es', ['Propio', 'Arrendado']), yesNo('horizontal', '¿Está en propiedad horizontal?'),
          optional('material', 'Material de construcción'), optional('buildingYear', 'Año aproximado', 'year'),
          optional('floors', 'Pisos del edificio', 'number'), optional('employees', 'Empleados', 'number'),
          money('sales', 'Ventas anuales aproximadas (COP)', { optional: true })),
        step('Bienes y valores',
          ...['Edificio o local', 'Mejoras locativas', 'Muebles y enseres', 'Equipos eléctricos y electrónicos', 'Maquinaria', 'Inventario', 'Mercancía refrigerada', 'Efectivo']
            .map((label, index) => money('asset' + index, label + ' (COP)', { optional: true }))),
        step('Coberturas de interés', multi('coverage', 'Selecciona lo que deseas consultar', [
          'Incendio y daños', 'Terremoto', 'Asonada, motín y huelga', 'Hurto con violencia', 'Hurto sin violencia',
          'Daños electrónicos', 'Daño de maquinaria', 'Mercancía refrigerada', 'Dinero', 'Robo a clientes',
          'Fraude de empleados', 'Lucro cesante', 'Responsabilidad civil', 'Transporte de mercancías',
          'Transporte de dinero', 'Asistencia para el negocio'
        ]), money('limit', 'Límite de responsabilidad civil (COP)', { optional: true }),
          optional('months', 'Meses de lucro cesante', 'number')),
        step('Seguridad e historial',
          multi('protection', 'Protección del local', ['Alarma', 'Cámaras', 'Vigilancia privada', 'Rejas o cortinas', 'Extintores', 'Caja fuerte']),
          yesNo('closed', '¿El local queda cerrado más de 15 días seguidos?'),
          yesNo('claims', '¿Has tenido pérdidas o reclamos en los últimos tres años?'),
          field('claimDetails', 'Detalle y valor aproximado', 'textarea', { when: ['claims', 'Sí'] }),
          optional('comments', 'Comentarios para el asesor', 'textarea'), contact.fields[3])
      ]
    },
    construccion: {
      title: 'Obras civiles y Construcción',
      choices: [
        choice('RC para contratos estatales', 'Responsabilidad civil en contratos con entidades estatales.', [
          step('Póliza y contrato', field('contractor', 'Entidad contratante'), field('secop', 'Número de proceso SECOP')),
          civilWork, constructionCoverage(civilCoverage)]),
        choice('RC para contratos privados', 'Responsabilidad civil para contratos entre privados.', [
          step('Póliza y contrato', field('contractor', 'Contratante'), yesNo('additional', '¿El contratante debe figurar como asegurado adicional?')),
          civilWork, constructionCoverage(civilCoverage)]),
        choice('Todo riesgo construcción', 'Protección para una obra civil en ejecución.', [
          step('Datos del proyecto', field('project', 'Nombre del proyecto'), field('contractor', 'Quién contrata la obra'),
            field('builder', 'Quién ejecuta la obra'), field('nit', 'NIT del solicitante'), ...contact.fields.slice(0, 3)),
          work('Valor total de la obra (COP)'), constructionCoverage(['Daños materiales a la obra', 'Responsabilidad civil frente a terceros'])]),
        choice('RC anual para constructoras', 'Una solicitud para la operación anual de la constructora.', [
          step('Datos de la constructora', ...company.slice(0, 2), ...contact.fields.slice(0, 3)),
          step('Operación anual', field('activity', 'Actividades que realiza'), field('cities', 'Ciudades donde opera'),
            field('projects', 'Número aproximado de obras activas', 'number'), field('start', 'Inicio solicitado', 'date'),
            money('annual', 'Ingresos anuales (COP)', { optional: true }), yesNo('subcontractors', '¿Utiliza subcontratistas?')),
          constructionCoverage(civilCoverage.slice(0, 3))])
      ],
      documentHint: 'Puedes compartir con el asesor el contrato o pliego, presupuesto, cronograma, acta de vecindad, Cámara de Comercio y RUT, según corresponda.'
    },
    transporte: {
      title: 'Logística y Transporte',
      choices: [
        choice('Transportadora de carga', 'Movilizas mercancía de tus clientes.', [carrier, cargo, fleet, security, contact]),
        choice('Generador de carga', 'La mercancía es tuya y contratas el transporte.', [step('Tu empresa', ...company), cargo, security, contact]),
        choice('Operador logístico o agente de carga', 'Coordinas envíos de terceros.', [step('Tu empresa', ...company), cargo, security, contact]),
        choice('Un envío puntual', 'Una mercancía en una ruta y fecha específicas.', [
          step('Carga y operación', field('goods', '¿Qué mercancía vas a enviar?'), money('value', 'Valor total de la mercancía (COP)'),
            field('origin', 'Origen: ciudad y país'), field('destination', 'Destino: ciudad y país'),
            field('departure', 'Fecha prevista de salida', 'date'),
            select('mode', 'Medio de transporte', ['Terrestre', 'Marítimo', 'Aéreo', 'Mixto']),
            optional('packaging', 'Empaque, peso y bultos'), optional('carrier', 'Transportador')),
          contact
        ])
      ],
      documentHint: 'El asesor te orientará para compartir los soportes de la empresa, la carga o la flota según tu solicitud.'
    },
    'construccion-transporte': {
      title: 'Construcción y Transporte',
      choices: [
        { label: 'Obras civiles y Construcción', description: 'Cotiza una obra o su responsabilidad civil.', route: 'construccion' },
        { label: 'Logística y Transporte', description: 'Cotiza mercancías o una operación de transporte.', route: 'transporte' }
      ]
    }
  };
})();
