import { Router } from "express"
import { 
    registrar, //post
    confirmar,  //get
    autenticar,  //post
    perfil, //get
    olvidePassword, //post 
    nuevoPassword, //post
    comprobarToken  //get
} from "../controllers/veterinarioController.js"
import checkAuth from "../middleware/authMiddleware.js"

const router = Router()

//AREA PUBLICA
router.post("/", registrar)
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar)
router.post("/olvide-password", olvidePassword)
//router.get("/olvide-password/:token", comprobarToken)
//router.post("/olvide-password/:token", nuevoPassword)
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword)

//AREA PRIVADA
router.get("/perfil", checkAuth, perfil)

export default router

//toke: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Zjc5ZWQyMjM4NGJjZjE5OGNkZDA4NSIsImlhdCI6MTY5Mzk0OTcxNywiZXhwIjoxNjk2NTQxNzE3fQ.rL01g-A5LG0Y9tEDm9oDZfHUsYaj7j0lcLDG1l0ylAQ