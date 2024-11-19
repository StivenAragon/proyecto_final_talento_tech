import React from 'react';

const DashboardPage = () => {
    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="flex items-center space-x-4">
                <select
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="option1">Opción 1</option>
                    <option value="option2">Opción 2</option>
                    <option value="option3">Opción 3</option>
                </select>

                <input
                    type="text"
                    placeholder="Escribe aquí..."
                    className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Enviar
                </button>
            </div>
        </div>
    );
};

export default DashboardPage;
