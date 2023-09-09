import Veterinario from "../models/Veterinario.js"
import generarJWT from "../helpers/generarJWT.js"
import generarId from "../helpers/generarId.js"
import emailRegistro from "../helpers/emailRegistro.js"
import emailOlvidePassword from "../helpers/emailOlvidePassword.js"
const registrar = async (req, res) => {

    const { email, nombre } = req.body
    // prevenir usuario duplicados
    const exiteUsuario = await Veterinario.findOne({ email })

    if (exiteUsuario) {
        const error = new Error("Usuario ya registrado")
        return res.status(400).json({ msg: error.message })
    }

    try {
        //Guardar un nuevo veterinario
        const veterinario = new Veterinario(req.body); //creamos el objeto
        const veterinarioGuardado = await veterinario.save() // guardamos el objeto
        //enviar el email
        emailRegistro({
            email,
            nombre,
            token: veterinarioGuardado.token
        })
        res.json({ usuarioCreado: veterinarioGuardado })
    } catch (error) {
        console.log(error);
    }
}

const confirmar = async (req, res) => {
    const { token } = req.params

    const usuarioConfirmar = await Veterinario.findOne({ token })

    if (!usuarioConfirmar) {
        const error = new Error("Token no valido")
        return res.status(404).json({ msg: error.message })
    }

    try {
        usuarioConfirmar.token = null
        usuarioConfirmar.confirmado = true
        await usuarioConfirmar.save()
        res.json({
            msg: "Usuario confirmado correctamente"
        })
    } catch (error) {
        console.log(error);
    }
}

const autenticar = async (req, res) => {
    const { email, password } = req.body

    //comprobar si el usuario existe
    const usuario = await Veterinario.findOne({ email })
    //si no lo encuentra creamos un error
    if (!usuario) {
        const error = new Error("usuario no encontrado")
        return res.status(403).json({ msg: error.message })
    }
    //comprobar si el usuario esta confirmado
    if (!usuario.confirmado) {
        const error = new Error("Tu cuenta no ha sido confirmada")
        return res.status(403).json({ msg: error.message })
    }
    // revisar el password
    if (await usuario.comprobarPassoword(password)) {
        //autenticar
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario.id),
        })
    } else {
        const error = new Error("El passoword es incorrecto")
        return res.status(403).json({ msg: error.message })
    }
}

const perfil = (req, res) => {

    const { veterinario } = req

    res.json({ veterinario })
}

const olvidePassword = async (req, res) => {
    const { email } = req.body
    const existeVeterinario = await Veterinario.findOne({ email })
    if (!existeVeterinario) {
        const error = new Error("El usuario no existe")
        return res.status(400).json({ msg: error.message })
    }

    try {
        existeVeterinario.token = generarId()
        await existeVeterinario.save()
        emailOlvidePassword({
            email,
            nombre: existeVeterinario.nombre,
            token: existeVeterinario.token
        })
        res.json({ msg: "hemos enviado un email con las intrucciones" })
    } catch (error) {
        console.log(error);
    }
}

const comprobarToken = async (req, res) => {
    const { token } = req.params
    const tokenValido = await Veterinario.findOne({ token })
    if (tokenValido) {
        //El token es vlaido el usuario existe
        res.json({ msg: "Token valido el usuario existe" })
    } else {
        const error = new Error("Token no valido")
        return res.status(400).json({ msg: error.message })
    }
}

const nuevoPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body

    const veterinario = await Veterinario.findOne({ token })
    if (!veterinario) {
        const error = new Error("Hubo un error")
        return res.status(400).json({ msg: error.message })
    }

    try {
        veterinario.token = null
        veterinario.password = password
        await veterinario.save()
        res.json({ msg: "Password modificado correctamente" })
    } catch (error) {
        console.log(error);
    }
}

export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword
}