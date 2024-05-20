import { Router } from "express";
import puntajeController from "../controllers/puntajeController";

export const puntajeRouter = Router();

puntajeRouter.post('/guardar', async function (req, res) {
    try {
        await puntajeController.guardarPuntaje(req, res);
    } catch (error: any) {
        console.log(`ERROR: ${error.message}`);
    }
});

puntajeRouter.get('/visualizar', async function (req, res) {
    try {
        await puntajeController.visualizarPuntaje(req, res);
    } catch (error: any) {
        console.log(`ERROR: ${error.message}`);
    }
});