import { Router } from 'express';
import { getRecommendations } from '../services/groqService';
import { User } from '../models/User';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { score, userId } = req.body;

    // Log para depurar lo que llega desde el frontend
    console.log('Datos recibidos en /recommendations:', { score, userId });

    // Determinar nivel de ansiedad según GAD-7
    let level = '';
    if (score <= 4) level = 'mínima';
    else if (score <= 9) level = 'leve';
    else if (score <= 14) level = 'moderada';
    else level = 'severa';

    // Prompt enviado a Groq
    const userPrompt = `
    El usuario obtuvo un puntaje de ${score} en el test GAD-7, lo cual indica el nivel de ansiedad ${level}.
    Muestrame el score y el nivel de ansiedad.
    Tus respuestas deben basarse en resultados obtenidos de internet sobre gad-7 y manejo de ansiedad.
    No puedes usar la misma recomendación para diferentes niveles de ansiedad.
    No recomiendes apps , solo técnicas y hábitos diarios.
    Proporciona  5 tecnicas con sus explicaciones practicas para realizarlo.    
    incluyendo técnicas de respiración, mindfulness y hábitos saludables.
    Van dirigidos a estudiantes universitarios que buscan mejorar su bienestar mental.
    No incluyas explicaciones, solo la lista de recomendaciones.
    
    `;

    // Llamar a Groq
    const response = await getRecommendations(userPrompt);
    // Extraer texto de la respuesta
    const recommendationsText = response.choices[0].message.content;

    const recsArray = recommendationsText
      .split(/\n|-/)
      .map((r: string) => r.trim())
      .filter((r: string) => r.length > 0);

    // Guardar resultado en historial si el usuario está logueado
    if (userId) {
      await User.findByIdAndUpdate(
        userId,
        {
          $push: { results: { gad7Score: score, anxietyLevel: level } }
        },
        { new: true }
      );
    }

    res.json({
      score,
      anxietyLevel: level,
      recommendations: recsArray
    });

  } catch (error) {
    console.error('Error en /recommendations:', error);
    res.status(500).json({ error: 'Error obteniendo recomendaciones' });
  }
});

export default router;

