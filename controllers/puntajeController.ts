import puntajesModel from "../models/puntajesModel";
import { Request, Response } from "express";

const puntajeController = {
    guardarPuntaje: async (req:Request, res:Response) => {
      try {
        const datosJugador = new puntajesModel({
          nombre: req.body.nombre,
          puntaje: req.body.puntaje,
        });
        await datosJugador.save();
        res.status(201).json(datosJugador);
      } catch (error:any) {
        res.status(400).json({ error: error.message });
      }
    },
  
    visualizarPuntaje: async (req:Request, res:Response) => {
      try {
        const datosJugador = await puntajesModel.find();
        datosJugador.sort((a, b) => b.puntaje - a.puntaje);
        res.json(datosJugador);
      } catch (error:any) {
        res.status(500).json({ error: error.message });
      }
     }
};
  
export default puntajeController