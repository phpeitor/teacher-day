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

function applyTheme(theme) {
  document.documentElement.style.setProperty('--bg-color', theme.bg);
  document.documentElement.style.setProperty('--brain-path-color', theme.path);
  document.documentElement.style.setProperty('--brain-node-color', theme.node);
  document.documentElement.style.setProperty('--brain-accent-color', theme.accent);
}

function addAnimationDelays(container) {
  const drawableElements = container.querySelectorAll('path, line, circle, ellipse');

  drawableElements.forEach((element, index) => {
    element.style.animationDelay = `${(index % 12) * 0.12}s`;
  });
}

function cycleTheme() {
  activeThemeIndex = (activeThemeIndex + 1) % colorThemes.length;
  applyTheme(colorThemes[activeThemeIndex]);
}

function showSvgInContainer(container, svgText) {
  container.innerHTML = svgText;
  addAnimationDelays(container);
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

	requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      overlay.classList.add('logo-lightbox--open');
    });
	});

	function onKey(e) {
    if (e.key === 'Escape') {
      closeLightbox();
    }
	}

	function closeLightbox() {
    document.removeEventListener('keydown', onKey);
    overlay.classList.remove('logo-lightbox--open');
    overlay.classList.add('logo-lightbox--closing');
    window.setTimeout(function () {
      overlay.remove();
    }, 420);
	}

	closeBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    closeLightbox();
	});

	overlay.addEventListener('click', function (e) {
	  if (e.target === overlay) closeLightbox();
	});

	document.addEventListener('keydown', onKey);
}

async function loadBrainSvg() {
  const brainContainer = document.querySelector('.brainContainer');

  if (!brainContainer) {
    return;
  }

  const svgPath = Math.random() < 0.5 ? BRAIN_NEW_SVG_PATH : BRAIN_OLD_SVG_PATH;

  try {
    const response = await fetch(svgPath);

    if (!response.ok) {
      throw new Error(`No se pudo cargar ${svgPath}`);
    }

    showSvgInContainer(brainContainer, await response.text());
  } catch (error) {
    brainContainer.innerHTML = `<img class="brainFallbackImage" src="${svgPath}" alt="Cerebro creativo conectado">`;
    brainContainer.classList.add('brainContainer--fallbackImage');
    console.warn(error);
  }
}

applyTheme(colorThemes[activeThemeIndex]);
loadBrainSvg();

const logoEl = document.querySelector('.logo');
const logoImg = logoEl?.querySelector('.box img');

if (logoEl && logoImg) {
  logoEl.addEventListener('click', function () {
    openImageLightbox(logoImg.src, 'Logo', logoEl);
  });
}
