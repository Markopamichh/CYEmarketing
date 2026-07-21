// ─── Servicios ───────────────────────────────────────────────
export interface Service {
  number: string;
  title: string;
  emphasis: string; // palabra que va en itálica serif dentro del título
  description: string;
}

export const services: Service[] = [
  {
    number: '01',
    title: 'Redes que generan',
    emphasis: 'consultas',
    description:
      'Gestionamos tu Instagram para que deje de ser una vidriera vacía y empiece a traerte mensajes de gente que quiere comprar.',
  },
  {
    number: '02',
    title: 'Contenido que construye',
    emphasis: 'marca',
    description:
      'Fotos, videos y textos pensados para tu negocio, con una estética propia que la gente reconoce y recuerda.',
  },
  {
    number: '03',
    title: 'Publicidad que trae',
    emphasis: 'clientes',
    description:
      'Campañas en Meta y Google segmentadas para tu zona, con presupuestos reales de acá y reportes que se entienden.',
  },
  {
    number: '04',
    title: 'Identidad con',
    emphasis: 'carácter',
    description:
      'Logo, paleta y sistema visual completo para que tu marca se vea profesional en redes, en el local y donde sea.',
  },
];
