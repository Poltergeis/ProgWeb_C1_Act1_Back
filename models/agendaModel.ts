import mongoose from "mongoose";

const agendaSchema = new mongoose.Schema({
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