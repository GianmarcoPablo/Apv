import nodemailer from "nodemailer"

const emailRegistro = async (datos) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const { nombre, email, token } = datos
    //ENIVAR EL EMAIL

    const info = await transporter.sendMail({
        from: "APV - Administrador de paciente de veterinaria",
        to: email,
        subject: "Comprueba tu cuenta en APV",
        text: "Comprueba tu cuenta en APV",
        html:
            `   <p>Hola: ${nombre}, Comprueba tu cuenta en APV.</p>
            <p>Tú cuenta esta lista solo debes comprobar en el siguiente enlace:
                <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a> 
            </p>
            <p>Si tu no create esta cuenta, puedes ignorar este mensaje</p>
        `
    })
    console.log("Mensaje enviado: %s", info.messageId);
}

export default emailRegistro