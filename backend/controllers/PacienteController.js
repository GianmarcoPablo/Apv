import Paciente from "../models/Paciente.js"

const agregarPaciente = async (req, res) => {
    const paciente = new Paciente(req.body)
    paciente.veterinario = req.veterinario._id
    try {
        const pacienteAlmacenado = await paciente.save()
        res.json(pacienteAlmacenado)
    } catch (error) {
        return res.status(400).json({ msg: "Error" })
    }
}

const obtenerPacientes = async (req, res) => {
    const pacientes = await Paciente.find().where("veterinario").equals(req.veterinario)
    res.json(pacientes)
}

const obtenerPaciente = async (req, res) => {
    const { id } = req.params
    const paciente = await Paciente.findById(id)
    if (!paciente) {
        return res.status(400).json({ msg: "No encontrado" })
    }
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.json({ msg: "Accion no valida" })
    }

    res.json(paciente)

}
const actulizarPaciente = async (req, res) => {
    const { id } = req.params
    const { nombre, propietario, sintomas, email, fecha } = req.body
    const paciente = await Paciente.findById(id)
    if (!paciente) {
        return res.status(400).json({ msg: "No encontrado" })
    }
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.json({ msg: "Accion no valida" })
    }
    //acualizar paciente
    paciente.nombre = nombre || paciente.nombre
    paciente.propietario = propietario || paciente.propietario
    paciente.email = email || paciente.email
    paciente.fecha = fecha || paciente.fecha
    paciente.sintomas = sintomas || paciente.sintomas

    try {
        const pacienteActualizado = await paciente.save()
        return res.json(pacienteActualizado)
    } catch (error) {
        console.log(error);
    }

}
const eliminarPaciente = async (req, res) => {
    const { id } = req.params
    const paciente = await Paciente.findById(id)
    if (!paciente) {
        return res.status(400).json({ msg: "No encontrado" })
    }
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
        return res.json({ msg: "Accion no valida" })
    }
    try {
        await paciente.deleteOne()
        res.json({msg: "Paciente eliminado"})
    } catch (error) {
        console.log(error);
    }
}

export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actulizarPaciente,
    eliminarPaciente
}