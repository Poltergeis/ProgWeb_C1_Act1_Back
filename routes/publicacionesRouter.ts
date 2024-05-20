import { Router } from "express";
import publicacionController from "../controllers/publicacionesController";

export const publicacionesRouter = Router();

publicacionesRouter.get('/visual', async function (req, res) {
    try {
        await publicacionController.visualizaPublicaciones(req, res);
    } catch (error: any) {
        console.log(`ERROR: ${error.message}`);
    }
})

publicacionesRouter.post('/crear', async function (req, res) {
    try {
        await publicacionController.guardarPublicacion(req, res);
    } catch (error: any) {
        console.log(`ERROR: ${error.message}`);
    }
})