import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';

export const Navbar = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false);

    const onLogout = () => {
        localStorage.removeItem('token');
        navigate('/login', {
            replace: true,
        });
    };

    const toggleRightMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleLeftMenu = () => {
        setIsLeftMenuOpen(!isLeftMenuOpen);
    };

    const closeLeftMenu = () => {
        setIsLeftMenuOpen(false);
    };

    return (
        <>
            <header className="bg-gray-800 text-white">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    {token ? (
                        <>
                            <div className="relative">
                                <button
                                    className="text-white"
                                    onClick={toggleLeftMenu}
                                >
                                    <i className="fa fa-bars text-2xl mr-4"></i>
                                </button>
                                {isLeftMenuOpen && (
                                    <div className="absolute left-0 top-12 w-48 bg-gray-800 text-white p-4 rounded-md shadow-md">
                                        <Link
                                            to="/proveedores"
                                            className="block hover:bg-gray-700 px-3 py-2 rounded transition"
                                            onClick={closeLeftMenu}
                                        >
                                            Proveedores
                                        </Link>
                                        <Link
                                            to="/servicios"
                                            className="block hover:bg-gray-700 px-3 py-2 rounded transition"
                                            onClick={closeLeftMenu}
                                        >
                                            Servicios
                                        </Link>
                                        <Link
                                            to="/destinos"
                                            className="block hover:bg-gray-700 px-3 py-2 rounded transition"
                                            onClick={closeLeftMenu}
                                        >
                                            Destinos
                                        </Link>
                                        <Link
                                            to="/reports"
                                            className="block hover:bg-gray-700 px-3 py-2 rounded transition"
                                            onClick={closeLeftMenu}
                                        >
                                            Campañas
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <h1 className="text-2xl font-bold">
                                <Link to="/dashboard" className="hover:text-gray-300">
                                    <i className="fa fa-home"></i>
                                </Link>
                            </h1>
                        </>
                    ) : (
                        <h1 className="text-2xl font-bold">
                            <Link to="/" className="hover:text-gray-300">
                                <i className="fa fa-home"></i>
                            </Link>
                        </h1>
                    )}

                    <nav className="flex items-center space-x-4 ml-auto">
                        {!token ? (
                            <>
                                <Link
                                    to="/login"
                                    className="hover:bg-gray-700 px-3 py-2 rounded transition"
                                >
                                    <i className="fa fa-sign-in mr-2"></i>
                                    Iniciar sesión
                                </Link>
                                <Link
                                    to="/register"
                                    className="hover:bg-gray-700 px-3 py-2 rounded transition"
                                >
                                    <i className="fa fa-user-plus mr-2"></i>
                                    Registrarse
                                </Link>
                            </>
                        ) : (
                            <div className="relative flex items-center space-x-4">
                                <span className="text-sm font-medium hidden lg:block">
                                    {state?.name}
                                </span>

                                <button
                                    className="text-white"
                                    onClick={toggleRightMenu}
                                >
                                    <i className="fa fa-bars text-2xl"></i>
                                </button>

                                {isMenuOpen && (
                                    <div className="absolute right-0 top-12 w-48 bg-gray-800 text-white p-4 rounded-md shadow-md">
                                        <Link
                                            to="/profile"
                                            className="block hover:bg-gray-700 px-3 py-2 rounded transition"
                                        >
                                            Perfil
                                        </Link>
                                        <button
                                            onClick={onLogout}
                                            className="block w-full text-left hover:bg-red-500 px-3 py-2 rounded transition mt-2"
                                        >
                                            Cerrar sesión
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </nav>
                </div>
            </header>

            <Outlet />
        </>
    );
};