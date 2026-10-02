# Auditoría del flujo Hogar

## Secuencia implementada

1. Ciudad Sky → selección directa de **Hogar**.
2. Video de acercamiento → panorama limpio de fachada.
3. Registro de infraestructura y actualización inmediata de **Mi protección**.
4. Confirmación → panorama limpio del portal y pregunta sobre muebles y enseres.
5. **No, solo infraestructura** → resumen y formulario de cotización de Hogar.
6. **Sí, continuar** → video de entrada y panorama limpio del interior.
7. Registro del valor de contenidos → total acumulado de infraestructura y muebles.
8. **Siguiente: Resumen** → formulario de cotización para muebles y enseres.
9. Regreso desde interior → video inverso hasta la fachada.
10. Regreso desde fachada → video inverso hasta Ciudad Sky.

## Correspondencia visual

| Estado web | Panorama limpio usado | Referencia final |
| --- | --- | --- |
| Infraestructura | `06.1 COMIENZO INICIO (2).png` → `facade.webp` | `PASO 1.png` y `PASO 2.png` |
| Decisión de contenidos | `06.2 CAMBIO A TONO REAL CASA.png` → `portal.webp` | `PASO 3.0.png` y `PASO 3.1.png` |
| Muebles y enseres | `11-PANEL-BIENES Y ENSERES.png` → `interior.webp` | `PASO 4.png` |

Los panoramas finales no se usan como fondos porque ya contienen una interfaz rasterizada. Se usan como patrón de composición. La implementación coloca controles HTML sobre los panoramas limpios para conservar accesibilidad, interacción y adaptación móvil.

## Comprobaciones

- Acceso a Hogar desde menú y pin.
- Transiciones de ida y regreso en los dos niveles.
- Cinco puntos interactivos por panorama.
- Conservación del valor de infraestructura al agregar contenidos.
- Suma del total declarado en pesos colombianos.
- Cierre de la pregunta con `Esc` sin perder el estado.
- Paneles desplegables en pantallas de hasta 900 px.
- Recursos locales, sin CDN ni backend.
- WhatsApp configurado con `573227931513`.
