import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"
export default function Registrar() {

    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repetirPassword, setRepetirPassword] = useState("")
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()
        if ([nombre, email, password, repetirPassword].includes("")) {
            setAlerta({ msg: "Todos los campos son obligatorios", error: true })
            return
        }
        if (password !== repetirPassword) {
            setAlerta({ msg: "Contraseñas diferentes", error: true })
            return
        }

        if (password.length < 6) {
            setAlerta({ msg: "La contraseña debe tener +6 caracteres", error: true })
            return
        }
        setAlerta({})

        try {
            await clienteAxios.post(`/veterinarios`, {
                nombre,
                email,
                password
            })
            setAlerta({
                msg: "Creado Correctamente revisa tu email",
                error: false
            })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg ,
                error: true
            });
        }
    }

    const { msg } = alerta

    return (
        <div className="shadow-lg px-5 py-10 rounded-xl bg-white">
            <div>
                <h1 className='text-indigo-600 font-black text-6xl text-center md:mb-10'>Crea tú cuenta y Administra tus <span className='text-black'>pacientes</span></h1>
            </div>

            <div>
                {msg && <Alerta alerta={alerta} />}
                <form onSubmit={handleSubmit}>
                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Nombre</label>
                        <input
                            type="text"
                            placeholder='Tú nombre'
                            className='border w-full p-3 mt-3 bg-gray-50 rounded-md'
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Email</label>
                        <input
                            type="email"
                            placeholder='Tu Email'
                            className='border w-full p-3 mt-3 bg-gray-50 rounded-md'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Contraseña</label>
                        <input
                            type="password"
                            placeholder='Tu password'
                            className='border w-full p-3 mt-3 bg-gray-50 rounded-md'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Repite Contraseña</label>
                        <input
                            type="password"
                            placeholder='Repite tu contraseña'
                            className='border w-full p-3 mt-3 bg-gray-50 rounded-md'
                            value={repetirPassword}
                            onChange={(e) => setRepetirPassword(e.target.value)}
                        />
                    </div>


                    <input
                        type='submit'
                        value="Crear cuenta"
                        className='bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold hover:bg-indigo-900 mt-5 cursor-pointer transition-colors  px-10 '
                    />
                </form>
                <nav className="mt-8 lg:flex justify-between">
                    <Link className="text-lg block text-center my-5 text-gray-500 hover:text-indigo-700" to={"/"}>
                        ¿Ya tienes una cuenta? Inicia Sesión
                    </Link>
                    <Link className="text-lg block text-center my-5 text-gray-500 hover:text-indigo-700" to={"/olvide-password"}>
                        Olvide mi contraseña
                    </Link>
                </nav>
            </div>
        </div>
    )
}
