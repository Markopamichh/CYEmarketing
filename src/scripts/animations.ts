// Todas las animaciones con GSAP viven acá y se cargan de forma diferida
// (requestIdleCallback desde index.astro), fuera de la ruta crítica del LCP.
// El hero entra con CSS puro y no depende de este archivo.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initScrollAnimations() {
  if (reduced) return; // estados finales ya visibles vía CSS

  gsap.registerPlugin(ScrollTrigger);

  // Fade-up genérico con stagger: cualquier contenedor con [data-reveal-group]
  // anima sus hijos [data-reveal]; los sueltos animan solos.
  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
    const items = group.querySelectorAll('[data-reveal]');
    if (!items.length) return;
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: { trigger: group, start: 'top 82%', once: true },
    });
  });

  document
    .querySelectorAll<HTMLElement>('[data-reveal]:not([data-reveal-group] [data-reveal])')
    .forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    });

  // Números de sección grandes: parallax leve (scrub)
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    gsap.to(el, {
      y: -40,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
    });
  });

  // Reveal de imágenes por clip-path
  document.querySelectorAll<HTMLElement>('[data-clip-reveal]').forEach((el) => {
    gsap.to(el, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 80%', once: true },
    });
  });

  // Contadores de métricas
  document.querySelectorAll<HTMLElement>('[data-counter]').forEach((el) => {
    const target = Number(el.dataset.counter ?? 0);
    const obj = { v: 0 };
    gsap.to(obj, {
      v: target,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate: () => {
        el.textContent = String(Math.round(obj.v));
      },
    });
  });

  // Hero: asterisco decorativo que rota con el scroll
  const asterisk = document.getElementById('hero-asterisk');
  if (asterisk) {
    gsap.to(asterisk, {
      rotation: 120,
      ease: 'none',
      scrollTrigger: { trigger: '#hero-title', start: 'top top', end: '+=1200', scrub: 1.5 },
    });
  }

  // Marquee de logos: el movimiento lo maneja GSAP (la animación CSS queda de
  // fallback sin JS). La velocidad reacciona levemente al scroll.
  const marquee = document.getElementById('logo-marquee');
  const track = marquee?.querySelector<HTMLElement>('.marquee-track');
  if (marquee && track) {
    track.style.animation = 'none';
    const tween = gsap.to(track, { xPercent: -50, duration: 28, ease: 'none', repeat: -1 });

    let hovering = false;
    marquee.addEventListener('mouseenter', () => {
      hovering = true;
      gsap.to(tween, { timeScale: 0, duration: 0.4, overwrite: 'auto' });
    });
    marquee.addEventListener('mouseleave', () => {
      hovering = false;
      gsap.to(tween, { timeScale: 1, duration: 0.4, overwrite: 'auto' });
    });

    let settle: gsap.core.Tween | null = null;
    ScrollTrigger.create({
      trigger: marquee,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        if (hovering) return;
        const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 1500, 2);
        settle?.kill();
        settle = gsap.fromTo(
          tween,
          { timeScale: boost },
          { timeScale: 1, duration: 0.9, ease: 'power2.out' }
        );
      },
    });
  }

  // Proceso: línea vertical que se dibuja con el scroll
  const line = document.getElementById('process-line');
  if (line) {
    gsap.fromTo(
      line,
      { strokeDasharray: 1, strokeDashoffset: 1 },
      {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: { trigger: '#proceso ol', start: 'top 75%', end: 'bottom 60%', scrub: 1 },
      }
    );
  }
}

// Tilt 3D + glare en las tarjetas de casos (vanilla, sin GSAP). Solo en
// dispositivos con hover fino y si no está activo prefers-reduced-motion.
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

initScrollAnimations();
initTilt();
