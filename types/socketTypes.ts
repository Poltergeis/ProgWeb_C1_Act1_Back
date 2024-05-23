import { WebSocket } from "ws"
import { IPuntaje } from "./IPuntajes"

/*export interface CustomSocket extends WebSocket{
    id: string
}*/

export interface EventAttributes {
    action: string,
    body: {
        message: string,
        value: number,
        id: string,
        name: string
    }
}