import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import NotFoundPage from "../pages/NotFoundPage ";
import ServiciosPage from "../pages/Servicios/ServiciosPage";

const routesConfig = [
    {
        path: '/',
        index: true,
        element: <HomePage />,
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
        path: 'servicios',
        element: (
            <PrivateRoute>
                <ServiciosPage />
            </PrivateRoute>
        ),
    },
    {
        path: '*', 
        element: <NotFoundPage />,
    },
];

export default routesConfig;