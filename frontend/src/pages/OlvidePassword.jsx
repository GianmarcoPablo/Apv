import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"

export default function OlvidePassword() {

    const [email, setEmail] = useState("")
    const [alerta, setAlerta] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (email === "" || email.length < 6) {
            setAlerta({ msg: "El email es obligatorio", error: true })
            return
        }

        try {
            const { data } = await clienteAxios.post("/veterinarios/olvide-password", { email })
            setAlerta({ msg: data.msg })
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const { msg } = alerta

    return (
        <div className="shadow-lg px-5 py-10 rounded-xl bg-white">
            <div>
                <h1 className='text-indigo-600 font-black text-6xl text-center md:mb-10'>Recupera Acceso y no pierdas tus <span className='text-black'>pacientes</span></h1>
            </div>
            <div>
                {msg && <Alerta alerta={alerta} />}
                <form
                    onSubmit={handleSubmit}
                >
                    <div className='my-5'>
                        <label className='uppercase text-gray-600 block text-xl font-bold'>Email</label>
                        <input
                            type="text"
                            placeholder='Envia tu email'
                            className='border w-full p-3 mt-3 bg-gray-50 rounded-md'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <input
                        type='submit'
                        value="Enviar Intrucciones"
                        className='bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold hover:bg-indigo-900 mt-5 cursor-pointer transition-colors  px-10 '
                    />
                </form>
                <nav className="mt-8 lg:flex justify-between">
                    <Link className="text-lg block text-center my-5 text-gray-500 hover:text-indigo-700" to={"/registrar"}>
                        ¿Ya tienes una cuenta? Inicia Sesión
                    </Link>
                    <Link className="text-lg block text-center my-5 text-gray-500 hover:text-indigo-700" to={"/registrar"}>
                        ¿No tienes una cuenta? Registrate
                    </Link>
                </nav>
            </div>
        </div>
    )
}
