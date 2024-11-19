import { useContacto } from "../context/TurismoProvider.jsx"
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2';

const ContactoCard = ({ task }) => {

    const { deleteContacto } = useContacto()
    const navigate = useNavigate();
    
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estas seguro?',
            text: "¡No psodras revertir esta accion!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        });
    
        if (result.isConfirmed) {
            await deleteContacto(id);
    
            Swal.fire({
                icon: 'success',
                title: 'Operacion exitosa',
                text: 'Se ha eliminado el registro con exito.',
            });
        }
    };
    

    return (
        <div className="bg-zinc-700 text-white rounded-md p-4 mt-3 max-w-full overflow-hidden">
        <p className="text-base break-words">Nombre: {task.nombre}</p>
        <p className="text-base break-words">Telefono: {task.telefono}</p>
        <p className="text-base break-words">Correo: {task.email}</p>
        <div className="text-center mt-2">
            <button className="bg-blue-500 px-2 py-1 rounded-md text-white mr-2" onClick={() => navigate(`/edit/${task.id}`)}> 
                Editar 
            </button>
            <button className="bg-red-500 px-2 py-1 rounded-md text-white mr-2" onClick={() => handleDelete(task.id)} >
                Eliminar
            </button>
        </div>
    </div>
    )
}

export default ContactoCard
