import { Router, Response } from "express";
import { AgendaController } from "../controllers/agendaController";

const agendaController = new AgendaController();
export const agendaRouter = Router();

const peticionesPendientes: Response[] = [];

agendaRouter.get('/ver', async function (req, res) {
    try {
        await agendaController.visualizarAgendas(req, res);
    } catch (error) {
        console.log(`error en el enrutador. ERROR: ${error}`)
    }
});

agendaRouter.get('/nueva-agenda', async function (req, res) {
    try {
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no cache");
        res.setHeader("Connection", "keep-alive");
        peticionesPendientes.push(res);
    } catch (error) {
        console.log(`error en el enrutador. ERROR ${error}`);
    }
});

agendaRouter.post('/guardar', async function (req, res) {
    try {
        const nuevaNotificacion = await agendaController.guardarAgenda(req, res);

        for (let cliente of peticionesPendientes) {
            cliente.write(`data: ${nuevaNotificacion}\n\n`);
        }
    } catch (error) {
        console.log(`error en el enrutador. ERROR: ${error}`);
    }
});

agendaRouter.delete('', async function (req, res) {
    try {
        await agendaController.limpiarAgendas(req, res);
    } catch (error) {
        console.log(`error en el enrutador. ERROR: ${error}`);
   }
});