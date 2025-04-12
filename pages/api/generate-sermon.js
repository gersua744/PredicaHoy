import { generateSermon } from '../../utils/sermonGenerator';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { topic, verse, style, length } = req.body;
  
  // Validación básica
  if (!topic || !style || !length) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Generar sermón
    const sermon = generateSermon({ topic, verse, style, length });
    
    // Responder con el sermón generado
    res.status(200).json({ sermon });
  } catch (error) {
    console.error('Error generating sermon:', error);
    res.status(500).json({ message: 'Error generating sermon' });
  }
}
