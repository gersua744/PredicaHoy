// Esta función simula la generación de un sermón
// En una implementación real, aquí conectarías con una API de IA como OpenAI

export const generateSermon = (params) => {
  const { topic, verse, style, length } = params;
  
  // Capitalizar primera letra
  const capitalizeFirst = str => str.charAt(0).toUpperCase() + str.slice(1);
  const topicCapitalized = capitalizeFirst(topic);
  
  // Generar título basado en el tema
  let title;
  const titleTemplates = [
    `${topicCapitalized}: Un llamado a la acción`,
    `El poder de ${topic} en la vida cristiana`,
    `Descubriendo ${topic} en las escrituras`,
    `${topicCapitalized}: Perspectiva bíblica`,
    `Transformados por ${topic}`,
    `${topicCapitalized} según Jesús`,
    `${topicCapitalized} para el creyente de hoy`
  ];
  title = titleTemplates[Math.floor(Math.random() * titleTemplates.length)];
  
  // Generar introducción
  const introTemplates = [
    `En un mundo donde los valores cristianos parecen estar en constante desafío, ${topic} se mantiene como un principio fundamental para nuestra fe. Hoy exploraremos cómo este concepto puede transformar nuestras vidas y acercarnos más a Dios.`,
    `La Biblia nos habla extensamente sobre ${topic}, y con buena razón. Este principio divino tiene el poder de cambiar corazones y renovar mentes. Veamos juntos lo que la palabra de Dios nos enseña al respecto.`,
    `¿Alguna vez te has preguntado qué significa realmente ${topic} en tu caminar cristiano? Hoy profundizaremos en este tema vital que afecta cada aspecto de nuestra relación con Dios y con los demás.`,
    `El concepto de ${topic} aparece a lo largo de las Escrituras como un hilo conductor que conecta el plan redentor de Dios. Hoy estudiaremos su significado y aplicación para nuestras vidas.`
  ];
  const introduction = introTemplates[Math.floor(Math.random() * introTemplates.length)];
  
  // Generar puntos del sermón basados en estilo y longitud
  let numPoints = 3;
  if (length === 'corto') numPoints = 2;
  if (length === 'largo') numPoints = 4;
  
  const points = [];
  
  if (style === 'expositivo') {
    const expositoryPoints = [
      {
        title: `El origen bíblico de ${topic}`,
        content: `Las primeras menciones de ${topic} en la Biblia nos remiten a pasajes fundamentales que establecen este principio divino. Tanto en el Antiguo como en el Nuevo Testamento, vemos cómo Dios valora y enseña sobre ${topic} a través de ejemplos concretos y mandamientos directos.`
      },
      {
        title: `${topicCapitalized} en la enseñanza de Jesús`,
        content: `Cristo no solo enseñó sobre ${topic} a través de sus parábolas y sermones, sino que lo demostró con su vida. Su ejemplo perfecto nos muestra cómo ${topic} debe manifestarse en nuestro carácter y acciones diarias.`
      },
      {
        title: `${topicCapitalized} en el contexto de la iglesia primitiva`,
        content: `Los primeros cristianos entendieron y aplicaron ${topic} de maneras que transformaron su comunidad. A través de las epístolas, vemos cómo este principio moldeó la identidad y misión de la iglesia naciente, estableciendo un precedente para nosotros hoy.`
      },
      {
        title: `${topicCapitalized} a través de la historia cristiana`,
        content: `A lo largo de los siglos, grandes hombres y mujeres de fe han demostrado el poder de ${topic}. Sus testimonios nos inspiran y nos muestran cómo este principio eterno puede manifestarse en diferentes épocas y contextos.`
      }
    ];
    for (let i = 0; i < numPoints; i++) {
      points.push(expositoryPoints[i]);
    }
  } else if (style === 'tematico') {
    const thematicPoints = [
      {
        title: `${topicCapitalized} comienza en el corazón`,
        content: `Antes de manifestarse externamente, ${topic} es una realidad interna que Dios desarrolla en nosotros. Las Escrituras nos enseñan que la transformación auténtica ocurre de adentro hacia afuera, comenzando con un corazón rendido a la obra del Espíritu Santo.`
      },
      {
        title: `${topicCapitalized} en nuestras relaciones`,
        content: `Nuestras interacciones con los demás son el campo de prueba para ${topic}. Cuando aplicamos este principio en nuestras relaciones familiares, de amistad y con nuestros hermanos en la fe, manifestamos el carácter de Cristo ante un mundo que necesita desesperadamente ver autenticidad.`
      },
      {
        title: `${topicCapitalized} frente a las adversidades`,
        content: `Los desafíos y pruebas revelan la verdadera profundidad de nuestro compromiso con ${topic}. La Biblia nos muestra cómo podemos mantener este principio aun en las circunstancias más difíciles, confiando en las promesas de Dios y en su presencia constante.`
      },
      {
        title: `${topicCapitalized} como testimonio al mundo`,
        content: `Nuestra fidelidad a ${topic} constituye un poderoso testimonio para los no creyentes. Cuando vivimos de acuerdo con este principio, las personas ven la diferencia que Cristo hace en nuestras vidas y se ven atraídas hacia la verdad del evangelio.`
      }
    ];
    for (let i = 0; i < numPoints; i++) {
      points.push(thematicPoints[i]);
    }
  } else if (style === 'evangelistico') {
    const evangelisticPoints = [
      {
        title: `La necesidad universal de ${topic}`,
        content: `Todos los seres humanos, independientemente de su trasfondo o circunstancias, experimentan una profunda necesidad de ${topic}. Esta necesidad común revela nuestra condición espiritual y apunta hacia nuestra necesidad del evangelio.`
      },
      {
        title: `La respuesta de Dios a nuestra necesidad de ${topic}`,
        content: `Dios, en su infinito amor y sabiduría, ha provisto una solución perfecta a nuestra necesidad de ${topic} a través de la obra redentora de Cristo. Su plan de salvación aborda directamente esta necesidad fundamental.`
      },
      {
        title: `La transformación que trae ${topic} a través de Cristo`,
        content: `Cuando recibimos a Cristo, experimentamos una transformación radical en relación con ${topic}. El evangelio no solo nos salva, sino que comienza un proceso de renovación que afecta cómo entendemos y experimentamos ${topic}.`
      },
      {
        title: `Compartiendo ${topic} con un mundo necesitado`,
        content: `Como receptores de la gracia de Dios, estamos llamados a ser canales de ${topic} para los demás. Nuestro testimonio personal y la proclamación del evangelio llevan la verdad liberadora de ${topic} a quienes aún no conocen a Cristo.`
      }
    ];
    for (let i = 0; i < numPoints; i++) {
      points.push(evangelisticPoints[i]);
    }
  } else if (style === 'devocional') {
    const devotionalPoints = [
      {
        title: `Reflexionando sobre ${topic} en nuestra vida diaria`,
        content: `La práctica diaria de meditar en ${topic} transforma nuestra perspectiva y actitudes. Cuando dedicamos tiempo a la reflexión y oración sobre este principio, permitimos que el Espíritu Santo lo integre profundamente en nuestro ser.`
      },
      {
        title: `${topicCapitalized} como disciplina espiritual`,
        content: `Cultivar ${topic} requiere disciplina y práctica intencional. Al igual que cualquier hábito espiritual, debemos ejercitarlo regularmente para que se convierta en parte natural de nuestra vida con Cristo.`
      },
      {
        title: `Experimentando a Dios a través de ${topic}`,
        content: `${topicCapitalized} nos abre a una experiencia más profunda de la presencia de Dios. Cuando abrazamos este principio, encontramos que nuestro vínculo con el Señor se fortalece y nuestra comunión con Él se enriquece.`
      },
      {
        title: `Cultivando un corazón lleno de ${topic}`,
        content: `El desarrollo de ${topic} es un proceso continuo que requiere atención al estado de nuestro corazón. Al vigilar nuestros pensamientos y actitudes, podemos cultivar un terreno fértil donde este principio crezca y flourezca.`
      }
    ];
    for (let i = 0; i < numPoints; i++) {
      points.push(devotionalPoints[i]);
    }
  } else if (style === 'narrativo') {
    const narrativePoints = [
      {
        title: `La historia de ${topic} en la vida de Abraham`,
        content: `La vida del patriarca Abraham nos ofrece un poderoso ejemplo de ${topic} en acción. Su viaje de fe ilustra cómo este principio se desarrolla a través de pruebas y bendiciones, mostrando la fidelidad de Dios a lo largo del camino.`
      },
      {
        title: `${topicCapitalized} en la vida de David`,
        content: `El rey David, a pesar de sus fallos, encarna importantes lecciones sobre ${topic}. Su historia nos muestra cómo Dios utiliza imperfectas vasijas humanas para manifestar este principio divino en medio de triunfos y caídas.`
      },
      {
        title: `${topicCapitalized} a través de la vida de Pablo`,
        content: `La dramática transformación del apóstol Pablo revela el poder de ${topic} para cambiar radicalmente una vida. Su ministerio demuestra cómo este principio puede superar prejuicios y barreras culturales para avanzar el Reino de Dios.`
      },
      {
        title: `Jesús como la máxima expresión de ${topic}`,
        content: `En la persona de Jesús, vemos la perfecta demostración de ${topic}. Sus palabras, acciones y sacrificio definitivo nos muestran la profundidad y amplitud de este principio divino, estableciendo un modelo para que sigamos.`
      }
    ];
    for (let i = 0; i < numPoints; i++) {
      points.push(narrativePoints[i]);
    }
  } else {
    // Puntos genéricos para otros estilos
    for (let i = 0; i < numPoints; i++) {
      points.push({
        title: `Aspecto ${i+1} de ${topic} en la vida cristiana`,
        content: `Contenido detallado sobre ${topic} y su aplicación en la vida cristiana. Este punto examina cómo este principio afecta nuestra relación con Dios y con los demás, basándose en las enseñanzas de las Escrituras.`
      });
    }
  }
  
  // Generar conclusión
  const conclusionTemplates = [
    `Al reflexionar sobre ${topic}, somos desafiados a examinar nuestras propias vidas y preguntarnos si estamos viviendo de acuerdo con este principio fundamental. Que el Espíritu Santo nos guíe hacia una comprensión más profunda y una aplicación más fiel en nuestro caminar diario con Cristo.`,
    `${topicCapitalized} no es simplemente un concepto teológico para estudiar, sino una realidad transformadora para experimentar. Mi oración es que cada uno de nosotros abrace plenamente lo que Dios nos ofrece en esta área, permitiendo que su obra de gracia continúe conformándonos a la imagen de su Hijo.`,
    `Mientras concluimos esta reflexión sobre ${topic}, recordemos que nuestro Dios es fiel para completar la buena obra que ha comenzado en nosotros. Con su ayuda, podemos crecer en este aspecto crucial de nuestra fe, reflejando cada vez más el carácter de Cristo ante un mundo que necesita desesperadamente su verdad y amor.`
  ];
  const conclusion = conclusionTemplates[Math.floor(Math.random() * conclusionTemplates.length)];
  
  // Generar puntos de aplicación
  const applicationTemplates = [
    `Dedica tiempo diario a meditar sobre pasajes bíblicos relacionados con ${topic}.`,
    `Identifica un área específica donde puedas aplicar ${topic} esta semana.`,
    `Comparte con un amigo o familiar lo que has aprendido sobre ${topic}.`,
    `Ora pidiendo a Dios que te revele cualquier obstáculo en tu vida que esté impidiendo experimentar ${topic} plenamente.`,
    `Busca mentores espirituales que modelen ${topic} de manera auténtica.`,
    `Forma un grupo pequeño para estudiar más profundamente sobre ${topic}.`,
    `Escribe en un diario tus experiencias relacionadas con ${topic} durante las próximas semanas.`
  ];
  
  // Seleccionar puntos de aplicación aleatorios
  let numApplicationPoints = 3;
  if (length === 'corto') numApplicationPoints = 2;
  if (length === 'largo') numApplicationPoints = 4;
  
  const application = [];
  const usedIndices = new Set();
  
  while (application.length < numApplicationPoints) {
    const randomIndex = Math.floor(Math.random() * applicationTemplates.length);
    if (!usedIndices.has(randomIndex)) {
      application.push(applicationTemplates[randomIndex]);
      usedIndices.add(randomIndex);
    }
  }
  
  // Devolver el objeto sermón completo
  return {
    title,
    verse,
    topic,
    style,
    length,
    introduction,
    points,
    conclusion,
    application,
    timestamp: Date.now()
  };
};
