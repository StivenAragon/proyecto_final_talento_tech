import React, { useState } from 'react';
import { Formik } from 'formik';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { useTurismo } from "../context/TurismoProvider";
import 'font-awesome/css/font-awesome.min.css'; 

const LoginPage = () => {
    const navigate = useNavigate();
    const { loginUser } = useTurismo();

    const [showPassword, setShowPassword] = useState(false);

    const validationLogin = Yup.object().shape({
        email: Yup.string()
            .email('Debe ser un correo electrónico válido.')
            .required('El correo es obligatorio.'),
        password: Yup.string().required('La contraseña es obligatoria.'),
    });

    const handleSubmit = async (values) => {
        if (!values.email || !values.password) {
            Swal.fire({
                icon: 'error',
                title: 'Campos obligatorios',
                text: 'Todos los campos (correo, contraseña) son obligatorios.',
            });
            return 0;
        }

        try {
            let response;

            response = await loginUser(values);

            if (response) {
                return 1;
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Verifica los datos y intente nuevamente.',
                });
                return 0;
            }
        } catch (error) {
			console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error === '' ? 'Hubo un error en el servidor. Inténtalo nuevamente.' : error,
            });
            return 0;
        }
    };

    return (
        <div>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationLogin}
                onSubmit={async (values, actions) => {
                    const validar = await handleSubmit(values);
                    if (validar === 1) {
                        navigate("/dashboard");
                        actions.resetForm();
                    }
                }}
            >
                {({ handleChange, handleSubmit, values, errors, touched, isSubmitting }) => (
                    <form className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-10">
                        <h1 className="text-xl font-bold mb-2 uppercase text-center">Iniciar Sesión</h1>
                        <div className="mt-3 text-center">
                            <label className="block">Correo</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Correo"
                                onChange={handleChange}
                                value={values.email}
                                className={`px-2 py-1 rounded-sm w-full rounded-md ${errors.email && touched.email ? 'border-red-500' : ''}`}
                            />
                            {errors.email && touched.email && (
                                <p className="text-red-500 text-sm">{errors.email}</p>
                            )}
                        </div>
                        <div className="mt-3 text-center relative">
                            <label className="block">Contraseña</label>
                            <div className="relative w-full">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Contraseña"
                                    onChange={handleChange}
                                    value={values.password}
                                    className={`px-2 py-1 rounded-sm w-full rounded-md ${errors.password && touched.password ? 'border-red-500' : ''}`}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"  >
                                    <i className={`fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'} text-xl`}></i>
                                </button>
                            </div>
                            {errors.password && touched.password && (
                                <p className="text-red-500 text-sm">{errors.password}</p>
                            )}
                        </div>
                        <div className="flex justify-center mt-3">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className={`block px-2 py-1 rounded-md text-white bg-blue-500`}
                            >
                                {isSubmitting ? "Enviando Solicitud" : "Iniciar Sesión"}
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default LoginPage;