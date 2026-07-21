// ─── Casos de éxito ──────────────────────────────────────────
// REEMPLAZAR: métricas reales y fotos reales de cada proyecto.
// `metricValue` es el número que se anima con el contador;
// `metricPrefix`/`metricSuffix` arman el texto final (ej. "+180%", "3x").
export interface CaseStudy {
  client: string;
  category: string;
  problem: string;
  solution: string;
  metricValue: number;
  metricPrefix: string;
  metricSuffix: string;
  metricLabel: string;
  image: string; // ruta en /public — REEMPLAZAR por foto real
}

export const cases: CaseStudy[] = [
  {
    client: 'Mary Tierra',
    category: 'Redes + contenido',
    problem:
      'Una dietética con productos increíbles pero un Instagram dormido: publicaban cada tanto, sin estética definida y casi sin consultas.',
    solution:
      'Rediseñamos el feed, armamos un calendario de contenido semanal y empezamos a mostrar los productos con fotos propias y recetas.',
    metricValue: 180,
    metricPrefix: '+',
    metricSuffix: '%',
    metricLabel: 'de alcance en 3 meses',
    image: '/cases/mary-tierra.jpg',
  },
  {
    client: 'Martínez Detailing',
    category: 'Publicidad Meta',
    problem:
      'Dependían del boca en boca y de conocidos. Querían llenar la agenda pero no sabían cómo llegar a gente nueva en Neuquén capital.',
    solution:
      'Lanzamos campañas en Meta segmentadas por zona con videos del antes y después, y ordenamos el flujo de consultas por WhatsApp.',
    metricValue: 3,
    metricPrefix: '',
    metricSuffix: 'x',
    metricLabel: 'consultas por WhatsApp',
    image: '/cases/martinez-detailing.jpg',
  },
  {
    client: 'El Rincón de Aurora',
    category: 'Identidad + redes',
    problem:
      'Un emprendimiento familiar sin identidad visual: cada publicación parecía de una marca distinta y costaba que la gente los recuerde.',
    solution:
      'Creamos su identidad completa —logo, paleta, tipografías— y la aplicamos a redes, packaging y cartelería del local.',
    metricValue: 65,
    metricPrefix: '+',
    metricSuffix: '%',
    metricLabel: 'de seguidores en 2 meses',
    image: '/cases/rincon-aurora.jpg',
  },
];
