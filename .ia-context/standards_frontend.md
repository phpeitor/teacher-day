# Standards Frontend

## Contexto Del Proyecto

- Landing estatica para el Dia del Maestro.
- Stack actual: HTML, CSS y JavaScript vanilla, sin bundler, framework ni dependencias locales.
- Entrada principal: `index.html`.
- Estilos: `css/style.css`.
- Interactividad: `js/script.js`.
- SVG principal: `resources/brain.svg`, cargado por JavaScript y con fallback visual.
- Assets locales: `resources/video.mp4` y `resources/logo.png`.
- La pagina debe abrirse directamente desde `index.html` o servirse como archivo estatico en Apache.

## Principios De Iteracion

- Hacer cambios pequenos y verificables.
- No introducir frameworks, build steps, paquetes npm ni tooling nuevo sin una razon explicita.
- Mantener rutas relativas con `./` para conservar compatibilidad al abrir el HTML directamente.
- Priorizar mantener la experiencia visual actual: fondo de video, overlay verde, logo inclinado, SVG central animado y titulo animado.
- Mantener `script.js` pequeno; no volver a insertar SVGs extensos dentro del JavaScript.
- Mantener ilustraciones complejas como archivos SVG externos en `resources/`.

## HTML

- Mantener `index.html` como documento unico de la landing.
- Usar HTML semantico cuando se agregue contenido nuevo, pero sin romper la estructura visual existente.
- Agregar siempre `alt` descriptivo a imagenes nuevas y revisar imagenes existentes si se modifica esa zona.
- Mantener los assets con rutas relativas, por ejemplo `./resources/logo.png`.
- No duplicar textos visibles; si se cambia el titulo animado, actualizar sus tres apariciones actuales para conservar el efecto.
- Mantener `playsinline`, `muted`, `loop` y `autoplay` en videos de fondo para preservar comportamiento mobile.

## CSS

- Conservar `css/style.css` como fuente principal de estilos.
- Usar variables CSS en `:root` para colores o valores reutilizados.
- Preferir clases sobre selectores globales nuevos.
- Antes de agregar reglas globales para `svg`, `path`, `img` o `body`, verificar que no alteren el SVG animado existente.
- Mantener animaciones CSS con nombres claros y duraciones consistentes.
- Cuidar `z-index`, `position: fixed` y `position: absolute`; el fondo, overlay, logo, SVG y texto dependen del stacking.
- Para responsive, usar media queries simples y probar escritorio y mobile.
- Evitar valores magicos nuevos si se puede reutilizar una variable o un patron ya existente.

## JavaScript

- Usar JavaScript vanilla compatible con navegador, sin transpiler.
- Mantener el script cargado al final del `body` para poder consultar elementos sin esperar `DOMContentLoaded`, salvo que se mueva la etiqueta.
- No usar modulos ES si no se actualiza el HTML y se valida compatibilidad.
- Evitar incrustar SVGs masivos como template strings.
- Si se agregan selectores DOM, validar que el elemento exista antes de modificarlo.
- No agregar logica pesada ni dependencias externas para una interaccion simple.
- Mantener nombres de clases existentes cuando esten enlazadas a CSS: `brainContainer`, `brainPath`, `brainCircle`, `brainRect`, `brainEllipse`, `animatePaths`, `animateCircles`, `animateRects`.

## SVG

- El SVG principal vive en `resources/brain.svg`.
- Las clases del SVG son usadas por CSS; no renombrarlas sin actualizar estilos.
- Mantener `viewBox` y dimensiones internas salvo que se busque redisenar la ilustracion.
- Para cambios de color o animacion, preferir CSS antes que editar cientos de paths.
- Evitar optimizadores automaticos de SVG sin revision, pueden eliminar atributos o clases necesarias.

## Assets

- Guardar recursos visuales en `resources/`.
- Comprimir imagenes y videos antes de reemplazarlos.
- Mantener nombres claros y minusculas con guiones si se agregan archivos nuevos.
- Si se reemplaza `video.mp4`, verificar peso, duracion, loop y contraste con el overlay.
- No referenciar assets remotos nuevos salvo que sea una decision explicita.

## Accesibilidad Y UX

- Mantener contraste suficiente entre texto, logo, SVG y fondo de video.
- Evitar animaciones nuevas que parpadeen de forma agresiva.
- Si se agrega contenido textual, asegurar que sea legible en mobile.
- Considerar `prefers-reduced-motion` si se agregan animaciones adicionales.
- Agregar atributos accesibles a imagenes y elementos interactivos nuevos.

## Performance

- No bloquear el render con scripts externos innecesarios.
- Evitar aumentar mucho el peso del video o duplicar el SVG en DOM.
- Reutilizar CSS para cambios visuales antes de duplicar markup.
- Mantener fuentes externas al minimo; actualmente se usa Google Font `Josefin Sans`.

## Verificacion Manual

- Abrir `index.html` en navegador.
- Verificar que el video cubra toda la pantalla.
- Verificar que el overlay verde no tape el contenido.
- Verificar que el logo cargue y haga hover.
- Verificar que el SVG central aparezca y anime.
- Verificar que el texto `Dia del Maestro` se vea completo.
- Revisar en ancho mobile y escritorio.

## Definicion De Listo

- La landing abre sin errores visibles de consola.
- No hay rutas rotas para CSS, JS, video o logo.
- El cambio mantiene la estetica y animaciones principales.
- El HTML sigue siendo estatico y portable.
- El cambio fue validado manualmente o se explica que no se pudo validar.
