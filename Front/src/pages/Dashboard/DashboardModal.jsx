import React, { useState } from 'react';

const DashboardModal = ({ nombre, proveedor, precio_format, fecha_inicio, fecha_fin, tiempo_salida, destino_desde, destino_hasta, servicios }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Función para abrir el modal
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="bg-gray-200 p-4 rounded-lg shadow-md">
            <h3 className="font-semibold">{nombre}</h3>
            <p className="text-sm text-gray-600">Proveedor: {proveedor}</p>
            <p className="text-sm text-gray-600">Precio: {precio_format}</p>
            <p className="text-sm text-gray-600">Fecha Inicial: {fecha_inicio}</p>
            <p className="text-sm text-gray-600">Fecha Final: {fecha_fin}</p>
            <p className="text-sm text-gray-600">Hora Salida: {tiempo_salida}</p>
            <p className="text-sm text-gray-600">Destino Desde: {destino_desde}</p>
            <p className="text-sm text-gray-600">Destino Hasta: {destino_hasta}</p>

            <button onClick={handleOpenModal} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600">
                Ver Servicios
            </button>
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h2 className="text-xl mb-4">Servicios de {nombre}</h2>
                        <ul className="text-sm text-gray-600">
                            {servicios.length > 0 ? (
                                servicios.map((servicio, index) => (
                                    <li key={index+1} className="mb-2">
                                        <p>{index+1}. {servicio.nombre}</p>
                                    </li>
                                ))
                            ) : (
                                <li>No hay servicios disponibles.</li>
                            )}
                        </ul>
                        <div className="mt-4 flex justify-end">
                            <button onClick={handleCloseModal} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600" >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardModal;