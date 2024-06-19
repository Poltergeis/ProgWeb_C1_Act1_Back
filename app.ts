import express from "express";
import cors from "cors";
import http from "http";
import morgan from "morgan";
import dotenv from "dotenv";
import signale from "signale";
import { WebSocketServer, WebSocket } from "ws";
import { EventAttributes } from "./types/socketTypes";
import puntajesModel from "./models/puntajesModel";
import { IPuntaje } from "./types/IPuntajes";
import { publicacionesRouter } from "./routes/publicacionesRouter";
import { usuarioRouter } from "./routes/usuarioRouter";
import { agendaRouter } from "./routes/agendaRouter";

dotenv.config();

import connectToDatabase from "./database/database";

const app = express();

app.use(express.json());
app.use(cors({
  origin: '*'
}));
app.use(morgan("dev"));

app.use("/publicacion", publicacionesRouter);
app.use("/usuario", usuarioRouter);
app.use("/agenda", agendaRouter);

const server = http.createServer(app);

const wss = new WebSocketServer({ server: server });

wss.on("connection", function (socket: WebSocket) {
  console.log("nueva conexion");

  socket.on("error", function (error: Error) {
    console.log("ha ocurrido un error.", error.message);
  });

  socket.onmessage = async (event) => {
    const data = event.data;
    const parsedData: EventAttributes = JSON.parse(data.toString());
    const action = parsedData.action;
    const body = parsedData.body;
    let puntajes: IPuntaje[];
    switch (action) {
      case "getPuntajes":
        puntajes = await puntajesModel.find();
        if (puntajes.length === 0) {
          socket.send(
            JSON.stringify({
              key: "puntajes",
              data: ["no hay puntajes"],
            })
          );
        } else {
          puntajes = puntajes.sort((a, b) => b.puntaje - a.puntaje);
          socket.send(
            JSON.stringify({
              key: "puntajes",
              data: puntajes,
            })
          );
        }
        console.log("aqui");
        break;
      case "postPuntaje":
        const nuevoPuntaje = new puntajesModel({
          nombre: body.name,
          puntaje: body.value,
        });
        await nuevoPuntaje.save();
        puntajes = await puntajesModel.find();
        puntajes = puntajes.sort((a, b) => b.puntaje - a.puntaje);
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                key: "newPuntaje",
                data: puntajes,
              })
            );
          }
        });
        console.log("no");
        break;
      default:
        console.log("Fallo en el bucle");
        break;
    }
  };
});

const PORT = process.env.PORT;

connectToDatabase().then(() => {
  server.listen(PORT, () =>
    signale.success(`servidor escuchando en el puerto ${PORT}`)
  );
});
