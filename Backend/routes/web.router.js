import  { Router }  from "express";
import { loginUser, registerUser, checkEmails, cambiarContrasenha } from "../controllers/users.controller.js"
import { getServicios, createServicio, updateServicio, deleteServicio, getServiciosProveedor } from "../controllers/servicios.controller.js"
import { getDestinos, createDestino, updateDestino, deleteDestino, getDestinosProveedor } from "../controllers/destinos.controller.js"
import { getProveedores, createProveedor, updateProveedor, deleteProveedor } from "../controllers/proveedores.controller.js"
import { getCampanhas, createCampanha, updateCampanha, deleteCampanha, getCampanhasProveedor, getCampanhasDestinosDesde, getCampanhasDestinosHasta } from "../controllers/campanhas.controller.js"

const router = Router();

//Rutas Publicas
router.post('/api/register', registerUser);

router.post('/api/login', loginUser);

//Rutas Privadas

router.post('/api/ckeckEmailsUnique',checkEmails);
router.post('/api/cambiarContrasenha',cambiarContrasenha);

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
router.post('/api/servicios/getServiciosProveedores',getServiciosProveedor);

//destinos
router.get('/api/destinos',getDestinos);
router.post('/api/destinos/create',createDestino);
router.post('/api/destinos/update',updateDestino);
router.post('/api/destinos/delete',deleteDestino);
router.post('/api/destinos/getDestinosProveedores',getDestinosProveedor);

//destinos
router.get('/api/campanhas',getCampanhas);
router.post('/api/campanhas/create',createCampanha);
router.post('/api/campanhas/update',updateCampanha);
router.post('/api/campanhas/delete',deleteCampanha);
router.post('/api/campanhas/getCampanhasProveedor', getCampanhasProveedor);
router.post('/api/campanhas/getCampanhasDestinosDesde', getCampanhasDestinosDesde);
router.post('/api/campanhas/getCampanhasDestinosHasta', getCampanhasDestinosHasta);

export default router