import usuariosModel from "../models/usuarioModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const secretKey = crypto.randomBytes(64).toString("hex");

const usuarioController = {
  agregarUsuario: async (req: Request, res: Response) => {
    try {
      const contraEncryp = await bcrypt.hash(req.body.contrasena, 10);
      const usuarios = new usuariosModel({
        nombre: req.body.nombre,
        correo: req.body.correo,
        contrasena: contraEncryp,
      });

      await usuarios.save();
      res.status(201).json(usuarios);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  obtenerUnUsuario: async (req: Request, res: Response) => {
    try {
      const usuario = await usuariosModel.findById(req.params.id);
      if (!usuario) {
        return res.status(404).json({ error: "Usario no encontrado" });
      }
      res.json(usuario);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  visualizarUsuarios: async (req: Request, res: Response) => {
    try {
      const usuarios = await usuariosModel.find();
      res.json(usuarios);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  iniciarSesion: async (req: Request, res: Response) => {
    try {
      const { correo, contrasena } = req.body;
      const usuario = await usuariosModel.findOne({ correo });

      if (!usuario) {
        return res
          .status(401)
          .json({ error: "Usuario o contraseña incorrectos" });
      }

      const isMatch = await bcrypt.compare(contrasena, usuario.contrasena);

      if (!isMatch) {
        return res
          .status(401)
          .json({ error: "Usuario o contraseña incorrectos" });
      }
      const token = jwt.sign({ id: usuario.id }, secretKey, {
        expiresIn: "1h",
      });
      const datosUsuario = {
        nombre: usuario.nombre,
        token,
      };

      res.json(datosUsuario);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default usuarioController;
