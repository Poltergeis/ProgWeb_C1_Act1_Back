import express from "express"
import cors from "cors"
import http from "http"
import morgan from "morgan"
import dotenv from "dotenv"
import signale from "signale"
import { WebSocketServer, WebSocket } from "ws"
import { EventAttributes } from "./types/socketTypes"
import puntajesModel from "./models/puntajesModel"
import { IPuntaje } from "./types/IPuntajes"
import { publicacionesRouter } from "./routes/publicacionesRouter"
import { usuarioRouter } from "./routes/usuarioRouter"
import { agendaRouter } from "./routes/agendaRouter"

dotenv.config()

import connectToDatabase from "./database/database"
const corsOptions = {
    origin: '*'
}

const app = express()

app.use(express.json())
app.use(cors(corsOptions));
app.use(morgan("dev"));

app.use('/publicaciones', publicacionesRouter);
app.use('/usuario', usuarioRouter);
app.use('/agenda', agendaRouter);

const server = http.createServer(app);

const wss = new WebSocketServer({ server: server });

wss.on('connection', function (socket: WebSocket) {
    console.log("nueva conexion");

    socket.on('error', function (error: Error) {
        console.log('ha ocurrido un error.', error.message);
    });
    

    socket.onmessage = async(event) => {
        const data = event.data;
        const parsedData: EventAttributes = JSON.parse(data.toString());
        const action = parsedData.action;
        const body = parsedData.body;

        switch (action) {
            case "getPuntajes":
                console.log("evento iniciado")//comentario
                let puntajes:IPuntaje[] = await puntajesModel.find();
                console.log("puntajes obtenidos de la database")//comentario
                if (!puntajes) {
                    console.log("los puntajes no existen, punto final 1 del evento")//comentario
                    socket.send(JSON.stringify({
                        key: "puntajes",
                        data: ["no hay puntajes"]
                    }));
                }
                console.log("existencia de los puntajes comprobadas")//comentario
                if (puntajes.length > 1) {
                    puntajes = puntajes.sort((a, b) => b.puntaje - a.puntaje);
                }
                console.log("puntajes ordenados, punto final 2")
                socket.send(JSON.stringify({
                    key: "puntajes",
                    data: puntajes
                }));
                break;
            
            case "test":
                console.log(`los sockets funcionan correctamente: ${action}`);
                break;
            
            case "postPuntaje":
                const nuevoPuntaje = new puntajesModel({
                    nombre: body.name,
                    puntaje: body.value
                });
                await nuevoPuntaje.save();
                socket.send(JSON.stringify({
                    key: "newPuntaje",
                    data: nuevoPuntaje
                }));
                break;
        }
    }

})

const PORT = process.env.PORT;

connectToDatabase().then(() => {
    server.listen(PORT, () => signale.success(`servidor escuchando en el puerto ${PORT}`))
})