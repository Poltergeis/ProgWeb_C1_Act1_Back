import mongoose, { Schema, model } from "mongoose";
import { Users } from "../types/webhooksUsers";

const webhookUserSchema = new Schema<Users>({
    id: {
        type: Schema.Types.String,
        required: true
    },
    url: {
        type: Schema.Types.String,
        required: true
    },
    secretWord: {
        type: Schema.Types.String,
        required: true
    }
}, { versionKey: false });

const webHookUserModel = model('webhookUser', webhookUserSchema, 'webhookUsers');
export default webHookUserModel;