import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function Header() {

    const { cerrarSession } = useAuth()

    return (
        <header className="py-10 bg-indigo-700">
            <div className="container mx-auto flex flex-col justify-between items-center md:flex-row">
                <h1 className="font-bold text-indigo-100 text-xl uppercase">Administrardor de <span className="text-white font-black">Pacientes</span> </h1>
                <nav className="flex flex-col md:flex-row gap-4 py-4 align-middle items-center">
                    <Link to="/admin" className="text-white text-xl uppercase font-bold">Pacientes</Link>
                    <Link to="/admin" className="text-white text-xl uppercase font-bold">Pefil</Link>

                    <button
                        type="button"
                        className="bg-red-600 text-white px-4 uppercase font-bold flex justify-center align-middle items-center py-2 hover:bg-red-800 transition-colors"
                        onClick={cerrarSession}
                    >
                        Cerrar Sesión
                    </button>
                </nav>
            </div>
        </header>
    )
}
