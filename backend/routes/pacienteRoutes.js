import { Router } from "express";
import { obtenerPacientes, agregarPaciente, obtenerPaciente, actulizarPaciente, eliminarPaciente } from "../controllers/PacienteController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = Router()

router.route("/")
    .post(checkAuth, agregarPaciente)
    .get(checkAuth, obtenerPacientes)
router.route("/:id")
    .get(checkAuth, obtenerPaciente)
    .put(checkAuth, actulizarPaciente)
    .delete(checkAuth, eliminarPaciente)


export default router