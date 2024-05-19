import express from "express"
import cors from "cors"
import http from "http"
import morgan from "morgan"
import dotenv from "dotenv"
import signale from "signale"
import { WebSocketServer } from "ws"
import { CustomSocket,EventAttributes } from "./types/socketTypes"
import { v4 as uuid } from "uuid"

dotenv.config()

import connectToDatabase from "./database/database"
const corsOptions = {
    origin: '*'
}

const app = express()

app.use(express.json())
app.use(cors(corsOptions));
app.use(morgan("dev"));

const server = http.createServer(app);

const wss = new WebSocketServer({ server: server });

wss.on('connection', function (socket:CustomSocket) {
    
    socket.id = uuid();
    console.log(`nuevo usuario conectado con el id: ${socket.id}`)

    socket.onmessage = (event) => {
        const data = event.data;
        const parsedData: EventAttributes = JSON.parse(data.toString());
        const action = parsedData.action;
        const body = parsedData.body;
    }

})

const PORT = process.env.PORT;

connectToDatabase().then(() => {
    server.listen(PORT, () => signale.success(`servidor escuchando en el puerto ${PORT}`))
})