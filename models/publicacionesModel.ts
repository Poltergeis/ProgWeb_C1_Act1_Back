import mongoose from "mongoose";

const publicacionesSchema = new mongoose.Schema({
    usuario:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    contenido:{
        type: mongoose.Schema.Types.String,
        require: true
    },
    fecha:{
        type: mongoose.Schema.Types.String,
        require: true
    }
})
const publicacionesModel = mongoose.model('publicaciones', publicacionesSchema, 'publicaciones');

export default publicacionesModel;