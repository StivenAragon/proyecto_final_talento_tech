import { useContext, useState } from "react";
import { 
    registerUserRequest, loginUserRequest,
    getServiciosRequest, createServicioRequest, updateServicioRequest, deleteServicioRequest,
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

    const [servicios, setServicios] = useState([]);

    async function loadServicios() {
        const response = await getServiciosRequest();
        setServicios(response.data);
    }

    const createServicio = async (servicio) => {
        try {
            if (servicio.nombre !== "") {
                const response = await createServicioRequest(servicio);
                return response;
            } else {
                alert("Por favor completar campos");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const updateServicio = async (servicio) => {
        try {
            if (servicio.title !== "") {
                const response = await updateServicioRequest(servicio);
                return response;
            } else {
                alert("Por favor completar campos");
            }
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

    return (
        <TurismoContext.Provider value={{
            user, registerUser, loginUser,
            servicios, loadServicios, createServicio, updateServicio, deleteServicio
        }}>
            {children}
        </TurismoContext.Provider>
    );
}