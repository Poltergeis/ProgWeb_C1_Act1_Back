import { Router, Response } from "express";
import publicacionController from "../controllers/publicacionesController";

export const publicacionesRouter = Router();

const peticionesPendientes:Response[] = [];

publicacionesRouter.get('/visual', async function (req, res) {
    try {
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no cache");
        res.setHeader("Connection", "keep-alive");
        peticionesPendientes.push(res);
    } catch (error: any) {
        console.log(`ERROR: ${error.message}`);
    }
})

publicacionesRouter.post('/crear', async function (req, res) {
    try {
        const nuevaPublicacion = await publicacionController.guardarPublicacion(req, res);

        for (let cliente of peticionesPendientes) {
            cliente.write(`event: nueva-publicacion\n`);
            cliente.write(`data: ${nuevaPublicacion}\n\n`);
        }

        return res.status(201).send({
            success: true,
            data: nuevaPublicacion
        });
    } catch (error: any) {
        console.log(`ERROR: ${error.message}`);
    }
})