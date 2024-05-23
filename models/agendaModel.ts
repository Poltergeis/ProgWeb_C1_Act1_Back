import mongoose from "mongoose";
import { IAgenda } from "../types/IAgenda";

const agendaSchema = new mongoose.Schema<IAgenda>({
    fecha:{
        type: mongoose.Schema.Types.String,
        required:true
    },
    usuario:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    mensaje:{
        type: mongoose.Schema.Types.String,
        required:true
    }
})
const agendaModel = mongoose.model('agenda', agendaSchema, 'agendas');

export default agendaModel;