import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"

export default function ConfirmarCuenta() {
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
    const [cargando, setCargando] = useState(true)
    const [alerta, setAlerta] = useState({})
    const { id } = useParams()
    
    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const url = `/veterinarios/confirmar/${id}`
                const { data } = await clienteAxios(url)
                setCuentaConfirmada(true)
                setAlerta({
                    msg: data.msg
                })
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
            setCargando(false)
        }
        confirmarCuenta()
    }, [])



    return (
        <div className="shadow-lg px-5 py-10 rounded-xl bg-white">
            <div>
                <h1 className='text-indigo-600 font-black text-6xl text-center md:mb-10'>Confirma tu cuenta y compieza a administrar tus <span className='text-black'>pacientes</span></h1>
            </div>

            <div>
                {!cargando && <Alerta
                    alerta={alerta}
                />}

                {
                    cuentaConfirmada &&
                    <Link className="text-lg block text-center my-5 text-gray-500 hover:text-indigo-700" to={"/"}>
                        ¿Ya tienes una cuenta? Inicia Sesión
                    </Link>
                }
            </div>
        </div>
    )
}
