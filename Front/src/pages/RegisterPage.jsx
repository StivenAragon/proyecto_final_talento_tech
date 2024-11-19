import React, { useState } from 'react';
import { Formik } from 'formik';
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { useTurismo } from "../context/TurismoProvider";
import 'font-awesome/css/font-awesome.min.css';

const RegisterPage = () => {
    const navigate = useNavigate();
    const { registerUser } = useTurismo();
    const [showPassword, setShowPassword] = useState(false);

    const validationRegistro = Yup.object().shape({
        nombre: Yup.string().required('El nombre es obligatorio.'),
        email: Yup.string()
            .email('Debe ser un correo electrónico válido.')
            .required('El correo es obligatorio.'),
        password: Yup.string()
            .required('La contraseña es obligatoria.')
            .max(12, 'La contraseña no puede tener más de 12 caracteres.')
            .matches(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula.')
            .matches(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula.')
            .matches(/\d/, 'La contraseña debe contener al menos un número.')
            .matches(/[@$!%*?&#]/, 'La contraseña debe contener al menos un carácter especial (@$!%*?&#).'),
    });

    const handleSubmit = async (values) => {
        if (!values.nombre || !values.email || !values.password) {
            Swal.fire({
                icon: 'error',
                title: 'Campos obligatorios',
                text: 'Todos los campos (nombre, correo, contraseña) son obligatorios.',
            });
            return 0;
        }

        try {
            let response;

            response = await registerUser(values);

            if (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Operacion exitosa',
                    text: 'Los datos se han guardado correctamente.',
                });
                return 1;
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al guardar los datos.',
                });
                return 0;
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error en el servidor. Inténtalo nuevamente.',
            });
            return 0;
        }
    }

    return (
        <div>
            <Formik
                initialValues={{ nombre: '', email: '', password: '' }}
                enableReinitialize={true}
                validationSchema={validationRegistro}
                onSubmit={async (values, actions) => {
                    const validar = await handleSubmit(values);
                    if (validar === 1) {
                        navigate("/");
                        actions.resetForm();
                    }
                }}
            >
                {({ handleChange, handleSubmit, values, errors, touched, isSubmitting }) => (
                    <form className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-10">
                        <h1 className="text-xl font-bold mb-2 uppercase text-center">Registro</h1>
                        <div className="mt-3 text-center">
                            <label className="block">Nombre Completo</label>
                            <input
                                type="text"
                                name="nombre"
                                placeholder="Nombre Completo"
                                onChange={handleChange}
                                value={values.nombre}
                                className={`px-2 py-1 rounded-sm w-full rounded-md ${errors.nombre && touched.nombre ? 'border-red-500' : ''}`}
                            />
                            {errors.nombre && touched.nombre && (
                                <p className="text-red-500 text-sm">{errors.nombre}</p>
                            )}
                        </div>
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
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Contraseña"
                                onChange={handleChange}
                                value={values.password}
                                className={`px-2 py-1 rounded-sm w-full rounded-md ${errors.password && touched.password ? 'border-red-500' : ''}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/4 text-gray-500"
                            >
                                <i className={`fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'} text-xl`}></i>
                            </button>
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
                                {isSubmitting ? "Enviando Solicitud" : "Registrar"}
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default RegisterPage;