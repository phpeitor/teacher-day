# Agent Roles

## Uso General

- Antes de editar, cada agente debe leer `standards_frontend.md` y los archivos que va a tocar.
- Cada agente debe trabajar con cambios pequenos, enfocados y faciles de revertir.
- Si dos agentes necesitan tocar el mismo archivo, coordinar el orden para evitar conflictos.
- Ningun agente debe introducir frameworks, build tools o dependencias sin aprobacion explicita.
- Al terminar, cada agente debe reportar archivos modificados, razon del cambio y verificacion realizada.

## HTML Agent

Responsabilidad:
- Mantener estructura, contenido y carga de assets en `index.html`.

Debe hacer:
- Revisar rutas relativas a `./css/style.css`, `./js/script.js` y `./resources/*`.
- Mantener la estructura requerida por las animaciones del titulo: `.stage`, `.wrapper`, `.slash`, `.sides`, `.text`, `.text--backing`, `.text--left`, `.text--right`.
- Agregar `alt` a imagenes nuevas o modificadas.
- Mantener el video de fondo con `autoplay muted loop playsinline`.

Debe evitar:
- Cambiar nombres de clases usadas por CSS/JS sin coordinar con CSS Agent y JS Agent.
- Duplicar secciones visuales sin necesidad.
- Agregar scripts en el `head` que bloqueen render.

Checklist:
- `index.html` carga CSS y JS correctamente.
- No hay etiquetas sin cerrar.
- El texto visible se mantiene sincronizado cuando aparece repetido por efecto visual.

## CSS Agent

Responsabilidad:
- Mantener apariencia, layout, responsive y animaciones en `css/style.css`.

Debe hacer:
- Usar variables en `:root` para colores o valores compartidos.
- Preservar stacking entre video, overlay, logo, SVG y titulo.
- Revisar efectos sobre selectores globales existentes como `svg` y `path` antes de cambiarlos.
- Agregar media queries simples si el cambio afecta mobile.

Debe evitar:
- Eliminar keyframes existentes sin validar todas las animaciones.
- Cambiar clases del SVG sin coordinar con SVG Agent o JS Agent.
- Agregar estilos globales amplios que afecten paths del SVG por accidente.

Checklist:
- Video sigue cubriendo viewport.
- Overlay mantiene contraste.
- Animaciones siguen activas.
- Mobile y desktop no presentan desbordes evidentes.

## JavaScript Agent

Responsabilidad:
- Mantener interactividad y montaje del SVG en `js/script.js`.

Debe hacer:
- Tratar el template string del SVG como zona sensible.
- Validar existencia de elementos DOM antes de manipularlos.
- Mantener compatibilidad con navegador sin bundler.
- Preferir cambios fuera del SVG masivo cuando sea posible.

Debe evitar:
- Convertir el proyecto a modulos, TypeScript o framework.
- Editar paths SVG manualmente si el objetivo puede resolverse por CSS.
- Agregar dependencias externas.

Checklist:
- No hay errores de consola.
- El SVG se inserta en `.brainContainer`.
- Las clases de animacion siguen coincidiendo con CSS.

## SVG Agent

Responsabilidad:
- Mantener, ajustar u optimizar la ilustracion SVG del cerebro/figura central.

Debe hacer:
- Preservar `viewBox`, clases y atributos necesarios para animaciones.
- Usar CSS para color, stroke, opacidad y animacion cuando sea viable.
- Si se edita el SVG, validar que el template string no rompa comillas, backticks o cierre de etiquetas.

Debe evitar:
- Ejecutar optimizaciones automaticas que eliminen clases `brainPath`, `brainCircle`, `brainRect`, `brainEllipse`.
- Reemplazar el SVG completo sin validar alineacion y escala.
- Duplicar SVGs pesados en el DOM.

Checklist:
- SVG renderiza centrado.
- Paths y formas conservan estilos.
- Animaciones siguen aplicandose desde CSS.

## Assets Agent

Responsabilidad:
- Gestionar imagenes, video, favicon y recursos en `resources/`.

Debe hacer:
- Verificar peso y formato de archivos nuevos.
- Mantener nombres simples y rutas relativas.
- Confirmar que nuevos assets no rompen la carga local.
- Cuidar contraste del video con overlay y texto.

Debe evitar:
- Usar assets remotos innecesarios.
- Reemplazar `video.mp4` o `logo.png` sin revisar el impacto visual.
- Agregar archivos pesados sin compresion.

Checklist:
- Recursos existen en `resources/`.
- Rutas referenciadas desde HTML/CSS/JS son correctas.
- La landing sigue cargando rapido para un proyecto estatico.

## UX Copy Agent

Responsabilidad:
- Cuidar textos, tono y mensaje para Dia del Maestro.

Debe hacer:
- Mantener tono afectivo, breve y celebratorio.
- Usar espanol consistente para contenido visible.
- Coordinar con HTML Agent si un texto aparece duplicado por animacion.

Debe evitar:
- Textos largos que rompan el layout.
- Mezclar idiomas en contenido visible sin intencion.
- Cambiar el mensaje central sin aprobacion si no forma parte de la tarea.

Checklist:
- Texto principal se lee completo.
- No hay errores ortograficos evidentes.
- El mensaje encaja en desktop y mobile.

## QA Agent

Responsabilidad:
- Revisar que cada iteracion no rompa la landing.

Debe hacer:
- Abrir `index.html` o servir el directorio estatico.
- Revisar consola del navegador si es posible.
- Validar desktop y mobile.
- Confirmar que video, logo, SVG, estilos y script cargan.

Debe evitar:
- Aprobar cambios solo por lectura de codigo cuando afectan visuales.
- Ignorar errores de consola relacionados con DOM o assets.

Checklist:
- Sin errores visibles de consola.
- No hay assets 404.
- Animaciones principales funcionan.
- Layout no se corta en mobile.

## Coordinator Agent

Responsabilidad:
- Dividir tareas entre agentes y proteger la coherencia del proyecto.

Debe hacer:
- Asignar el agente correcto segun archivo o tipo de cambio.
- Pedir contexto minimo antes de editar.
- Evitar que multiples agentes modifiquen el mismo archivo en paralelo.
- Consolidar verificacion final.

Debe evitar:
- Expandir el alcance de la tarea.
- Aceptar cambios que introduzcan tooling innecesario.
- Omitir revision manual en cambios visuales.

Checklist:
- Cada cambio tiene propietario claro.
- Los archivos modificados son los esperados.
- La definicion de listo de `standards_frontend.md` se cumple.
