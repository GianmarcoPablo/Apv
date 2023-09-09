import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import clienteAxios from "../config/axios"
import Alerta from "../components/Alerta"
import { Link } from "react-router-dom"

export default function NuevoPassword() {

    const [password, setPassword] = useState("")
    const [alerta, setAlerta] = useState({})
    const [tokenValido, setTokenValido] = useState(false)
    const [passwordModificado, setPasswordModificado] = useState(false)

    const { token } = useParams()

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/veterinarios/olvide-password/${token}`)
                setAlerta({
                    msg: "Coloca tu nuevo password"
                })
                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    msg: "Hubo un error en el enlace",
                    error: true
                })
            }
        }
        comprobarToken()
    }, [])

    const { msg } = alerta

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password.length < 6) {
            setAlerta({
                msg: "El password es muy corto",
                error: true
            })
            return
        }

        try {
            const url = `/veterinarios/olvide-password/${token}`
            const { data } = await clienteAxios.post(url, { password })
            setAlerta({
                msg: data.msg
            })
            setPasswordModificado(true)
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    return (
        <>
            <div className="shadow-lg px-5 py-10 rounded-xl bg-white">
                <h1 className='text-indigo-600 font-black text-6xl text-center md:mb-10'>Restrablece tú contraseña y no pierdas acceso a tus <span className='text-black'>pacientes</span></h1>
                {msg && <Alerta alerta={alerta} />}
                {tokenValido && (
                    <>
                        <form onSubmit={handleSubmit}>
                            <div className='my-5'>
                                <label className='uppercase text-gray-600 block text-xl font-bold'>Nueva Contraseña</label>
                                <input
                                    type="password"
                                    placeholder='Restablece tu contraseña'
                                    className='border w-full p-3 mt-3 bg-gray-50 rounded-md'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <input
                                type='submit'
                                value="Restablecer password"
                                className='bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold hover:bg-indigo-900 mt-5 cursor-pointer transition-colors  px-10 '
                            />
                        </form>
                        {passwordModificado && <Link className="text-lg block text-center my-5 text-gray-500 hover:text-indigo-700" to={"/"}>
                            Inicia Sesión
                        </Link>}
                    </>
                )}
            </div>
        </>
    )
}
