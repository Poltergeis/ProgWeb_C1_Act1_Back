import { WebSocket } from "ws"

export interface CustomSocket extends WebSocket{
    id: string
}

export interface EventAttributes {
    action: string,
    body: {
        message: string,
        value: number,
        id: string
    }
}