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
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("proveedor", JSON.stringify(response.data.proveedor));
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
        return await handleRequest(checkEmailsUniqueRequest, [email]);
    };

    const [proveedores, setProveedores] = useState([]);

    async function loadProveedores() {
        const response = await getProveedoresRequest();
        setProveedores(response.data);
    }

    const createProveedor = async (proveedor) => {
        return await handleRequest(createProveedorRequest, [proveedor]);
    };

    const updateProveedor = async (proveedor) => {
        return await handleRequest(updateProveedorRequest, [proveedor]);
    };

    const deleteProveedor = async (proveedor) => {
        return await handleRequest(deleteProveedorRequest, [proveedor]);
    };

    const [servicios, setServicios] = useState([]);

    async function loadServicios() {
        const response = await getServiciosRequest();
        setServicios(response.data);
    }

    const createServicio = async (servicio) => {
        return await handleRequest(createServicioRequest, [servicio]);
    };

    const updateServicio = async (servicio) => {
        return await handleRequest(updateServicioRequest, [servicio]);
    };

    const deleteServicio = async (servicio) => {
        return await handleRequest(deleteServicioRequest, [servicio]);
    };

    const [destinos, setDestinos] = useState([]);

    async function loadDestinos() {
        const response = await getDestinosRequest();
        setDestinos(response.data);
    }

    const createDestino = async (destino) => {
        return await handleRequest(createDestinoRequest, [destino]);
    };

    const updateDestino = async (destino) => {
        return await handleRequest(updateDestinoRequest, [destino]);
    };

    const deleteDestino = async (destino) => {
        return await handleRequest(deleteDestinoRequest, [destino]);
    };

    const handleRequest = async (requestFunction, params) => {
        try {
            const response = await requestFunction(...params);
            return response;
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