import { Request, Response } from "express";
import { IAgenda } from "../types/IAgenda";
import agendaModel from "../models/agendaModel";

export class AgendaController {
    pendingResponses: Response[]
    constructor() {
        this.pendingResponses = []
    }

    private responderClientes(newAgenda: IAgenda) {
        for (let res of this.pendingResponses) {
            res.status(200).send({
                success: true,
                message: "respuesta pendiente respondida",
                nuevaAgenda: newAgenda
            })
        }
        this.pendingResponses = []
    }

    async visualizarAgendas(req:Request,res:Response) {
        try {
            const notificaciones = await agendaModel.find();
            res.status(200).json({
              notificaciones,
            });
          } catch (error) {
            res.status(500).json({
              error: "Error al obtener las notificaciones",
            });
          }
          console.log("Hola")
    }

    async getNuevaAgenda(peticionPendiente: Response) {
        this.pendingResponses.push(peticionPendiente);
    }

    async guardarAgenda(req:Request,res:Response) {
        try {
            const notificacion = new agendaModel({
              fecha: req.body.fecha,
              usuario: req.body.usuario,
              mensaje: req.body.mensaje,
            });
            await notificacion.save();
        
            res.status(201).json({
              success: true,
              message: "evento guardada",
            });
          
            return notificacion;
          } catch (error) {
            res.status(500).json({
              error: "Error al guardar el evento",
            });
          }
          console.clear()
    }

    async limpiarAgendas(req: Request, res: Response) {
        try {
            await agendaModel.deleteMany();
            res.status(200).json({ message: 'Todos los eventos han sido eliminadas' });
          } catch (error) {
            res.status(500).json({ error: 'Error al eliminar los eventos' });
          }
    }

}