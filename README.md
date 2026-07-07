# Teacher's Day 📕👩‍🏫
[![forthebadge](http://forthebadge.com/images/badges/uses-css.svg)](https://www.linkedin.com/in/drphp/)
[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](https://www.linkedin.com/in/drphp/)

[![Video](https://img.youtube.com/vi/fONWx0vGRk8/0.jpg)](https://www.youtube.com/watch?v=fONWx0vGRk8)  
[![Video Demo](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube)](https://www.youtube.com/watch?v=fONWx0vGRk8)

Landing page interactiva para celebrar el Día del Maestro. Cada visita carga aleatoriamente uno de dos cerebros SVG animados con temática de neurociencia.

## ✨ Features

- **SVG dual aleatorio** — Al recargar la página se muestra `brain.svg` o `brain-old.svg` con un 50 % de probabilidad cada uno.
- **Animación al stylo "drawing"** — Los trazos se dibujan progresivamente gracias a `stroke-dasharray` / `stroke-dashoffset`.
- **Ciclo de temas** — Hacé clic o presioná Enter/Espacio sobre el cerebro para rotar entre paletas *Amber*, *Emerald* y *Violet* (las variables CSS se actualizan en vivo).
- **Lightbox del logo** — Al hacer clic en el logo se abre un modal con animación de origen (`transform-origin` calculado dinámicamente).
- **Responsive & accesible** — Navegación por teclado, `aria-label`s y contraste suficiente.

## 🧠 Arquitectura

```
├── index.html              # Entry point
├── css/
│   └── style.css           # Layout, animaciones, lightbox, temas
├── js/
│   ├── script.js           # Lógica principal (fetch, temas, lightbox)
│   └── script_anterior.js  # Cerebro antiguo embebido (legacy)
└── resources/
    ├── brain.svg           # Cerebro moderno
    └── brain-old.svg       # Cerebro antiguo extraído de script_anterior.js
```

### Flujo de carga

1. `script.js` elige al azar entre `brain.svg` y `brain-old.svg`.
2. Hace `fetch()` del SVG seleccionado e inyecta el contenido en `.brainContainer`.
3. Se asignan `animation-delay`s escalonados a paths, circles, rects y ellipses.
4. El contenedor escucha `click` y `keydown` para cambiar de tema.

## 🛠️ Stack

| Capa       | Tecnología        |
|------------|-------------------|
| HTML       | Semántico, ARIA   |
| CSS        | Flexbox, Grid, animaciones CSS, custom properties |
| JS         | Vanilla (ES6+)    |
| Dependencias | 0               |

## 🚀 Quick Start

```bash
git clone https://github.com/phpeitor/teacher-day.git
cd teacher-day
# Abrir index.html en el navegador
start index.html          # Windows
open index.html           # macOS
xdg-open index.html       # Linux
```
