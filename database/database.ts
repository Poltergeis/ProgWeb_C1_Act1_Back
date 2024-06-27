import mongoose from "mongoose";
import signale from "signale";
import dotenv from "dotenv"
dotenv.config()

const MONGO_USER = process.env.MONGO_USER
const MONGO_PASSWORD = process.env.MONGO_PASSWORD
const MONGO_COLLECTION = process.env.MONGO_COLLECTION
const MONGO_HOST = process.env.MONGO_HOST


export default async function connectToDatabase() {
    try {
        await mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_HOST}/${MONGO_COLLECTION}?retryWrites=true`)
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