import React, { useState, useEffect } from 'react';
import { useTurismo } from "../../context/TurismoProvider";
import { Formik } from 'formik';
import 'font-awesome/css/font-awesome.min.css';

const DashboardFilter = ({ onSubmit, initialValues, proveedores }) => {
  const { getCampanhasProveedor, getCampanhasDestinosDesde, getCampanhasDestinosHasta } = useTurismo();

  const [campanhas, setCampanhas] = useState([]);
  const [destinosDesde, setDestinosDesde] = useState([]); 
  const [destinosHasta, setDestinosHasta] = useState([]); 

  const handleProveedorChange = async (proveedorId) => {
    try {
      if (proveedorId) {
        const response = await getCampanhasProveedor({ proveedor_id: proveedorId });
        if (response && response.data) {
          setCampanhas(response.data); 
        }
      } else {
        setCampanhas([]);
      }
    } catch (error) {
      setCampanhas([]);
    }
  };

  const handleCampanhaChange = async (campanhaId) => {
    try {
      if (campanhaId) {
        const responseDestinosDesde = await getCampanhasDestinosDesde({ campanha_id: campanhaId });
        const responseDestinosHasta = await getCampanhasDestinosHasta({ campanha_id: campanhaId });
        
        if (responseDestinosDesde && responseDestinosDesde.data) {
          setDestinosDesde(responseDestinosDesde.data);
        }
        if (responseDestinosHasta && responseDestinosHasta.data) {
          setDestinosHasta(responseDestinosHasta.data);
        }
      } else {
        setDestinosDesde([]);
        setDestinosHasta([]);
      }
    } catch (error) {
      setDestinosDesde([]);
      setDestinosHasta([]);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} >
      {({ handleChange, handleSubmit, values, isSubmitting }) => (
        <form className="space-y-6 w-full max-w-6xl px-4">
          <div className="flex flex-wrap justify-between gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-gray-700 font-bold mb-2">Proveedor</label>
              <select name="proveedor" value={values.proveedor} className={"px-4 py-2 rounded-md w-full border"} onChange={(e) => { handleChange(e); handleProveedorChange(e.target.value); }} >
                <option value="">Seleccione un destino</option>
                {proveedores.map((proveedor) => (
                  <option key={proveedor.id} value={proveedor.id}>
                    {proveedor.razon_social}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-gray-700 font-bold mb-2">Nombre Campaña</label>
              <select name="campanha" value={values.campanha} className={"px-4 py-2 rounded-md w-full border"} onChange={(e) => { handleChange(e); handleCampanhaChange(e.target.value); }}>
                <option value="">Seleccione un destino</option>
                {campanhas.map((campaña) => (
                  <option key={campaña.id} value={campaña.id}>
                    {campaña.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-gray-700 font-bold mb-2">Destino Desde</label>
              <select name="destinoDesde" value={values.destinoDesde} className="px-4 py-2 rounded-md w-full border"onChange={handleChange}>
                <option value="">Seleccione un destino</option>
                {destinosDesde.map((destino) => (
                  <option key={destino.campanha_destino_id} value={destino.campanha_destino_id}>
                    {destino.destino_nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-gray-700 font-bold mb-2">Destino Hasta</label>
              <select name="destinoHasta" value={values.destinoHasta} className="px-4 py-2 rounded-md w-full border"onChange={handleChange}>
                <option value="">Seleccione un destino</option>
                {destinosHasta.map((destino) => (
                  <option key={destino.campanha_destino_id} value={destino.campanha_destino_id}>
                    {destino.destino_nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-gray-700 font-bold mb-2">Precio</label>
              <input type="number" name="precio" placeholder="Precio" onChange={handleChange} value={values.precio} className={`px-4 py-2 rounded-md w-full border`} />
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <button type="submit" onClick={handleSubmit} disabled={isSubmitting}
              className={`flex items-center justify-center bg-gray-200 border border-gray-400 text-gray-700 px-6 py-2 rounded transition hover:bg-gray-300`}>
              <i className="fa fa-search text-xl"></i>
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default DashboardFilter;