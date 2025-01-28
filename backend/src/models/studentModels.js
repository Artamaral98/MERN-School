import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: [14, "O campo nome deve conter no máximo 14 caractéres"]
    },
    age: {
        type: Number,
        required: [true, "Preencha o campo idade"],
        min: [1, "A idade não pode ser inferior a 1"],
        max:[100, "A idade não pode ser superior a 100"],
    },
    classe: {
        type: String,
        required: true,
        maxLength: [3, "O campo turma deve conter no máximo 3 caractéres"],
    },
},
{timestamps: true})

export const Student = mongoose.model("student", StudentSchema)