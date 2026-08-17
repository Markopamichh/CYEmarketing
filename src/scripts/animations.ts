// Animaciones de scroll en vanilla JS (sin GSAP): IntersectionObserver para los
// reveals/contadores y un único scroll-listener con rAF para los efectos de
// parallax/scrub. El hero entra con CSS puro y no depende de este archivo.
// Se carga de forma diferida (requestIdleCallback) desde index.astro.

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initReveals() {
  if (reduced) return; // estados finales ya visibles vía CSS

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;

        // Stagger de los hijos [data-reveal] dentro de un [data-reveal-group]
        if (el.hasAttribute('data-reveal-group')) {
          el.querySelectorAll<HTMLElement>('[data-reveal]').forEach((child, i) => {
            child.style.transitionDelay = `${i * 0.12}s`;
            child.classList.add('is-visible');
          });
        } else {
          el.classList.add('is-visible');
        }
        obs.unobserve(el);
      });
    },
    { rootMargin: '0px 0px -12% 0px' }
  );

  // Grupos y reveals sueltos (los que no están dentro de un grupo)
  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((el) => io.observe(el));
  document
    .querySelectorAll<HTMLElement>('[data-reveal]:not([data-reveal-group] [data-reveal])')
    .forEach((el) => io.observe(el));

  // Clip-reveal de imágenes
  document.querySelectorAll<HTMLElement>('[data-clip-reveal]').forEach((el) => io.observe(el));
}

function initCounters() {
  if (reduced) return;

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        const target = Number(el.dataset.counter ?? 0);
        const start = performance.now();
        const dur = 1000;

        const tick = (now: number) => {
          const t = Math.min((now - start) / dur, 1);
          // easeOutCubic
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = String(Math.round(eased * target));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.unobserve(el);
      });
    },
    { rootMargin: '0px 0px -10% 0px' }
  );

  document.querySelectorAll<HTMLElement>('[data-counter]').forEach((el) => io.observe(el));
}

// Efectos ligados al scroll (parallax de números, rotación del asterisco,
// dibujo de la línea del proceso). Un solo listener con rAF para todos.
function initScrollEffects() {
  if (reduced) return;

  const parallax = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
  const asterisk = document.getElementById('hero-asterisk');
  const heroTitle = document.getElementById('hero-title');
  const line = document.getElementById('process-line');
  const processOl = document.querySelector<HTMLElement>('#proceso ol');

  if (line) {
    // el SVG ya trae pathLength="1", así el trazo se normaliza a 0–1
    line.style.strokeDasharray = '1';
    line.style.strokeDashoffset = '1';
  }

  let ticking = false;

  const update = () => {
    ticking = false;
    const vh = window.innerHeight;

    // Parallax: los números se mueven más lento que el contenido
    parallax.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const progress = (vh - r.top) / (vh + r.height); // 0 → 1
      el.style.transform = `translateY(${(progress - 0.5) * -60}px)`;
    });

    // Asterisco: rota mientras el hero está en pantalla
    if (asterisk && heroTitle) {
      const r = heroTitle.getBoundingClientRect();
      const p = Math.min(Math.max(-r.top / 1200, 0), 1);
      asterisk.style.transform = `rotate(${p * 120}deg)`;
    }

    // Línea del proceso: se dibuja según el avance del scroll sobre la lista
    if (line && processOl) {
      const r = processOl.getBoundingClientRect();
      const p = Math.min(Math.max((vh * 0.75 - r.top) / (r.height * 0.85), 0), 1);
      line.style.strokeDashoffset = String(1 - p);
    }
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll, { passive: true });
  update();
}

// Tilt 3D + glare en las tarjetas de casos. Solo en dispositivos con hover fino
// y si no está activo prefers-reduced-motion.
function initTilt() {
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (reduced || !canHover) return;

  const MAX = 10;
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((card) => {
    const glare = card.querySelector<HTMLElement>('[data-tilt-glare]');
    card.style.transformStyle = 'preserve-3d';
    card.style.transition = 'transform 0.2s cubic-bezier(0.16,1,0.3,1)';

    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const ry = (px - 0.5) * MAX;
      const rx = (0.5 - py) * MAX;
      card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      if (glare) {
        glare.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, var(--accent), transparent 55%)`;
        glare.style.opacity = '0.18';
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      if (glare) glare.style.opacity = '0';
    });
  });
}

initReveals();
initCounters();
initScrollEffects();
initTilt();
