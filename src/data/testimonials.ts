// ─── Testimonios ─────────────────────────────────────────────
// REEMPLAZAR: por testimonios reales cuando los tengas (idealmente con
// autorización del cliente para usar su nombre y negocio).
export interface Testimonial {
  quote: string;
  author: string;
  business: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Antes publicaba cuando me acordaba y no pasaba nada. Desde que trabajamos juntos me escriben por WhatsApp todas las semanas preguntando por los productos. Y lo mejor: me responden los mensajes el mismo día, no como otras agencias.',
    author: 'Marisa',
    business: 'Mar y Tierra',
  },
  {
    quote:
      'Yo era escéptico con la publicidad en redes, me parecía tirar plata. Me armaron una campaña y en el primer mes tuve que empezar a dar turnos con dos semanas de espera. Números claros todos los meses, sin vueltas.',
    author: 'Lucas Martínez',
    business: 'Martínez Detailing',
  },
  {
    quote:
      'Lo que más valoro es el trato. No sos un cliente más en una lista: conocen mi negocio, se acercaron al local, entendieron lo que quería transmitir. El cambio de imagen nos hizo ver como una marca de verdad.',
    author: 'Aurora',
    business: 'El Rincón de Aurora',
  },
  {
    quote:
      'Nos ordenaron todo: qué publicar, cuándo y para qué. Pasamos de improvisar a tener una estrategia. En tres meses el perfil creció más que en los dos años anteriores. Súper recomendables si tenés un negocio en la zona.',
    author: 'Julieta',
    business: 'Tune',
  },
];
