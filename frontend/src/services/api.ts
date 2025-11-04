import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust the URL as needed
//const API_URL = 'https://minduback.loca.lt/api';

export const submitGAD7Results = async (results: any) => {
    try {
        const response = await axios.post(`${API_URL}/gad7`, results);
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Error submitting GAD-7 results: ' + error.message);
        }
        throw new Error('Error submitting GAD-7 results: ' + String(error));
    }
};


export const getRecommendations = async (data: any) => {
    try {
        const response = await axios.post(`${API_URL}/recommendations`, data);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching recommendations: ' + error.message);
    }
};



export const registerUser = async (data: any) => {
    try {
        const response = await axios.post(`${API_URL}/users/register`, data);
        return response.data;
    } catch (error) {
        throw new Error('Error al registrar usuario: ' + error.message);
    }
};

export const loginUser = async (data: any) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, data);
        return response.data;
    } catch (error) {
        throw new Error('Error al iniciar sesión: ' + error.message);
    }
};
