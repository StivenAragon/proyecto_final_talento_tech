import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Página no encontrada</h1>
            <p className="text-lg text-gray-600 mb-6">
                Lo sentimos, la página que buscas no existe.
            </p>
            <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Volver al inicio
            </Link>
        </div>
    );
};

export default NotFoundPage;