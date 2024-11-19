import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import 'font-awesome/css/font-awesome.min.css';

const FormularioServicio = ({ onSubmit, onBack, initialValues }) => {
    const validationRegistro = Yup.object().shape({
        nombre: Yup.string().required('El nombre es obligatorio.'),
    });

    const isEditing = initialValues.nombre !== '';

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationRegistro}
                onSubmit={onSubmit}
            >
                {({ handleChange, handleSubmit, values, errors, touched, isSubmitting }) => (
                    <form className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-10">
                        <h1 className="text-xl font-bold mb-2 uppercase text-center">
                            {isEditing ? 'Actualizar Servicio' : 'Registrar Servicio'}
                        </h1>
                        <div className="mt-3 text-center">
                            <label className="block">Nombre</label>
                            <input
                                type="text"
                                name="nombre"
                                placeholder="Nombre"
                                onChange={handleChange}
                                value={values.nombre}
                                className={`px-2 py-1 rounded-sm w-full rounded-md ${
                                    errors.nombre && touched.nombre ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.nombre && touched.nombre && (
                                <p className="text-red-500 text-sm">{errors.nombre}</p>
                            )}
                        </div>

                        <div className="flex gap-x-2 justify-center mt-6">
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-white 
                                    ${ isEditing ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'}
                                `}
                            >
                                <i className="fa fa-check w-5 h-5"></i>
                                { isSubmitting ? isEditing ? "Actualizando..." : "Guardando..." : isEditing ? "Actualizar" : "Guardar" }
                            </button>

                            <button
                                type="button"
                                onClick={onBack}
                                className="flex items-center space-x-2 px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600"
                            >
                                <i className="fa fa-arrow-left w-5 h-5"></i>
                                Cancelar
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default FormularioServicio;