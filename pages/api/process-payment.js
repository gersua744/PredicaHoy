export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { method, amount, details } = req.body;

  // Simulación de procesamiento de pago
  setTimeout(() => {
    // En producción, aquí conectarías con Stripe, PayPal, etc.
    const success = Math.random() > 0.1; // 90% de éxito para simular
    
    if (success) {
      res.status(200).json({ 
        success: true, 
        transactionId: `TX-${Date.now()}`,
        message: `Tu donación de $${amount} ha sido procesada correctamente. ¡Gracias por tu generosidad!`
      });
    } else {
      res.status(400).json({ 
        success: false,
        message: 'Hubo un problema al procesar tu donación. Por favor, intenta de nuevo.'
      });
    }
  }, 1500);
}
