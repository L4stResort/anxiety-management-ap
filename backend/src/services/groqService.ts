import axios from 'axios';
import dotenv from "dotenv";
dotenv.config(); 

const GROQ_API_URL = process.env.GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_API_KEY = process.env.GROQ_API_KEY;

export const getRecommendations = async (userInput: string): Promise<any> => {
    try {
        const response = await axios.post(
            GROQ_API_URL,
            {
                model: 'openai/gpt-oss-20b', // Cambia el modelo si usas otro
                messages: [
                    { role: 'system', content: 'Eres un asistente experto en salud mental.' },
                    { role: 'user', content: userInput }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching recommendations from Groq API:', error);
        throw new Error('Failed to fetch recommendations');
    }
};