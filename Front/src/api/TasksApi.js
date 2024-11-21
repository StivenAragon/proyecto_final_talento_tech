import axios from 'axios';   

const API_URL = "http://127.0.0.1:3000/api";

//Rutas Publicas
export const registerUserRequest = async (userDetails) => 
    await axios.post(`${API_URL}/register`, userDetails);

export const loginUserRequest = async (credentials) => 
    await axios.post(`${API_URL}/login`, credentials);

//Rutas Privadas

export const checkEmailsUniqueRequest = async(email) => 
    await axios.post(`${API_URL}/ckeckEmailsUnique`, email);

export const cambiarContrasenhaRequest = async(email) => 
    await axios.post(`${API_URL}/cambiarContrasenha`, email);

//Proveedores
export const getProveedoresRequest = async() => 
    await axios.get(`${API_URL}/proveedores`);

export const createProveedorRequest = async(proveedor) => 
    await axios.post(`${API_URL}/proveedores/create`, proveedor);

export const updateProveedorRequest = async(proveedor) => 
    await axios.post(`${API_URL}/proveedores/update`, proveedor);

export const deleteProveedorRequest = async(proveedor) => 
    await axios.post(`${API_URL}/proveedores/delete`, proveedor);

//Servicios
export const getServiciosRequest = async() => 
    await axios.get(`${API_URL}/servicios`);

export const createServicioRequest = async(servicio) => 
    await axios.post(`${API_URL}/servicios/create`, servicio);

export const updateServicioRequest = async(servicio) => 
    await axios.post(`${API_URL}/servicios/update`, servicio);

export const deleteServicioRequest = async(servicio) => 
    await axios.post(`${API_URL}/servicios/delete`, servicio);

export const getServiciosProveedoresRequest = async(servicio) => 
    await axios.post(`${API_URL}/servicios/getServiciosProveedores`, servicio);

//Destinos
export const getDestinosRequest = async() => 
    await axios.get(`${API_URL}/destinos`);

export const createDestinoRequest = async(destino) => 
    await axios.post(`${API_URL}/destinos/create`, destino);

export const updateDestinoRequest = async(destino) => 
    await axios.post(`${API_URL}/destinos/update`, destino);

export const deleteDestinoRequest = async(destino) => 
    await axios.post(`${API_URL}/destinos/delete`, destino);

export const getDestinosProveedoresRequest = async(destino) => 
    await axios.post(`${API_URL}/destinos/getDestinosProveedores`, destino);

//Campanhas
export const getCampanhasRequest = async(params) => 
    await axios.get(`${API_URL}/campanhas`, {params});

export const createCampanhaRequest = async(campanha) => 
    await axios.post(`${API_URL}/campanhas/create`, campanha);

export const updateCampanhaRequest = async(campanha) => 
    await axios.post(`${API_URL}/campanhas/update`, campanha);

export const deleteCampanhaRequest = async(campanha) => 
    await axios.post(`${API_URL}/campanhas/delete`, campanha);

export const getCampanhasProveedorRequest = async(campanha) => 
    await axios.post(`${API_URL}/campanhas/getCampanhasProveedor`, campanha);

export const getCampanhasDestinosDesdeRequest = async(campanha) => 
    await axios.post(`${API_URL}/campanhas/getCampanhasDestinosDesde`, campanha);

export const getCampanhasDestinosHastaRequest = async(campanha) => 
    await axios.post(`${API_URL}/campanhas/getCampanhasDestinosHasta`, campanha);