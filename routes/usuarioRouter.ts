import { Router } from "express";
import usuarioController from "../controllers/usuariosController";

export const usuarioRouter = Router();

usuarioRouter.post('/crear', async function (req, res) {
    try {
        await usuarioController.agregarUsuario(req, res);
    } catch (error: any) {
        console.log(`ERROR: ${error.message}`);
    }
});

usuarioRouter.get('/', async function (req, res) {
    try {
        await usuarioController.visualizarUsuarios(req, res);
    } catch (error: any) {
        console.log(`ERROR: ${error.message}`);
    }
});

usuarioRouter.get('/usuario/:id', async function (req, res) {
    try {
        await usuarioController.obtenerUnUsuario(req, res);
    } catch (error: any) {
        console.log(`ERROR: ${error.message}`);
   }
});

usuarioRouter.post('/login', async function (req, res) {
    try {
        await usuarioController.iniciarSesion(req, res);
    } catch (error: any) {
        console.log(`ERROR: ${error.message}`);
   }
});