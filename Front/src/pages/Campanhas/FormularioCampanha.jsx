import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import 'font-awesome/css/font-awesome.min.css';
import Select from 'react-select';

const FormularioCampanha = ({ onSubmit, onBack, initialValues, servicios, destinos }) => {
    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required('El nombre es obligatorio.'),
        tiempo_salida: Yup.string().required('El tiempo de salida es obligatorio.'),
        fecha_inicio: Yup.date().required('La fecha de inicio es obligatoria.'),
        fecha_fin: Yup.date().required('La fecha de fin es obligatoria.')
            .test('is-greater', 'La fecha final no puede ser menor que la fecha inicial.',
                function (value) {
                    const { fecha_inicio } = this.parent; 
                    return value >= fecha_inicio;
                }
            ),
        precio: Yup.number().required('El precio es obligatorio.').positive('Debe ser un valor positivo.'),
        observacion: Yup.string().required('La observacion es obligatoria.').max(200, 'La observación no puede tener más de 200 caracteres.'),
        destino_desde: Yup.string().required('Seleccione un destino inicial'),
        destino_hasta: Yup.string().required('Seleccione un destino final')
            .notOneOf(
                [Yup.ref('destino_desde')],
                'El destino hasta no puede ser igual al destino desde'
            ),
        array_servicios: Yup.array().required('Seleccione al menos un servicio').min(1, 'Seleccione al menos un servicio'),
    });

    const isEditing = initialValues.nombre !== '';

    const opciones = servicios.map((servicio) => ({
        value: servicio.id,
        label: servicio.nombre,
    }));

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {({ handleChange, handleSubmit, values, errors, touched, isSubmitting, setFieldValue }) => (
                    <form className="bg-slate-300 max-w-lg rounded-md p-6 mx-auto mt-10">
                        <h1 className="text-xl font-bold mb-4 uppercase text-center">
                            {isEditing ? 'Actualizar Campaña' : 'Registrar Campaña'}
                        </h1>
                        <div className="mb-4">
                            <label className="block font-semibold">Nombre</label>
                            <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} value={values.nombre}
                                className={`px-4 py-2 rounded-md w-full border ${
                                    errors.nombre && touched.nombre ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.nombre && touched.nombre && (
                                <p className="text-red-500 text-sm">{errors.nombre}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold">Tiempo de salida</label>
                            <input type="time" name="tiempo_salida" onChange={handleChange} value={values.tiempo_salida}
                                className={`px-4 py-2 rounded-md w-full border ${
                                    errors.tiempo_salida && touched.tiempo_salida ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.tiempo_salida && touched.tiempo_salida && (
                                <p className="text-red-500 text-sm">{errors.tiempo_salida}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold">Fecha de inicio</label>
                            <input type="date" name="fecha_inicio" onChange={handleChange} value={values.fecha_inicio}
                                className={`px-4 py-2 rounded-md w-full border ${
                                    errors.fecha_inicio && touched.fecha_inicio ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.fecha_inicio && touched.fecha_inicio && (
                                <p className="text-red-500 text-sm">{errors.fecha_inicio}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold">Fecha de fin</label>
                            <input type="date" name="fecha_fin" onChange={handleChange} value={values.fecha_fin}
                                className={`px-4 py-2 rounded-md w-full border ${
                                    errors.fecha_fin && touched.fecha_fin ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.fecha_fin && touched.fecha_fin && (
                                <p className="text-red-500 text-sm">{errors.fecha_fin}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold">Precio</label>
                            <input type="number" name="precio" placeholder="Precio" onChange={handleChange} value={values.precio}
                                className={`px-4 py-2 rounded-md w-full border ${
                                    errors.precio && touched.precio ? 'border-red-500' : ''
                                }`}
                            />
                            {errors.precio && touched.precio && (
                                <p className="text-red-500 text-sm">{errors.precio}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold">Observación</label>
                            <textarea name="observacion" placeholder="Observaciones" onChange={handleChange} value={values.observacion} 
                                className={`px-4 py-2 rounded-md w-full border ${
                                    errors.precio && touched.precio ? 'border-red-500' : ''
                                }`}></textarea>
                            {errors.observacion && touched.observacion && (
                                <p className="text-red-500 text-sm">{errors.observacion}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold">Destino Desde</label>
                            <select name="destino_desde" onChange={handleChange} value={values.destino_desde}
                                className={`px-4 py-2 rounded-md w-full border ${
                                    errors.destino_desde && touched.destino_desde ? 'border-red-500' : ''
                                }`}
                            >
                                <option value="">Seleccione un destino</option>
                                {destinos.map((destino) => (
                                    <option key={destino.id} value={destino.id}>
                                        {destino.nombre}
                                    </option>
                                ))}
                            </select>
                            {errors.destino_desde && touched.destino_desde && (
                                <p className="text-red-500 text-sm">{errors.destino_desde}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold">Destino Hasta</label>
                            <select name="destino_hasta" onChange={handleChange} value={values.destino_hasta}
                                className={`px-4 py-2 rounded-md w-full border ${
                                    errors.destino_hasta && touched.destino_hasta ? 'border-red-500' : ''
                                }`}
                            >
                                <option value="">Seleccione un destino</option>
                                {destinos.map((destino) => (
                                    <option key={destino.id} value={destino.id}>
                                        {destino.nombre}
                                    </option>
                                ))}
                            </select>
                            {errors.destino_hasta && touched.destino_hasta && (
                                <p className="text-red-500 text-sm">{errors.destino_hasta}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block font-semibold">Servicios</label>
                            <Select
                                options={opciones}
                                isMulti
                                value={opciones.filter((opcion) => values.array_servicios.includes(opcion.value))}
                                onChange={(selectedOptions) => setFieldValue('array_servicios', selectedOptions.map((opcion) => opcion.value))}
                                placeholder="Seleccione opciones"
                            />
                            {errors.array_servicios && touched.array_servicios && (
                                <p className="text-red-500 text-sm">{errors.array_servicios}</p>
                            )}
                        </div>
                        <div className="flex gap-x-2 justify-center mt-6">
                            <button type="submit" onClick={handleSubmit} disabled={isSubmitting}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-white 
                                    ${isEditing ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'}
                                `}
                            >
                                <i className="fa fa-check w-5 h-5"></i>
                                {isSubmitting
                                    ? isEditing ? 'Actualizando...' : 'Guardando...'
                                    : isEditing ? 'Actualizar' : 'Guardar'}
                            </button>

                            <button type="button" onClick={onBack} className="flex items-center space-x-2 px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600" >
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

export default FormularioCampanha;