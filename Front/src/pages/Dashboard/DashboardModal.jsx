import React from 'react';

const DashboardModal = ({ nombre, proveedor, precio_format, fecha_inicio, fecha_fin, tiempo_salida, destino_desde, destino_hasta }) => {
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
        </div>
    );
};

export default DashboardModal;