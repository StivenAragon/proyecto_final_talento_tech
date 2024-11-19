import  { Router }  from "express";
import { loginUser, registerUser } from "../controllers/users.controller.js"
import { getServicios, createServicio, updateServicio, deleteServicio } from "../controllers/servicios.controller.js"

const router = Router();

//Rutas Publicas
router.post('/api/register', registerUser);

router.post('/api/login', loginUser);

//Rutas Privadas

//servicios
router.get('/api/servicios',getServicios)
router.post('/api/servicios/create',createServicio)
router.post('/api/servicios/update',updateServicio)
router.post('/api/servicios/delete',deleteServicio)

export default router