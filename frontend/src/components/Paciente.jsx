import React from 'react'

export default function Paciente({ paciente }) {
    const { email, fecha, nombre, propietario, _id, sintomas } = paciente

    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
        return new Intl.DateTimeFormat("es-MX", { dateStyle: "long" }).format(nuevaFecha)
    }

    return (
        <div className='mx-5 my-8 bg-white shadow-md px-5 py-10 rounded-md'>
            <p className='font-bold uppercase text-indigo-700'>Nombre: <span className='font-normal normal-case text-black'>{nombre}</span></p>
            <p className='font-bold uppercase text-indigo-700'>Propietario: <span className='font-normal normal-case text-black'>{propietario}</span></p>
            <p className='font-bold uppercase text-indigo-700'>Email de contacto: <span className='font-normal normal-case text-black'>{email}</span></p>
            <p className='font-bold uppercase text-indigo-700'>Fecha: <span className='font-normal normal-case text-black'>{formatearFecha(fecha)}</span></p>
            <p className='font-bold uppercase text-indigo-700'>Sintomas: <span className='font-normal normal-case text-black'>{sintomas}</span></p>
        </div>
    )
}
