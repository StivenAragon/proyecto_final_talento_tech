import React, { useEffect, useState } from 'react';
import FormularioServicio from './FormularioServicio';
import 'font-awesome/css/font-awesome.min.css';
import { useTurismo } from "../../context/TurismoProvider";
import Swal from 'sweetalert2';

const ServiciosPage = () => {
    const { servicios, loadServicios, createServicio, updateServicio, deleteServicio } = useTurismo();

    useEffect(() => {
        loadServicios();
    }, []);

    const proveedorObject = localStorage.getItem('proveedor');
    const proveedor = proveedorObject ? JSON.parse(proveedorObject) : null;

    const [searchTerm, setSearchTerm] = useState('');
    
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const filteredServicios = servicios.filter(servicio =>
        servicio.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFormSubmit = async (values, actions) => {
        if (!values.nombre) {
            Swal.fire({
                icon: 'error',
                title: 'Campos obligatorios',
                text: 'El campo nombre es obligatorio.',
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
                response = await updateServicio(valuesSubmit);
            }else{
                response = await createServicio(valuesSubmit);
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
                loadServicios();
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

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estas seguro que quieres eliminar el servicio?',
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
                response= await deleteServicio({id:id, proveedor_id: proveedor ? proveedor.id : null });
    
                if (response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Operacion exitosa',
                        text: 'Se ha eliminado el servicio con exito.',
                    });
                    loadServicios();
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
                <FormularioServicio
                    onSubmit={handleFormSubmit}
                    onBack={handleBackButtonClick}
                    initialValues={editingItem ? { nombre: editingItem.nombre } : { nombre: '' }}
                />
            </div>
        );
    }

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">SERVICIOS</h1>
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
                            <th className="border border-gray-300 px-8 py-4">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredServicios.length > 0 ? (
                            filteredServicios.map((item, index) => (
                                <tr key={index+1} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {index+1}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {item.nombre}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 flex justify-center gap-2">
                                        <button onClick={() => handleEdit(item)} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 flex items-center gap-1 border border-gray-300">
                                            <i className="fa fa-edit"></i>
                                        </button>
                                        <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 flex items-center gap-1 border border-gray-300">
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="border border-gray-300 px-4 py-2 text-center text-gray-500">
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

export default ServiciosPage;