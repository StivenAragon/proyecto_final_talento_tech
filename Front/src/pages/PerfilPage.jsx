import React from 'react';

const PerfilPage = () => {
    const userObject = localStorage.getItem('user');
    const user = userObject ? JSON.parse(userObject) : null;

    return (
        <div>
            <form className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-10">
                <h1 className="text-xl font-bold mb-2 uppercase text-center">Perfil</h1>
                <div className="mt-3 text-center">
                    <label className="block">Nombre Completo</label>
                    <input
                        type="text"
                        name="nombre"
                        value={user?.nombre || ''}
                        readOnly
                        className={`px-2 py-1 rounded-sm w-full rounded-md`}
                    />
                </div>
                <div className="mt-3 text-center">
                    <label className="block">Correo</label>
                    <input
                        type="text"
                        name="email"
                        value={user?.email || ''}
                        readOnly
                        className={`px-2 py-1 rounded-sm w-full rounded-md`}
                    />
                </div>
                <div className="mt-3 text-center">
                    <label className="block">Rol</label>
                    <input
                        type="text"
                        name="rol"
                        value={user?.rol_name || ''}
                        readOnly
                        className={`px-2 py-1 rounded-sm w-full rounded-md`}
                    />
                </div>
            </form>
        </div>
    );
};

export default PerfilPage;