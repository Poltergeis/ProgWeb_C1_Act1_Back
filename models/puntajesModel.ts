import mongoose from "mongoose";
import { IPuntaje } from "../types/IPuntajes";

const puntajeSchema = new mongoose.Schema<IPuntaje>({
    nombre:{
        type: mongoose.Schema.Types.String,
        required: true
    },
    puntaje:{
        type: mongoose.Schema.Types.Number,
        required: true
    }
})
const puntajesModel = mongoose.model('puntaje', puntajeSchema, 'puntajes');

export default puntajesModel;