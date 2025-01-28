import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: [14, "O campo nome deve conter no máximo 14 caractéres"]
    },
    age: {
        type: Number,
        required: true,
        maxLength: [2, "O campo deve conter no máximo 2 caractéres"]
    },
    classe: {
        type: String,
        required: true,
        maxLength: [3, "O campo classe deve conter no máximo 5 caractéres"],
    },
},
{timestamps: true})

export const Student = mongoose.model("student", StudentSchema)