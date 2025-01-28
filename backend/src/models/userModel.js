import mongoose from "mongoose";
import bycrypt from "bcrypt"
import validator from "validator";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "O campo email deve ser preenchido"],
        validator: [validator.isEmail, "Email inválido"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Insira uma senha"],
        minLength: [5, "A senha deve conter no mínimo 5 caracteres"],
    },
})


UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")){
        next();
    }
    this.password = await bycrypt.hash(this.password, 12)
});

export const User = mongoose.model("User", UserSchema);
export default User

