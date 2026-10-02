# Sky Insurance — prototipo local

Sitio estático con HTML, CSS y JavaScript Vanilla. Funciona al abrir `index.html` sin backend, CDN ni servicios externos durante la navegación. La única salida externa es el enlace de WhatsApp cuando el visitante envía el formulario de cotización.

- Web publicada: https://durangarzondev.github.io/sky-insurance-360/
- Repositorio: https://github.com/DuranGarzonDev/sky-insurance-360

## Ejecutar

Desde PowerShell:

```powershell
cd "C:\Users\juang\Downloads\Sky - Web de Seguros"
Start-Process .\index.html
```

Con Live Server instalado en VS Code:

```powershell
cd "C:\Users\juang\Downloads\Sky - Web de Seguros"
code .
```

Abre `index.html` y elige **Open with Live Server**. Live Server es opcional.

## Estructura

- `index.html`: introducción, Ciudad Maestra, siete mundos SVG, recorridos de Empresa y Hogar, vista de vehículos, guía y panel de cotización.
- `styles.css`: interfaz de la Ciudad Maestra y Mundo Hogar, animaciones de descubrimiento, estados de selección y adaptación móvil.
- `app.js`: secuencia de entrada, paneo/zoom, selección de mundos, recorridos, catálogo y WhatsApp.
- `assets/city-master.webp`: versión web optimizada de la panorámica `01 - CIUDAD SKY INSURANCE -01.png`, de 8192 × 4096.
- `assets/city-master.png`: copia local de la panorámica maestra actualizada para edición.
- `assets/sky-logo.svg`: logotipo vectorial local de Sky.
- `assets/intro-city.mp4`: video local de 8 segundos que construye la Ciudad Maestra antes de mostrar el visor.
- `assets/company/*.webp`: siete panoramas locales optimizados para la ruta de Empresa. Provienen de los archivos EMPRESA-02, 03, 04, 05, 06, 09 y 10 de la carpeta de Drive.
- `assets/home/facade.webp`: panorama limpio de la fachada de Hogar.
- `assets/home/interior.webp`: panorama limpio de muebles y enseres.
- `assets/home/portal.webp`: panorama limpio con el umbral luminoso usado durante la decisión de ingreso.
- `assets/home/*.mp4`: cuatro transiciones bidireccionales de Hogar, convertidas a H.264, 1280 × 720 y optimizadas para navegador.

El orden de entrada es: logo con barra pequeña, video de presentación, panorámica limpia, aparición secuencial de los siete marcadores, indicación animada de arrastre y despliegue de la interfaz completa. La barra llega al 100 % después de cargar la panorámica y preparar el video. Si la imagen principal falta, aparece un botón de reintento; si el navegador no puede reproducir el video, el flujo continúa con el descubrimiento de marcadores.

## Editar los lugares interactivos

El SVG original de Drive contiene únicamente una etiqueta `<image>`; los edificios y vehículos no son trazados independientes. Las zonas de clic se dibujaron encima de la imagen en `#hotspots` usando el `viewBox="0 0 1600 800"`. Cada `<g class="hotspot-control">` contiene uno o varios `path.hotspot-shape` y un marcador `g.hotspot-pin`. Sus IDs son `hotspot-empresa`, `hotspot-hogar`, `hotspot-construccion`, `hotspot-vehiculos`, `hotspot-transporte`, `hotspot-responsabilidad` y `hotspot-vida`.

Cada marcador y cada opción del menú usa `data-zone`. Su contenido, beneficios, producto y destino están centralizados en `ZONES` de `app.js`; los textos de cotización están en `PRODUCTS`. Conserva `tabindex="0"`, `role="button"` y `aria-label` en los grupos interactivos. El brillo del croquis solo aparece mientras el puntero está encima; seleccionar otra categoría actualiza el panel sin dejar el contorno encendido. La aparición progresiva se controla desde `styles.css`.

La vista secundaria usa `#vehicles-svg` y tres grupos `vehicle-moto`, `vehicle-carro`, `vehicle-avion`. En anchos de 700 px o menos, `app.js` cambia el `viewBox` y apila los mismos vectores; los clics siguen funcionando. En móvil, el menú de mundos y el resumen seleccionado se convierten en paneles deslizables para conservar la panorámica visible.

## Entrada cinematográfica a Empresa

El visor de la ciudad empieza con zoom `1.3` en escritorio y `1.15` en móvil. Son valores deliberadamente moderados: acercan la panorámica sin recortar demasiado el encuadre en pantallas estrechas. El botón de centrar restablece ese zoom inicial.

Seleccionar Empresa, desde el croquis o desde el menú, inicia directamente la secuencia de ocho escenas y 5,4 segundos hacia el hub. La primera escena es la ciudad; las siguientes muestran acercamiento, cruce peatonal, fachada, entrada, lobby, selección y menú de servicios. Los archivos se cargan y decodifican antes de animar para evitar pausas entre escenas. En la recepción se puede arrastrar la panorámica; las acciones **Ver seguros para empresas** y **Volver a la ciudad** están fuera de la imagen. El regreso usa una secuencia inversa de 2,55 segundos. Con movimiento reducido en el sistema, ambas transiciones se completan sin animación.

| Archivo local | Panorama de Drive |
| --- | --- |
| `approach.webp` | EMPRESA-02-ACERCAMIENTO-EDIFICIO |
| `crosswalk.webp` | EMPRESA-03-CRUCE-PEATONAL |
| `front.webp` | EMPRESA-04-FRENTE-EDIFICIO |
| `entrance.webp` | EMPRESA-05-ENTRADA-PRINCIPAL |
| `lobby.webp` | EMPRESA-06-ENTRADA-RECEPCION |
| `selection.webp` | EMPRESA-09-PANEL-SELECCION-ALIADOS |
| `services.webp` | EMPRESA-10-MENU SERVICIOS |

Los panoramas se redujeron a 2560 × 1280 y se guardaron como WebP. El ejemplo HTML suministrado contenía sus imágenes en base64; estas versiones usan archivos externos locales para mantener el código ligero.

La imagen final del menú es rasterizada, pero sus cinco tarjetas tienen zonas SVG transparentes en `#service-svg` para hacerlas realmente interactivas. Los IDs `service-autos`, `service-hogar`, `service-vida`, `service-empresa` y `service-proyectos` permiten ajustar cada rectángulo en `index.html` si cambia la composición del panorama. Autos abre la vista anidada de vehículos; las demás tarjetas abren su panel de seguros. El contorno permanente indica que se pueden pulsar, incluso en pantallas táctiles. El botón externo **Ver seguros para empresas** sigue disponible fuera del panorama.

El catálogo `PRODUCTS` contiene textos de demostración, no coberturas contractuales. Confirma las opciones reales de Sky antes de publicar. El número de WhatsApp está fijado en `WHATSAPP_NUMBER = '573227931513'`.

## Recorrido de Hogar

Seleccionar **Hogar** desde el croquis o el menú inicia directamente el video de acercamiento y abre la fachada. En esa vista el usuario configura tipo de vivienda, dirección, valor de construcción, área, pisos, antigüedad, zona, material y seguridad; los cinco puntos del panorama explican cada elemento asegurable. Al continuar, la aplicación cambia al panorama del portal y pregunta si desea incluir muebles y enseres. La respuesta afirmativa reproduce la entrada a la vivienda y cambia el panorama, los puntos y la cotización a bienes muebles.

Los botones **Volver**, **Infraestructura** y la tecla `Esc` reproducen las transiciones inversas correspondientes. Los paneles laterales se convierten en controles desplegables en móvil para conservar visible el panorama y sus zonas pulsables.

La interfaz fue contrastada con los cinco archivos de `PANORAMAS FINALES`; esos archivos sirven como referencia visual. La web compone la interfaz con HTML y CSS sobre los panoramas de `PANORAMAS LIMPIOS`, de modo que campos, botones, estados y cotizaciones permanecen interactivos.

Los iconos de navegación son SVG locales con un lenguaje visual lineal inspirado en Lucide. En pantallas amplias, Hogar usa paneles laterales para liberar el centro del panorama. En portátiles de poca altura, tabletas y móviles, esos paneles se convierten en cajones que se abren bajo demanda.
