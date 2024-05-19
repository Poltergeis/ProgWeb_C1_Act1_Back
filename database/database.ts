import mongoose from "mongoose";
import signale from "signale";
import dotenv from "dotenv"
dotenv.config()

const MONGO_HOST = process.env.MONGO_HOST
const MONGO_PORT = process.env.MONGO_PORT
const MONGO_COLLECTION = process.env.MONGO_COLLECTION

export default async function connectToDatabase() {
    try {
        await mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_COLLECTION}`)
    } catch (error) {
        signale.info("la conexion a mongo ha fallado antes de ser establecida")
    }
}

const conn = mongoose.connection

conn.once('open', () => {
    signale.success("conexion a mongo establecida")
})

conn.on('error', () => {
    signale.error("la conexion a mongo ha fallado y se ha cerrado")
})