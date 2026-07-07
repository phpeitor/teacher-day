const BRAIN_NEW_SVG_PATH = './resources/brain.svg';
const BRAIN_OLD_SVG_PATH = './resources/brain-old.svg';

const colorThemes = [
  {
    name: 'amber',
    bg: 'rgba(20, 48, 32, 0.78)',
    path: '#ffd166',
    node: '#5eead4',
    accent: '#f97316'
  },
  {
    name: 'emerald',
    bg: 'rgba(5, 54, 45, 0.76)',
    path: '#9af7c5',
    node: '#f8d77a',
    accent: '#38bdf8'
  },
  {
    name: 'violet',
    bg: 'rgba(34, 25, 62, 0.76)',
    path: '#c4b5fd',
    node: '#f0abfc',
    accent: '#67e8f9'
  }
];

let activeThemeIndex = 0;
let focusableElements = [];

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function generateDelays(count) {
  const delays = Array.from({ length: count }, (_, i) => i * 0.08);
  return shuffleArray(delays);
}

function applyTheme(theme) {
  document.documentElement.style.setProperty('--bg-color', theme.bg);
  document.documentElement.style.setProperty('--brain-path-color', theme.path);
  document.documentElement.style.setProperty('--brain-node-color', theme.node);
  document.documentElement.style.setProperty('--brain-accent-color', theme.accent);

  const brain = document.querySelector('.brainContainer');
  if (brain) {
    brain.setAttribute('aria-pressed', String(activeThemeIndex === 0));
  }
}

function applyDrawAnimation(container) {
  const paths = container.querySelectorAll('path, rect');
  const delays = generateDelays(paths.length);

  paths.forEach((el, i) => {
    const length = el.getTotalLength ? el.getTotalLength() : 0;
    if (length > 0) {
      el.style.strokeDasharray = String(length);
      el.style.strokeDashoffset = String(length);
      el.style.animation = `drawLine 4.5s ease-in-out ${delays[i]}s infinite alternate`;
    }
  });

  const nodes = container.querySelectorAll('circle, ellipse');
  const nodeDelays = generateDelays(nodes.length);
  nodes.forEach((el, i) => {
    el.style.animation = `blinkNode 2.8s ease-in-out ${nodeDelays[i]}s infinite`;
  });
}

function cycleTheme() {
  activeThemeIndex = (activeThemeIndex + 1) % colorThemes.length;
  applyTheme(colorThemes[activeThemeIndex]);
}

function showSvgInContainer(container, svgText) {
  container.innerHTML = svgText;
  container.classList.remove('brainContainer--loading');
  applyDrawAnimation(container);
  container.addEventListener('click', cycleTheme);
  container.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      cycleTheme();
    }
  });
}

function openImageLightbox(imageSrc, imageAlt, triggerElement) {
  if (document.querySelector('.logo-lightbox')) {
    return;
  }

  const rect = triggerElement.getBoundingClientRect();
  const elementCX = rect.left + rect.width / 2;
  const elementCY = rect.top + rect.height / 2;
  const vpCX = window.innerWidth / 2;
  const vpCY = window.innerHeight / 2;
  const dx = elementCX - vpCX;
  const dy = elementCY - vpCY;

  const overlay = document.createElement('div');
  overlay.className = 'logo-lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', imageAlt);
  overlay.style.setProperty('--lbx', dx + 'px');
  overlay.style.setProperty('--lby', dy + 'px');

  const img = document.createElement('img');
  img.src = imageSrc;
  img.className = 'logo-lightbox__img';
  img.alt = imageAlt;

  const closeBtn = document.createElement('button');
  closeBtn.className = 'logo-lightbox__close';
  closeBtn.setAttribute('aria-label', 'Cerrar');
  closeBtn.innerHTML = '&times;';

  overlay.appendChild(img);
  overlay.appendChild(closeBtn);
  document.body.appendChild(overlay);

  focusableElements = [closeBtn];
  closeBtn.focus();

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      overlay.classList.add('logo-lightbox--open');
    });
  });

  function trapFocus(e) {
    if (e.key !== 'Tab') return;
    if (!focusableElements.length) return;
    e.preventDefault();
    const current = document.activeElement;
    const idx = focusableElements.indexOf(current);
    const next = e.shiftKey
      ? (idx <= 0 ? focusableElements.length - 1 : idx - 1)
      : (idx === -1 || idx >= focusableElements.length - 1 ? 0 : idx + 1);
    focusableElements[next].focus();
  }

  function closeLightbox() {
    document.removeEventListener('keydown', onKey);
    document.removeEventListener('keydown', trapFocus);
    overlay.classList.remove('logo-lightbox--open');
    overlay.classList.add('logo-lightbox--closing');
    window.setTimeout(function () {
      overlay.remove();
    }, 420);
  }

  function onKey(e) {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  }

  closeBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    closeLightbox();
  });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeLightbox();
  });

  document.addEventListener('keydown', onKey);
  document.addEventListener('keydown', trapFocus);
}

async function loadBrainSvg() {
  const brainContainer = document.querySelector('.brainContainer');

  if (!brainContainer) {
    return;
  }

  brainContainer.classList.add('brainContainer--loading');

  const svgPath = Math.random() < 0.5 ? BRAIN_NEW_SVG_PATH : BRAIN_OLD_SVG_PATH;

  try {
    const response = await fetch(svgPath);

    if (!response.ok) {
      throw new Error(`No se pudo cargar ${svgPath}`);
    }

    showSvgInContainer(brainContainer, await response.text());
  } catch (error) {
    brainContainer.classList.remove('brainContainer--loading');
    brainContainer.innerHTML = `<img class="brainFallbackImage" src="${svgPath}" alt="Cerebro creativo conectado">`;
    brainContainer.classList.add('brainContainer--fallbackImage');
    console.warn(error);
  }
}

applyTheme(colorThemes[activeThemeIndex]);
loadBrainSvg();

const video = document.getElementById('video-background');
if (video) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mq.matches) {
    video.pause();
  }
  mq.addEventListener('change', function (e) {
    if (e.matches) {
      video.pause();
    } else {
      video.play();
    }
  });
}

const logoEl = document.querySelector('.logo');
const logoImg = logoEl?.querySelector('.box img');

if (logoEl && logoImg) {
  logoEl.addEventListener('click', function () {
    openImageLightbox(logoImg.src, 'Logo', logoEl);
  });
}
