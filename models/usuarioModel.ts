import mongoose from "mongoose";

const empleadosSchema = new mongoose.Schema({
    nombre:{
        type: mongoose.Schema.Types.String,
        required: true
    },
    correo:{
        type: mongoose.Schema.Types.String,
        required: true
    },
    contrasena:{
        type: mongoose.Schema.Types.String,
        required: true
    }
})
const usuariosModel = mongoose.model('usuarios', empleadosSchema, 'usuarios');

export default usuariosModel