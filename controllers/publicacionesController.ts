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
        return publicacion;
      } catch (error:any) {
        res.status(400).json({ error: error.message });
      }
    },
    visualizaPublicaciones: async (req:Request, res:Response) => {
      try {
        const publicaciones = await publicacionesModel.find();
        res.status(200).json({
          success: true,
          data: publicaciones
        });
      } catch (error:any) {
        res.status(500).json({ error: error.message });
      }
    },
};
  

export default publicacionController