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
import { puntajeRouter } from "./routes/puntajeRouter"
import { usuarioRouter } from "./routes/usuarioRouter"

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
app.use('/puntaje', puntajeRouter);
app.use('/usuario', usuarioRouter);

const server = http.createServer(app);

const wss = new WebSocketServer({ server: server });

wss.on('connection', function (socket:WebSocket) {

    socket.onmessage = async(event) => {
        const data = event.data;
        const parsedData: EventAttributes = JSON.parse(data.toString());
        const action = parsedData.action;
        const body = parsedData.body;

        switch (action) {
            case "getPuntajes":
                let puntajeAdelante: IPuntaje, puntajeAtras: IPuntaje, indexNext: number
                const puntajes = await puntajesModel.find() as IPuntaje[];
                for (let i = 0; i < puntajes.length; i++){
                    indexNext = (i + 1) <= puntajes.length ? (i + 1) : i;
                    if (puntajes[i].puntaje > puntajes[indexNext].puntaje && indexNext !== i) {
                        indexNext = indexNext - 1;
                        while (puntajes[indexNext].puntaje > puntajes[indexNext + 1].puntaje && indexNext > 0) {
                            puntajeAdelante = puntajes[indexNext];
                            puntajeAtras = puntajes[indexNext + 1];
                            puntajes[indexNext] = puntajeAtras;
                            puntajes[indexNext + 1] = puntajeAdelante;
                            indexNext = indexNext - 1;
                        }
                    }
                }
                socket.send(JSON.stringify({
                    key: "puntajes",
                    data: puntajes
                }));
                break;
        }
    }

})

const PORT = process.env.PORT;

connectToDatabase().then(() => {
    server.listen(PORT, () => signale.success(`servidor escuchando en el puerto ${PORT}`))
})