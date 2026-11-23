# Mundo Sky Insurance 360°

Sitio estático en HTML, CSS y JavaScript. Los panoramas, videos, ilustraciones y logotipos se sirven desde el proyecto. Al continuar una solicitud, la página abre el canal elegido con el mensaje preparado.

- Web publicada: https://durangarzondev.github.io/sky-insurance-360/
- Repositorio: https://github.com/DuranGarzonDev/sky-insurance-360

## Ejecutar en local

Desde PowerShell:

```powershell
cd "C:\Users\juang\Downloads\Sky - Web de Seguros"
Start-Process .\index.html
```

También se puede abrir `index.html` con Live Server en VS Code, o iniciar un servidor local con `py -m http.server 4174 --bind 127.0.0.1` y entrar en `http://127.0.0.1:4174/`.

## Referencias e implementación

- [Mapa de navegación en Canva](https://canva.link/1azkdswl8ggjhqa), páginas 1 a 4: ingreso, Empresarial, Hogar, Vehículos y ruta directa a Motos.
- [Drive de Sky](https://drive.google.com/drive/folders/1ya3T8RObpHhDFZdUE1OIoNtEHq7uPNbz): ciudad del 13 de noviembre; panoramas, videos y logotipos; formularios de Vida y Salud, Pymes, Obras Civiles y Logística.
- `assets/city-master.webp` usa `Mesa de trabajo 16.png`, el fondo limpio. `Mesa de trabajo 1.png` sirve como referencia de composición. La copia PNG maestra de la versión anterior queda fuera de publicación.
- `index.html` define los pines en el grupo SVG `#hotspots` con `viewBox="0 0 1600 800"`. Cada punto usa `data-zone`, un trazado para el objeto y un marcador. La ruta y los textos de menú están en `ZONES` dentro de `app.js`.
- `assets/company/enter.mp4` y `return.mp4` provienen de los videos de entrada y salida de Sky Insurance. `allies.webp` es el panel limpio EMPRESA-13. El selector usa los logotipos de Seguros del Estado, Seguros Mundial y HDI.
- `assets/vehicles` contiene cinco ilustraciones transparentes y cinco videos H.264. El cotizador de transporte público reutiliza la ilustración y el video de colectiva. El damero está incorporado en la imagen de los MP4 de origen.
- `quote-flows.js` concentra las secciones, campos y variantes. `quote-wizard.js` gestiona navegación, validación y generación del resumen. `quote-wizard.css` contiene el diálogo adaptable y la recepción de Empresarial.
- Hogar conserva el recorrido de fachada e interior con bienes opcionales y resumen final. El correo provisional se configura en `skyQuoteEmail` y WhatsApp en `WHATSAPP_NUMBER`, en `app.js`.

## Envío de solicitudes

La aplicación abre un borrador de correo para Hogar y prepara las demás solicitudes en WhatsApp. Hogar ofrece también WhatsApp como alternativa. El visitante confirma el envío en su aplicación. Los documentos de respaldo se comparten en la conversación con el asesor. La web, por sí sola, no puede confirmar entrega, emitir un radicado ni iniciar cobertura.
