import mongoose from "mongoose";

const puntajeSchema = new mongoose.Schema({
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