import { Router } from "express";
import { AgendaController } from "../controllers/agendaController";

const agendaController = new AgendaController();
export const agendaRouter = Router();

agendaRouter.get('/ver', async function (req, res) {
    try {
        await agendaController.visualizarAgendas(req, res);
    } catch (error) {
        console.log(`error en el enrutador. ERROR: ${error}`)
    }
});

agendaRouter.get('/nueva-agenda', async function (req, res) {
    try {
        await agendaController.getNuevaAgenda(res);
    } catch (error) {
        console.log(`error en el enrutador. ERROR ${error}`);
    }
});

agendaRouter.post('/guardar', async function (req, res) {
    try {
        await agendaController.guardarAgenda(req, res);
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