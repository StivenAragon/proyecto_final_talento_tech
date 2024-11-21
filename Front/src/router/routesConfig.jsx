import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import PerfilPage from "../pages/PerfilPage";
import CambiarContrasenhaPage from "../pages/CambiarContrasenhaPage";
import NotFoundPage from "../pages/NotFoundPage ";
import ServiciosPage from "../pages/Servicios/ServiciosPage";
import DestinosPage from "../pages/Destinos/DestinosPage";
import ProveedoresPage from "../pages/Proveedores/ProveedoresPage";
import CampanhasPage from "../pages/Campanhas/CampanhasPage";

const routesConfig = [
    {
        path: '/',
        index: true,
        element: <LoginPage />,
    },
    {
        path: 'login',
        element: (
            <PublicRoute>
                <LoginPage />
            </PublicRoute>
        ),
    },
    {
        path: 'register',
        element: (
            <PublicRoute>
                <RegisterPage />
            </PublicRoute>
        ),
    },
    {
        path: 'dashboard',
        element: (
            <PrivateRoute>
                <DashboardPage />
            </PrivateRoute>
        ),
    },
    {
        path: 'perfil',
        element: (
            <PrivateRoute>
                <PerfilPage />
            </PrivateRoute>
        ),
    },
    {
        path: 'cambiar_contrasenha',
        element: (
            <PrivateRoute>
                <CambiarContrasenhaPage />
            </PrivateRoute>
        ),
    },
    {
        path: 'proveedores',
        element: (
            <PrivateRoute>
                <ProveedoresPage />
            </PrivateRoute>
        ),
    },
    {
        path: 'servicios',
        element: (
            <PrivateRoute>
                <ServiciosPage />
            </PrivateRoute>
        ),
    },
    {
        path: 'destinos',
        element: (
            <PrivateRoute>
                <DestinosPage />
            </PrivateRoute>
        ),
    },
    {
        path: 'campanhas',
        element: (
            <PrivateRoute>
                <CampanhasPage />
            </PrivateRoute>
        ),
    },
    {
        path: '*', 
        element: <NotFoundPage />,
    },
];

export default routesConfig;