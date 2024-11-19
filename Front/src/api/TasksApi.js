import axios from 'axios';   

const API_URL = "http://127.0.0.1:3000/api";

//Rutas Publicas
export const registerUserRequest = async (userDetails) => 
    await axios.post(`${API_URL}/register`, userDetails);

export const loginUserRequest = async (credentials) => 
    await axios.post(`${API_URL}/login`, credentials);

//Rutas Privadas

//Servicios
export const getServiciosRequest = async() => 
    await axios.get(`${API_URL}/servicios`);

export const createServicioRequest = async(servicio) => 
    await axios.post(`${API_URL}/servicios/create`, servicio);

export const updateServicioRequest = async(servicio) => 
    await axios.post(`${API_URL}/servicios/update`, servicio);

export const deleteServicioRequest = async(servicio) => 
    await axios.post(`${API_URL}/servicios/delete`, servicio);