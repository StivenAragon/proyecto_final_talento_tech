import { useContext, useState } from "react";
import { 
    registerUserRequest, loginUserRequest, checkEmailsUniqueRequest,
    getServiciosRequest, createServicioRequest, updateServicioRequest, deleteServicioRequest,
    getDestinosRequest, createDestinoRequest, updateDestinoRequest, deleteDestinoRequest,
    getProveedoresRequest, createProveedorRequest, updateProveedorRequest, deleteProveedorRequest, 
} from "../api/TasksApi.js";
import { TurismoContext } from "./TurismoContext.jsx";

export const useTurismo = () => {
    const context = useContext(TurismoContext);
    if (!context) {
        throw new Error("useTurismos must be used within a TurismoContext");
    }
    return context;
};

export const TurismoContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const registerUser = async (userDetails) => {
        try {
            const response = await registerUserRequest(userDetails);
            return response.data; 
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    throw new Error(error.response.data.message || "Recurso no encontrado");
                } else {
                    throw new Error(error.response.data.message || "Hubo un error en la solicitud");
                }
            } else if (error.request) {
                throw new Error("Hubo un problema con la solicitud.");
            } else {
                throw new Error("Error desconocido.");
            }
        }
    };

    const loginUser = async (credentials) => {
        try {
            const response = await loginUserRequest(credentials);
            setUser(response.data.user); 
            localStorage.setItem("token", response.data.token); 
            return response.data.message;
        }  catch (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    throw new Error(error.response.data.message || "Recurso no encontrado");
                } else {
                    throw new Error(error.response.data.message || "Hubo un error en la solicitud");
                }
            } else if (error.request) {
                throw new Error("Hubo un problema con la solicitud.");
            } else {
                throw new Error("Error desconocido.");
            }
        }
    };

    const checkEmailsUnique = async (email) => {
        try {
            const response = await checkEmailsUniqueRequest(email);
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    const [proveedores, setProveedores] = useState([]);

    async function loadProveedores() {
        const response = await getProveedoresRequest();
        setProveedores(response.data);
    }

    const createProveedor = async (proveedor) => {
        try {
            const response = await createProveedorRequest(proveedor);
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    const updateProveedor = async (proveedor) => {
        try {
            const response = await updateProveedorRequest(proveedor);
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    const deleteProveedor = async (id) => {
        try {
            const response = await deleteProveedorRequest(id);
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    const [servicios, setServicios] = useState([]);

    async function loadServicios() {
        const response = await getServiciosRequest();
        setServicios(response.data);
    }

    const createServicio = async (servicio) => {
        try {
            const response = await createServicioRequest(servicio);
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    const updateServicio = async (servicio) => {
        try {
            const response = await updateServicioRequest(servicio);
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    const deleteServicio = async (id) => {
        try {
            const response = await deleteServicioRequest(id);
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    const [destinos, setDestinos] = useState([]);

    async function loadDestinos() {
        const response = await getDestinosRequest();
        setDestinos(response.data);
    }

    const createDestino = async (destino) => {
        try {
            const response = await createDestinoRequest(destino);
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    const updateDestino = async (destino) => {
        try {
            const response = await updateDestinoRequest(destino);
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    const deleteDestino = async (id) => {
        try {
            const response = await deleteDestinoRequest(id);
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <TurismoContext.Provider value={{
            user, registerUser, loginUser, checkEmailsUnique,
            proveedores, loadProveedores, createProveedor, updateProveedor, deleteProveedor,
            servicios, loadServicios, createServicio, updateServicio, deleteServicio,
            destinos, loadDestinos, createDestino, updateDestino, deleteDestino,
        }}>
            {children}
        </TurismoContext.Provider>
    );
}