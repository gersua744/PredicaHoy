module.exports = function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { method, amount, details } = req.body;
  
  // Validación básica
  if (!method || !amount) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // En una implementación real, aquí conectarías con un procesador de pagos como Stripe
    // Simulamos un proceso de pago exitoso
    const transactionId = `TX-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Responder con confirmación
    res.status(200).json({ 
      success: true, 
      transactionId,
      amount,
      method,
      message: `Tu donación de $${amount} ha sido procesada correctamente. ¡Gracias por tu generosidad!`
    });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error al procesar el pago. Por favor, intenta de nuevo.'
    });
  }
};
