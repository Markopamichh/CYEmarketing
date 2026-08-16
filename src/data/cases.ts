// ─── Casos de éxito ──────────────────────────────────────────
// REEMPLAZAR: métricas reales de cada proyecto.
// `metricValue` es el número que se anima con el contador;
// `metricPrefix`/`metricSuffix` arman el texto final (ej. "+180%", "3x").
//
// `link`  → URL al post/reel de Instagram que sirve como prueba (opcional).
// `image` → foto real del proyecto en /public (opcional). Si no hay imagen,
//           se muestra un bloque con el botón "Ver en Instagram". Cuando
//           tengan la foto, agregá `image` y se usa en lugar del placeholder.
export interface CaseStudy {
  client: string;
  category: string;
  problem: string;
  solution: string;
  metricValue: number;
  metricPrefix: string;
  metricSuffix: string;
  metricLabel: string;
  link?: string; // post/reel de Instagram
  image?: string; // ruta en /public — agregar cuando tengan la foto
}

export const cases: CaseStudy[] = [
  {
    client: 'Mar y Tierra',
    category: 'Redes + contenido',
    problem:
      'Una rotiseria con productos increíbles pero un Instagram dormido: publicaban cada tanto, sin estética definida y casi sin consultas.',
    solution:
      'Rediseñamos el feed, armamos un calendario de contenido semanal y empezamos a mostrar los productos con fotos propias y de la comida.',
    metricValue: 180,
    metricPrefix: '+',
    metricSuffix: '%',
    metricLabel: 'de alcance en 3 meses',
    link: 'https://instagram.com/p/DN1fKmf4ldf',
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
    link: 'https://instagram.com/p/DUMLWj0kriV',
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
    link: 'https://instagram.com/p/Dad6mZCtQKR',
  },
  {
    client: 'Estudio RZ Jurídico',
    category: 'Marca + contenido',
    problem:
      'Un estudio jurídico serio pero invisible en internet: sin presencia en redes, dependían solo de recomendaciones y les costaba llegar a clientes nuevos.',
    solution:
      'Armamos una presencia profesional en Instagram con contenido que explica temas legales en simple, y posicionamos al estudio como referente cercano en la zona.',
    metricValue: 120,
    metricPrefix: '+',
    metricSuffix: '%',
    metricLabel: 'de consultas nuevas en 4 meses',
    link: 'https://instagram.com/p/DPe9BlDkfiX',
  },
  {
    client: 'Lo Quiero Showroom',
    category: 'Redes + publicidad',
    problem:
      'Un showroom de ropa con buen producto pero ventas irregulares: publicaban sin plan, las historias no convertían y el alcance no salía de sus seguidoras.',
    solution:
      'Definimos un calendario de lanzamientos, mejoramos la estética del feed y sumamos campañas en Meta para llegar a mujeres de Centenario y Neuquén.',
    metricValue: 2,
    metricPrefix: '',
    metricSuffix: 'x',
    metricLabel: 'ventas por Instagram en 3 meses',
    link: 'https://instagram.com/p/DaEa5cpxijU',
  },
  {
    client: 'Zen Market',
    category: 'Contenido + publicidad',
    problem:
      'Un negocio de venta de celulares en un rubro con mucha competencia y desconfianza: costaba diferenciarse de los revendedores informales y generar consultas serias.',
    solution:
      'Profesionalizamos el perfil con contenido claro de precios, garantía y financiación, y campañas en Meta segmentadas por zona que llevan las consultas directo a WhatsApp.',
    metricValue: 150,
    metricPrefix: '+',
    metricSuffix: '%',
    metricLabel: 'de consultas por WhatsApp en 3 meses',
    // Zen no tiene reel del caso: va directo a su perfil de Instagram
    link: 'https://instagram.com/zen.markett/',
  },
];
