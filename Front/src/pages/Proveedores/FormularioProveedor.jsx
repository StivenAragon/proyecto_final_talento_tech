import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import 'font-awesome/css/font-awesome.min.css';

const FormularioProveedor = ({ onSubmit, onBack, initialValues, checkEmailUniqueness }) => {
    const isEditing = initialValues.email !== '';

    const validationRegistro = Yup.object().shape({
        razon_social: Yup.string().required('La razón social es obligatoria.'),
        nit: Yup.string()
            .matches(/^\d{9}$/, 'El NIT debe contener exactamente 9 números.')
            .required('El NIT es obligatorio.'),
        email: Yup.string()
            .email('Debe ser un correo válido.')
            .when([], {
                is: () => !isEditing,
                then: (schema) => schema
                    .required('El correo es obligatorio.')
                    .test('unique-email', 'El correo ya está registrado.',
                        async (value) => {
                            if (!value) return true;
                            try {
                                const response = await checkEmailUniqueness({ email: value });
                                return response.data.validate;
                            } catch (error) {
                                return false;
                            }
                        }
                    ),
                otherwise: (schema) => schema.notRequired(),
            }),
        telefono: Yup.string()
            .matches(/^\d{10}$/, 'El teléfono debe contener exactamente 10 números.')
            .required('El teléfono es obligatorio.'),
    });

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
                            {isEditing ? 'Actualizar Destino' : 'Registrar Destino'}
                        </h1>
                        <div className="mt-3 text-center">
                            <label className="block">Razón Social</label>
                            <input
                                type="text"
                                name="razon_social"
                                placeholder="Razón Social"
                                onChange={handleChange}
                                value={values.razon_social}
                                className={`px-2 py-1 rounded-sm w-full rounded-md ${
                                    errors.razon_social && touched.razon_social ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.razon_social && touched.razon_social && (
                                <p className="text-red-500 text-sm">{errors.razon_social}</p>
                            )}
                        </div>
                        <div className="mt-3 text-center">
                            <label className="block">NIT</label>
                            <input
                                type="text"
                                name="nit"
                                placeholder="NIT"
                                onChange={handleChange}
                                value={values.nit}
                                className={`px-2 py-1 rounded-sm w-full rounded-md ${
                                    errors.nit && touched.nit ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.nit && touched.nit && (
                                <p className="text-red-500 text-sm">{errors.nit}</p>
                            )}
                        </div>
                        <div className="mt-3 text-center">
                            <label className="block">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Correo electrónico"
                                onChange={handleChange}
                                value={values.email}
                                disabled={isEditing}
                                className={`px-2 py-1 rounded-sm w-full rounded-md ${
                                    errors.email && touched.email ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.email && touched.email && (
                                <p className="text-red-500 text-sm">{errors.email}</p>
                            )}
                        </div>
                        <div className="mt-3 text-center">
                            <label className="block">Teléfono</label>
                            <input
                                type="text"
                                name="telefono"
                                placeholder="Teléfono"
                                onChange={handleChange}
                                value={values.telefono}
                                className={`px-2 py-1 rounded-sm w-full rounded-md ${
                                    errors.telefono && touched.telefono ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.telefono && touched.telefono && (
                                <p className="text-red-500 text-sm">{errors.telefono}</p>
                            )}
                        </div>
                        <div className="flex gap-x-2 justify-center mt-6">
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-white 
                                    ${isEditing ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'}
                                `}
                            >
                                <i className="fa fa-check w-5 h-5"></i>
                                {isSubmitting
                                    ? isEditing
                                        ? 'Actualizando...'
                                        : 'Guardando...'
                                    : isEditing
                                    ? 'Actualizar'
                                    : 'Guardar'}
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

export default FormularioProveedor;