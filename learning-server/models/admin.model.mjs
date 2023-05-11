import { Schema, SchemaTypes, model } from "mongoose";

const adminSchema = new Schema({

    name : {
        type: String,
        lowercase: true,
    },
    id : {
        type: SchemaTypes.ObjectId,
        ref: 'Employee'
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    joinedAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    }

})

const adminModel = model("Admin", adminSchema)
export default adminModel