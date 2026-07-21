// ─── Clientes / logos del marquee ────────────────────────────
// REEMPLAZAR: cuando tengas los logos reales, agregá `logo: '/logos/xxx.svg'`
// a cada cliente y el componente LogoMarquee los va a usar en lugar del
// wordmark tipográfico placeholder.
export interface Client {
  name: string;
  logo?: string; // ruta a SVG/PNG real (opcional por ahora)
}

export const clients: Client[] = [
  { name: 'Tune' },
  { name: 'Mary Tierra' },
  { name: 'Martínez Detailing' },
  { name: 'El Rincón de Aurora' },
  { name: 'Cliente 5' },
  { name: 'Cliente 6' },
  { name: 'Cliente 7' },
];
