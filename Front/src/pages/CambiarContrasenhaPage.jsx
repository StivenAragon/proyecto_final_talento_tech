import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useTurismo } from "../context/TurismoProvider";
import 'font-awesome/css/font-awesome.min.css';

const CambiarContrasenhaPage = () => {
    const { cambiarContrasenha } = useTurismo();

    const userObject = localStorage.getItem('user');
    const user = userObject ? JSON.parse(userObject) : null;

    const [showPassword, setShowPassword] = useState({
        actual: false,
        nuevo: false,
        confirmar: false,
    });

    const validationSchema = Yup.object().shape({
        contrasenha_actual: Yup.string().required('La contraseña actual es obligatoria.'),
        contrasenha_nueva: Yup.string()
            .required('La nueva contraseña es obligatoria.')
            .max(12, 'La contraseña no puede tener más de 12 caracteres.')
            .matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula.')
            .matches(/[a-z]/, 'Debe contener al menos una letra minúscula.')
            .matches(/\d/, 'Debe contener al menos un número.')
            .matches(/[@$!%*?&#]/, 'Debe contener al menos un carácter especial (@$!%*?&#).'),
        confirmar_contrasenha: Yup.string()
            .required('Confirmar la contraseña es obligatorio.')
            .oneOf([Yup.ref('contrasenha_nueva')], 'Las contraseñas no coinciden.'),
    });

    const handleSubmit = async (values, actions) => {
        try {
            const valuesSubmit = {
                ...values,
                email: user? user.email : null,
                rol: user ? user.rol : null, 
            };

            let response;

            response = await cambiarContrasenha(valuesSubmit);

            if (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Operacion exitosa',
                    text: 'La contraseña se cambió correctamente.',
                });

                actions.resetForm();
                return 1;
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al cambiar la contraseña. Inténtalo nuevamente.',
                });
                return 0;
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error ? error : 'Hubo un error al intentar cambiar la contraseña. Inténtalo de nuevo.',
            });
        }
    };

    return (
        <div>
            <Formik
                initialValues={{ contrasenha_actual: '', contrasenha_nueva: '', confirmar_contrasenha: '', }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleSubmit, values, errors, touched, isSubmitting }) => (
                    <form className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-10" onSubmit={handleSubmit} >
                        <h1 className="text-xl font-bold mb-2 uppercase text-center">Cambiar Contraseña</h1>
                        <div className="mt-3 text-center relative">
                            <label className="block">Contraseña Actual</label>
                            <div className="relative w-full">
                                <input
                                    type={showPassword.actual ? "text" : "password"}
                                    name="contrasenha_actual"
                                    placeholder="Contraseña Actual"
                                    onChange={handleChange}
                                    value={values.contrasenha_actual}
                                    className={`px-2 py-1 rounded-sm w-full border ${
                                        errors.contrasenha_actual && touched.contrasenha_actual ? 'border-red-500' : ''
                                    }`}
                                />
                                <button type="button" onClick={() => setShowPassword((prev) => ({ ...prev, actual: !prev.actual })) } className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" >
                                    <i className={`fa ${showPassword.actual ? 'fa-eye' : 'fa-eye-slash'} text-xl`}></i>
                                </button>
                            </div>
                            {errors.contrasenha_actual && touched.contrasenha_actual && (
                                <p className="text-red-500 text-sm">{errors.contrasenha_actual}</p>
                            )}
                        </div>
                        <div className="mt-3 text-center relative">
                            <label className="block">Nueva Contraseña</label>
                            <div className="relative w-full">
                                <input
                                    type={showPassword.nuevo ? "text" : "password"}
                                    name="contrasenha_nueva"
                                    placeholder="Nueva Contraseña"
                                    onChange={handleChange}
                                    value={values.contrasenha_nueva}
                                    className={`px-2 py-1 rounded-sm w-full border ${
                                        errors.contrasenha_nueva && touched.contrasenha_nueva ? 'border-red-500' : ''
                                    }`}
                                />
                                <button type="button" onClick={() => setShowPassword((prev) => ({ ...prev, nuevo: !prev.nuevo })) } className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                                    <i className={`fa ${showPassword.nuevo ? 'fa-eye' : 'fa-eye-slash'} text-xl`}></i>
                                </button>
                            </div>
                            {errors.contrasenha_nueva && touched.contrasenha_nueva && (
                                <p className="text-red-500 text-sm">{errors.contrasenha_nueva}</p>
                            )}
                        </div>
                        <div className="mt-3 text-center relative">
                            <label className="block">Confirmar Contraseña</label>
                            <div className="relative w-full">
                                <input
                                    type={showPassword.confirmar ? "text" : "password"}
                                    name="confirmar_contrasenha"
                                    placeholder="Confirmar Contraseña"
                                    onChange={handleChange}
                                    value={values.confirmar_contrasenha}
                                    className={`px-2 py-1 rounded-sm w-full border ${
                                        errors.confirmar_contrasenha && touched.confirmar_contrasenha ? 'border-red-500' : ''
                                    }`}
                                />
                                <button type="button" onClick={() => setShowPassword((prev) => ({ ...prev, confirmar: !prev.confirmar })) } className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" >
                                    <i className={`fa ${showPassword.confirmar ? 'fa-eye' : 'fa-eye-slash'} text-xl`}></i>
                                </button>
                            </div>
                            {errors.confirmar_contrasenha && touched.confirmar_contrasenha && (
                                <p className="text-red-500 text-sm">{errors.confirmar_contrasenha}</p>
                            )}
                        </div>
                        <div className="flex justify-center mt-3">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className={`block px-2 py-1 rounded-md text-white bg-green-500`}
                            >
                                {isSubmitting ? 'Cambiando...' : 'Cambiar Contraseña'}
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default CambiarContrasenhaPage;