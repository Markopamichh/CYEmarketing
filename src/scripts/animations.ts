// Animaciones globales de scroll (fade-up por sección, parallax de números,
// contadores). GSAP se importa acá y solo se carga en el cliente.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initAnimations() {
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
}

initAnimations();
