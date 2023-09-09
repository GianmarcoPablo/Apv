import { usePaciente } from "../context/PacienteProvider"
import Paciente from "./Paciente"
export default function ListadoPacientes() {

    const { pacientes } = usePaciente()
    return (
        <>
            {pacientes.length ? (
                <>
                    <h2 className="font-black text-3xl text-center">Listado pacientes</h2>
                    <p className="text-center text-xl mt-5 mb-10">
                        Administra tus <span className="text-indigo-600">Pacientes y Citas</span>
                    </p>

                    {pacientes.map(paciente => (
                        <Paciente
                            key={paciente._id}
                            paciente={paciente}
                        />
                    ))}
                </>
            ) : (
                <>
                    <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
                    <p className="text-center text-xl mt-5 mb-10">
                        Comienza agregando pacientes <span className="text-indigo-600">y aparecera en este lugar </span>
                    </p>
                </>
            )}
        </>
    )
}
