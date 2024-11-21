import React, { useEffect, useState } from 'react';
import FormularioCampanha from './FormularioCampanha';
import 'font-awesome/css/font-awesome.min.css';
import { useTurismo } from "../../context/TurismoProvider";
import Swal from 'sweetalert2';

const CampanhasPage = () => {
    const { campanhas, loadCampanhas, createCampanha, updateCampanha, deleteCampanha, getDestinosProveedores, getServiciosProveedores } = useTurismo();
    
    const proveedorObject = localStorage.getItem('proveedor');
    const proveedor = proveedorObject ? JSON.parse(proveedorObject) : null;
    
    const [arrayDestinos, setArrayDestinos] = useState([]);
    const [arrayServicios, setArrayServicios] = useState([]);
    
    const fetchDestinosYServicios = async () => {
        if (proveedor) {
            const servicios = await getServiciosProveedores({proveedor_id: proveedor.id});
            const destinos = await getDestinosProveedores({proveedor_id: proveedor.id});
            setArrayServicios(servicios.data);
            setArrayDestinos(destinos.data);
        }
    };

    useEffect(() => {
        loadCampanhas();
        fetchDestinosYServicios();
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const initialFormValues = editingItem
                                ? { nombre: editingItem.nombre, tiempo_salida: editingItem.hora_salida, fecha_inicio: editingItem.fecha_inicio, fecha_fin: editingItem.fecha_fin, precio: editingItem.precio, observacion: editingItem.observacion, destino_desde_id: editingItem.destino_desde_id, destino_desde: editingItem.destino_desde_camp_dest, destino_hasta_id: editingItem.destino_hasta_id, destino_hasta: editingItem.destino_hasta_camp_dest, array_proveedor_id: []}
                                : { nombre: '', tiempo_salida: '', fecha_inicio: '', fecha_fin: '', precio: '', observacion: '', destino_desde_id: '', destino_desde: '', destino_hasta_id: '', destino_hasta: '', array_proveedor_id: []};

    const filteredCampanhas = campanhas.filter(campanha =>
        campanha.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFormSubmit = async (values, actions) => {
        if (!values.nombre, !values.tiempo_salida, !values.fecha_inicio, !values.fecha_fin, !values.precio, !values.observacion, !values.destino_desde, !values.destino_hasta){
            Swal.fire({
                icon: 'error',
                title: 'Campos obligatorios',
                text: 'Todos los campos (nombre, tiempo de salida, fecha de inicio, fecha de fin, precio, observacion, destino desde, destino hasta) son obligatorios',
            });
            return;
        }

        try {
            const valuesSubmit = {
                ...values,
                id: editingItem? editingItem.id : null,
                proveedor_id: proveedor ? proveedor.id : null, 
            };

            let response;
            if(editingItem){
                response = await updateCampanha(valuesSubmit);
            }else{
                response = await createCampanha(valuesSubmit);
            }

            if (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Operacion exitosa',
                    text: editingItem ? 'Se ha actualizado correctamente.' : 'Se ha registrado correctamente.',
                });

                setShowForm(false);
                setEditingItem(null);
                actions.resetForm();
                loadCampanhas();
                fetchDestinosYServicios();
                return 1;
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: editingItem ? 'Hubo un problema al actualizar los datos. Inténtalo nuevamente.' : 'Hubo un problema al guardar los datos. Inténtalo nuevamente.',
                });
                return 0;
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error ? error : 'Hubo un error en el servidor. Inténtalo mas tarde.',
            });
            return 0;
        }
    };

    const handleBackButtonClick = () => {
        setShowForm(false);
        setEditingItem(null);
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setShowForm(true);
    };

    const handleDelete = async (id, destino_desde, destino_hasta) => {
        const result = await Swal.fire({
            title: '¿Estas seguro que quieres eliminar la campaña?',
            text: "¡No psodras revertir esta accion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        });

        
        if (result.isConfirmed) {
            try {       
                let response;
                response = await deleteCampanha({id:id, destino_desde: destino_desde, destino_hasta: destino_hasta, proveedor_id: proveedor ? proveedor.id : null });
    
                if (response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Operacion exitosa',
                        text: 'Se ha eliminado la campaña con exito.',
                    });
                    loadCampanhas();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un problema al eliminar los datos. Inténtalo nuevamente.'
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error ? error : 'Hubo un error en el servidor. Inténtalo mas tarde.',
                });
                return 0;
            }
        }
    };

    if (showForm) {
         return (
            <div>
                <FormularioCampanha
                    onSubmit={handleFormSubmit}
                    onBack={handleBackButtonClick}
                    initialValues={initialFormValues}
                    servicios={arrayServicios}
                    destinos={arrayDestinos}   
                />
            </div>
        );
    }

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">CAMPAÑAS</h1>
            <div className="flex justify-between items-center mb-6 max-w-4xl mx-auto">
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-2/3 px-6 py-3 text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition text-lg"
                >
                    <i className="fa fa-plus w-5 h-5"></i>
                    Agregar
                </button>
            </div>
            <div className="max-w-7xl mx-auto overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 text-lg">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-8 py-4">#</th>
                            <th className="border border-gray-300 px-8 py-4">Nombre</th>
                            <th className="border border-gray-300 px-8 py-4">Hora Salida</th>
                            <th className="border border-gray-300 px-8 py-4">Fecha Inicio</th>
                            <th className="border border-gray-300 px-8 py-4">Fecha Fin</th>
                            <th className="border border-gray-300 px-8 py-4">Precio</th>
                            <th className="border border-gray-300 px-8 py-4">Destino Desde</th>
                            <th className="border border-gray-300 px-8 py-4">Destino Hasta</th>
                            <th className="border border-gray-300 px-8 py-4">Observación</th>
                            <th className="border border-gray-300 px-8 py-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCampanhas.length > 0 ? (
                            filteredCampanhas.map((item, index) => (
                                <tr key={index + 1} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-8 py-4 text-center">
                                        {index + 1}
                                    </td>
                                    <td className="border border-gray-300 px-8 py-4">
                                        {item.nombre}
                                    </td>
                                    <td className="border border-gray-300 px-8 py-4">
                                        {item.tiempo_salida}
                                    </td>
                                    <td className="border border-gray-300 px-8 py-4">
                                        {item.fecha_inicio}
                                    </td>
                                    <td className="border border-gray-300 px-8 py-4">
                                        {item.fecha_fin}
                                    </td>
                                    <td className="border border-gray-300 px-8 py-4">
                                        {item.precio_format}
                                    </td>
                                    <td className="border border-gray-300 px-8 py-4">
                                        {item.destino_desde}
                                    </td>
                                    <td className="border border-gray-300 px-8 py-4">
                                        {item.destino_hasta}
                                    </td>
                                    <td className="border border-gray-300 px-8 py-4">
                                        {item.observacion}
                                    </td>
                                    <td className="border border-gray-300 px-8 py-4 flex justify-center gap-4">
                                        <button onClick={() => handleEdit(item)} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 flex items-center gap-1" >
                                            <i className="fa fa-edit"></i>
                                        </button>
                                        <button onClick={() => handleDelete(item.id, item.destino_desde_id, item.destino_hasta_id)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 flex items-center gap-1" >
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" className="border border-gray-300 px-8 py-4 text-center text-gray-500">
                                    No se encontraron resultados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CampanhasPage;