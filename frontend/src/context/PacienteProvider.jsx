import { useContext, createContext, useState, useEffect } from "react"
import clienteAxios from "../config/axios"

const PacienteContext = createContext()

export const usePaciente = () => useContext(PacienteContext)


export const PacienteProvider = ({ children }) => {

    const [pacientes, setPacientes] = useState([])

    const guardarPaciente = async (paciente) => {
        try {
            const token = localStorage.getItem("token")
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post("/pacientes", paciente, config)
            const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data
            console.log(pacienteAlmacenado);
            setPacientes([pacienteAlmacenado, ...pacientes])
        } catch (error) {
            console.log(error.response.data.msg);
        }
    }


    return (
        <PacienteContext.Provider
            value={{
                pacientes,
                guardarPaciente
            }}
        >
            {children}
        </PacienteContext.Provider>
    )
}
