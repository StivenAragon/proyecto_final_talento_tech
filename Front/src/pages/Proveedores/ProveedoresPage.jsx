import React, { useEffect, useState } from 'react';
import FormularioProveedor from './FormularioProveedor';
import 'font-awesome/css/font-awesome.min.css';
import { useTurismo } from "../../context/TurismoProvider";
import Swal from 'sweetalert2';

const ProveedoresPage = () => {
    const { proveedores, loadProveedores, createProveedor, updateProveedor, deleteProveedor, checkEmailsUnique } = useTurismo();

    useEffect(() => {
        loadProveedores();
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFormSubmit = async (values, actions) => {
        if (!values.razon_social || !values.nit || !values.email || !values.telefono) {
            Swal.fire({
                icon: 'error',
                title: 'Campos obligatorios',
                text: 'El campo razon_social, nit, email, telefono son obligatorios.',
            });
            return;
        }

        try {
            let response;
            if(editingItem){
                const updatedValues = { ...values, id: editingItem.id, };
                response = await updateProveedor(updatedValues);
            }else{
                response = await createProveedor(values);
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
                loadProveedores();
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
                text: 'Hubo un error en el servidor. Inténtalo mas tarde.',
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
            title: '¿Estas seguro que quieres eliminar el proveedor?',
            text: "¡No psodras revertir esta accion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        });

        
        if (result.isConfirmed) {
            await deleteProveedor({id:id});
    
            Swal.fire({
                icon: 'success',
                title: 'Operacion exitosa',
                text: 'Se ha eliminado el destino con exito.',
            });
            loadProveedores();
        }
    };

    if (showForm) {
        return (
            <div>
                <FormularioProveedor
                    onSubmit={handleFormSubmit}
                    onBack={handleBackButtonClick}
                    initialValues={ editingItem ? 
                                        { razon_social: editingItem.razon_social, nit: editingItem.nit, email: editingItem.email, telefono: editingItem.telefono } : 
                                        { razon_social: '', nit: '', email: '', telefono: '', }
                                  }
                    checkEmailUniqueness={checkEmailsUnique}
                />
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4 text-center">PROVEEDORES</h1>
            <div className="flex justify-between items-center mb-4 max-w-2xl mx-auto">
                <input
                    type="text"
                    placeholder="Buscar por el nit..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-3/4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                >
                    <i className="fa fa-plus w-5 h-5"></i>
                    Agregar
                </button>
            </div>
            <div className="max-w-2xl mx-auto overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">#</th>
                            <th className="border border-gray-300 px-4 py-2">Razon Social</th>
                            <th className="border border-gray-300 px-4 py-2">Nit</th>
                            <th className="border border-gray-300 px-4 py-2">Correo</th>
                            <th className="border border-gray-300 px-4 py-2">Telefono</th>
                            <th className="border border-gray-300 px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proveedores.length > 0 ? (
                            proveedores.map((item, index) => (
                                <tr key={index+1} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        {index+1}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {item.razon_social}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {item.nit}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {item.email}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {item.telefono}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 flex justify-center gap-2">
                                        <button onClick={() => handleEdit(item)} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 flex items-center gap-1">
                                            <i className="fa fa-edit"></i>
                                        </button>
                                        <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 flex items-center gap-1" >
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="border border-gray-300 px-4 py-2 text-center text-gray-500">
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

export default ProveedoresPage;