export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { topic, verse, style, length } = req.body;

  // Simulación de tiempo de procesamiento
  setTimeout(() => {
    // Simulación de generación de sermón (en producción, aquí conectarías con OpenAI u otro servicio)
    const sermon = generateSermon(topic, verse, style, length);
    res.status(200).json({ sermon });
  }, 2000);
}

function generateSermon(topic, verse, style, length) {
  // Determinamos longitud aproximada según el parámetro
  const paragraphCount = 
    length === 'short' ? 3 : 
    length === 'medium' ? 5 : 7;

  // Creamos una estructura básica de sermón
  const title = `${topic}: Un mensaje de esperanza y reflexión`;
  
  const introduction = `En nuestra vida cristiana, reflexionar sobre "${topic}" es fundamental para crecer en nuestra fe. ${verse ? `Como nos dice la Escritura en ${verse}, la palabra de Dios es nuestra guía en este tema.` : 'Las Escrituras nos brindan sabiduría para entender este importante tema.'} Hoy exploraremos juntos cómo podemos aplicar estas enseñanzas en nuestra vida diaria.`;
  
  // Generamos los párrafos del desarrollo
  let development = '';
  for (let i = 0; i < paragraphCount; i++) {
    const paragraphType = i % 3;
    
    if (paragraphType === 0) {
      development += `<p>En primer lugar, debemos entender que "${topic}" tiene un profundo significado en nuestra vida espiritual. Cuando examinamos las enseñanzas bíblicas, encontramos que este tema aparece recurrentemente como una invitación a profundizar nuestra relación con Dios. ${verse ? `El pasaje de ${verse} nos recuerda la importancia de mantener nuestra mirada en lo alto, confiando en la providencia divina aun en tiempos difíciles.` : 'La Biblia nos recuerda constantemente que debemos confiar en Dios y seguir Sus caminos.'}</p>`;
    } else if (paragraphType === 1) {
      development += `<p>Es importante recordar que nuestra fe se vive en comunidad. Como creyentes, estamos llamados a compartir estas enseñanzas sobre "${topic}" con nuestros hermanos y hermanas. El apóstol Pablo nos exhorta a edificarnos mutuamente, a llevar las cargas los unos de los otros. Esta dimensión comunitaria de nuestra fe nos fortalece y nos ayuda a crecer juntos en el conocimiento de Dios.</p>`;
    } else {
      development += `<p>La aplicación práctica de estas enseñanzas sobre "${topic}" es esencial. No basta con conocer la verdad, debemos vivirla diariamente. Esto implica tomar decisiones conscientes que reflejen nuestra fe, aun cuando el mundo nos empuje en otra dirección. ${style === 'evangelistico' ? 'Este es el testimonio que puede llevar a otros a conocer a Cristo.' : 'Esta coherencia entre fe y obras es lo que da credibilidad a nuestro testimonio.'}</p>`;
    }
  }
  
  const conclusion = `<p>Para concluir, recordemos que "${topic}" no es simplemente un concepto teológico, sino una invitación a vivir nuestra fe de manera auténtica y transformadora. ${verse ? `Como nos recuerda ${verse}, nuestra vida está en las manos de Dios.` : 'Las Escrituras nos recuerdan que nuestra vida tiene propósito y significado en el plan divino.'} Que estas reflexiones nos impulsen a crecer en nuestra relación con Dios y a compartir Su amor con quienes nos rodean.</p>`;
  
  // Construimos el sermón completo
  return {
    title,
    content: `
      <div class="sermon-content">
        <h1>${title}</h1>
        <p class="verse">${verse || 'Basado en las Escrituras'}</p>
        <div class="section introduction">
          <h2>Introducción</h2>
          <p>${introduction}</p>
        </div>
        <div class="section development">
          <h2>Desarrollo</h2>
          ${development}
        </div>
        <div class="section conclusion">
          <h2>Conclusión</h2>
          ${conclusion}
        </div>
      </div>
    `,
    metadata: {
      topic,
      verse,
      style,
      length,
      date: new Date().toISOString(),
    }
  };
}

