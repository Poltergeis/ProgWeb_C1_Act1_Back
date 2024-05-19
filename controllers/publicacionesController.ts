import publicacionesModel from "../models/publicacionesModel";
import { Request,Response } from "express";


const publicacionController = {
    guardarPublicacion: async (req:Request, res:Response) => {
      try {
        const publicacion = new publicacionesModel({
          usuario: req.body.usuario,
          contenido: req.body.contenido,
          fecha: req.body.fecha,
        });
        await publicacion.save();
        res.status(201).json(publicacion);
      } catch (error:any) {
        res.status(400).json({ error: error.message });
      }
    },
    visualizaPublicaciones: async (req:Request, res:Response) => {
      try {
        const publicacion = await publicacionesModel.find();
        res.json(publicacion);
      } catch (error:any) {
        res.status(500).json({ error: error.message });
      }
    },
};
  

export default publicacionController