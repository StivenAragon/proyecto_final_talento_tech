import  { Router }  from "express";
import { loginUser, registerUser, checkEmails } from "../controllers/users.controller.js"
import { getServicios, createServicio, updateServicio, deleteServicio } from "../controllers/servicios.controller.js"
import { getDestinos, createDestino, updateDestino, deleteDestino } from "../controllers/destinos.controller.js"
import { getProveedores, createProveedor, updateProveedor, deleteProveedor } from "../controllers/proveedores.controller.js"

const router = Router();

//Rutas Publicas
router.post('/api/register', registerUser);

router.post('/api/login', loginUser);

//Rutas Privadas

router.post('/api/ckeckEmailsUnique',checkEmails);

//proveedores
router.get('/api/proveedores',getProveedores);
router.post('/api/proveedores/create',createProveedor);
router.post('/api/proveedores/update',updateProveedor);
router.post('/api/proveedores/delete',deleteProveedor);

//servicios
router.get('/api/servicios',getServicios);
router.post('/api/servicios/create',createServicio);
router.post('/api/servicios/update',updateServicio);
router.post('/api/servicios/delete',deleteServicio);

//destinos
router.get('/api/destinos',getDestinos);
router.post('/api/destinos/create',createDestino);
router.post('/api/destinos/update',updateDestino);
router.post('/api/destinos/delete',deleteDestino);

export default router