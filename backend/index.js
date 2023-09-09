import express from 'express'
import VeterinarioRoutes from './routes/veterinarioRoutes.js'
import PacienteRoutes from './routes/pacienteRoutes.js'
import dotenv from 'dotenv'
import conectarDB from './config/db.js'
import cors from "cors"

//-------------INICIAR EXPRESS-------------\\
const app = express()
//-----------------------------------------\\

//-------------CONFIGURACIONES-------------\\
app.use(express.json())
dotenv.config()
//-----------------------------------------\\

//---------CONECTAR BASE DE DATOS ---------\\
conectarDB()
const dominiosPermitidos = [process.env.FRONTEND_URL]
const corsOptions = {
    origin: function (origin, callback) {
        if (dominiosPermitidos.indexOf(origin) !== -1) {
            //El origen del request esta permitido
            callback(null, true)
        } else {
            callback(new Error("No permitido Cors"))
        }
    }
}
app.use(cors(corsOptions))
//-----------------------------------------\\

//-----------------RUTAS-------------------\\
app.use("/api/veterinarios", VeterinarioRoutes)
app.use("/api/pacientes", PacienteRoutes)
//-----------------------------------------\\

//---------INICIAR EN EL PUERTO------------\\
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
})
//-----------------------------------------\\