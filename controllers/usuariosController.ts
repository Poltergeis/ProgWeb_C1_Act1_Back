import usuariosModel from "../models/usuarioModel";
import { Request, Response } from "express";

const usuarioController = {
    agregarUsuario: async (req:Request, res:Response) => {
      try {
        const usuarios = new usuariosModel({
          nombre: req.body.nombre,
          correo: req.body.correo,
          contrasena: req.body.contrasena,
        });
  
        await usuarios.save();
        res.status(201).json(usuarios);
      } catch (error:any) {
        res.status(400).json({ error: error.message });
      }
    },
  
    obtenerUnUsuario: async (req:Request, res:Response) => {
      try {
        const usuario = await usuariosModel.findById(req.params.id);
        if (!usuario) {
          return res.status(404).json({ error: "Usario no encontrado" });
        }
        res.json(usuario);
      } catch (error:any) {
        res.status(500).json({ error: error.message });
      }
    },
  
    visualizarUsuarios: async (req:Request, res:Response) => {
      try {
        const usuarios = await usuariosModel.find();
        res.json(usuarios);
      } catch (error:any) {
        res.status(500).json({ error: error.message });
      }
    },
  
    iniciarSesion: async (req:Request, res:Response) => {
      try {
        const { correo, contrasena } = req.body;
        const usuario = await usuariosModel.findOne({ correo });
  
        if (!usuario) {
          return res
            .status(401)
            .json({ error: "Usuario o contraseña incorrectos" });
        }
  
        if (contrasena !== usuario.contrasena) {
          return res
            .status(401)
            .json({ error: "Usuario o contraseña incorrectos" });
        }
        const datosUsuario = {
          nombre: usuario.nombre,
          correo: usuario.correo,
        };
        res.json(datosUsuario);
      } catch (error:any) {
        res.status(500).json({ error: error.message });
      }
    },
};
  
export default usuarioController