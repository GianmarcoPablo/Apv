import { useState } from "react"
import Alerta from "./Alerta"
import { usePaciente } from "../context/PacienteProvider"

export default function Formulario() {

    const [nombre, setNombre] = useState("")
    const [propietario, setPropietario] = useState("")
    const [email, setEmail] = useState("")
    const [fecha, setFecha] = useState("")
    const [sintomas, setSintomas] = useState("")

    const [alerta, setAlerta] = useState({})
    const { guardarPaciente } = usePaciente()

    const handleSubmit = (e) => {
        e.preventDefault()
        if ([nombre, propietario, email, fecha, sintomas].includes("")) {
            setAlerta({ msg: "Todos los campos son obligatorios", error: true })
            return
        }
        setAlerta({})
        guardarPaciente({
            nombre,
            propietario,
            email,
            fecha,
            sintomas
        })
    }

    const { msg } = alerta

    return (
        <>
            <p className='text-xl mt-5 mb-10 text-center'>
                Añade tus pacientes y <span className='text-indigo-600 font-bold'>Administralos</span>
            </p>
            {msg && <Alerta alerta={alerta} />}
            <form
                onSubmit={handleSubmit}
                className='bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md'
            >
                <div className='mb-5'>
                    <label className='font-bold text-gray-700 uppercase' htmlFor='nombre'>Nombre Mascota</label>
                    <input
                        id="nombre"
                        type='text'
                        placeholder='Nombre de la Mascota'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className='mb-5'>
                    <label className='font-bold text-gray-700 uppercase' htmlFor='propietario'>Nombre Propietario</label>
                    <input
                        id="propietario"
                        type='text'
                        placeholder='Nombre del Propietario'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        value={propietario}
                        onChange={(e) => setPropietario(e.target.value)}
                    />
                </div>
                <div className='mb-5'>
                    <label className='font-bold text-gray-700 uppercase' htmlFor='email'>Email Propietario</label>
                    <input
                        id="email"
                        type='email'
                        placeholder='Email del Propietario'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='mb-5'>
                    <label className='font-bold text-gray-700 uppercase' htmlFor='fecha'>
                        Fecha Alta </label>
                    <input
                        id="fecha"
                        type='date'
                        value={fecha}
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        onChange={(e) => setFecha(e.target.value)}
                    />
                </div>
                <div className='mb-5'>
                    <label className='font-bold text-gray-700 uppercase' htmlFor='sintomas'>Sintomas</label>
                    <textarea
                        id='sintomas'
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                        value={sintomas}
                        onChange={(e) => setSintomas(e.target.value)}
                    />
                </div>
                <input
                    type='submit'
                    value={"Agregar Paciente"}
                    className='bg-indigo-700 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 transition-colors cursor-pointer'
                />
            </form>
        </>
    )
}
