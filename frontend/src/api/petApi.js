import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const ENDPOINT = `${API_URL}/api/pets`;

export const getPets = async () => {
    const response = await axios.get(ENDPOINT);
    return response.data;
};

export const getPetById = async (id) => {
    const response = await axios.get(`${ENDPOINT}/${id}`);
    return response.data;
};




