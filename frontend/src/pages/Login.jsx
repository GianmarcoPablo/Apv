import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"
import { useAuth } from "../context/AuthProvider"

export default function Login() {

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [alerta, setAlerta] = useState({})
    const { setAuth } = useAuth()
    const { msg } = alerta

    const handleSubmit = async (e) => {
        e.preventDefault()
        if ([email, password].includes("")) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true,
            })
            return
        }

        try {
            const { data } = await clienteAxios.post("/veterinarios/login", { email, password })
            localStorage.setItem("token", data.token)
            setAuth(data)
            navigate("/admin")
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    return (
        <div className="shadow-lg px-5 py-10 rounded-xl bg-white">
            <div>
                <h1 className='text-indigo-600 font-black text-6xl text-center md:mb-10'>Inicia Sesión y Administra tus <span className='text-black'>pacientes</span></h1>
            </div>
            <div>
                {msg && (
                    <Alerta
                        alerta={alerta}
                    />
                )}
                <form onSubmit={handleSubmit}>
                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Email</label>
                        <input
                            type="text"
                            placeholder='Email de registro'
                            className='border w-full p-3 mt-3 bg-gray-50 rounded-md'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Contraseña</label>
                        <input
                            type="password"
                            placeholder='Tu Contraseña'
                            className='border w-full p-3 mt-3 bg-gray-50 rounded-md'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <input
                        type='submit'
                        value="Iniciar Sesión"
                        className='bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold hover:bg-indigo-900 mt-5 cursor-pointer transition-colors  px-10 '
                    />
                </form>
                <nav className="mt-8 lg:flex justify-between">
                    <Link
                        className="text-lg block text-center my-5 text-gray-500 hover:text-indigo-700"
                        to={"/registrar"}>
                        ¿No tienes una cuenta? Registrate
                    </Link>
                    <Link
                        className="text-lg block text-center my-5 text-gray-500 hover:text-indigo-700"
                        to={"/olvide-password"}>
                        Olvide mi contraseña
                    </Link>
                </nav>
            </div>
        </div>
    )
}
