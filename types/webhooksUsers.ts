import { Request } from "express"

export interface Users {
    id: string,
    url: string,
    secretWord: string
}
export interface WebHookRequest extends Request{
    body: {
        id: string,
        url: string,
        secretWord: string
    }
}