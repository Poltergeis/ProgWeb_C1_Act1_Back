import { Router, Response, Request } from "express";
import { AgendaController } from "../controllers/agendaController";
import webHookUserModel from "../models/webhookUsersModel";
import { Users, WebHookRequest } from "../types/webhooksUsers";


const agendaController = new AgendaController();
export const agendaRouter = Router();

const users: Users[] = [];

const peticionesPendientes: Response[] = [];

agendaRouter.post('/webhooks', async function (req: WebHookRequest, res) {
    try {
        const { url} = req.body;
        const newWebHooks = new webHookUserModel({
            url
        });
        await newWebHooks.save();
        res.status(201).json({
            success: true,
            message: "nuevo usuario de webhooks",
            nuevo_usuario: newWebHooks
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
});

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
            cliente.write(`data: ${JSON.stringify(nuevaNotificacion)}\n\n`);
        }

        const urls = await webHookUserModel.find();
        for (let url of urls) {
            await fetch(url.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevaNotificacion)
            });
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