import React, { useEffect, useState } from 'react';
import { useTurismo } from "../../context/TurismoProvider";
import DashboardFilter from './DashboardFilter';
import CampaignModal from './DashboardModal';

const DashboardPage = () => {
    const { proveedores, loadProveedores, campanhas, loadCampanhas } = useTurismo();

    const initialFormValues = {proveedor: '', campanha: '', destinoDesde: '', destinoHasta: '', precio: ''};

    useEffect(() => {
        loadCampanhas();
        loadProveedores();
    }, []);

    const handleFormSubmit = async (values) => {
        loadCampanhas(values);
        console.log(values);
    };

    return (
        <div className="h-screen flex flex-col items-center bg-gray-100 p-4">
            <DashboardFilter onSubmit={handleFormSubmit} initialValues={initialFormValues} proveedores={proveedores} />

            <div className="w-full max-w-6xl bg-white mt-8 p-6 rounded-lg shadow-lg">
                <div className="flex justify-center mb-6">
                    <h2 className="text-2xl font-bold text-center">CAMPAÑAS</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {campanhas.map((campaign, index) => (
                        <CampaignModal
                            key={index}
                            nombre={campaign.nombre}
                            proveedor={campaign.proveedor_nombre}
                            precio_format={campaign.precio_format}
                            fecha_inicio={campaign.fecha_inicio}
                            fecha_fin={campaign.fecha_fin}
                            tiempo_salida={campaign.tiempo_salida}
                            destino_desde={campaign.destino_desde}
                            destino_hasta={campaign.destino_hasta}
                            servicios={campaign.compañiasServicios}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;