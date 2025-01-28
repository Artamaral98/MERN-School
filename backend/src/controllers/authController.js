import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import tokenGen from "../utils/tokenGen.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt"



class AuthController {
    login = catchAsyncErrors(async(req, res) => {

        try {
            const {email, password} = req.body

            if(!email || !password ){
                return res.status(400).json({message: "Preencha todos os campos"})
            }
    
            const user = await User.findOne({email}).select("password")

            if (user) {
                const isPasswordValid = await bcrypt.compare(password, user.password);

                if(!isPasswordValid) {
                    return res.status(400).json({message: "Usuário ou senha inválidos"})
                }
            }

            if(!user) {
                return res.status(400).json({message: "Usuário ou senha inválidos"})
            };

            const token = tokenGen(user, res)
    
            return res.status(200).json({message: "Usuário logado", token: token})
            
        } catch (error) {
            res.status(500).json({errors: error.errors})
        }


})

    logout = catchAsyncErrors(async(req, res, next) => {
        return res.clearCookie("token").status(200).json("Usuário deslogado");
})

    register = catchAsyncErrors(async (req, res) => {
        try{
            const {email, password} = req.body

            if(!email || !password ){
                return res.status(400).json({message: "Preencha todos os campos"})
            }
        
            const isRegistered = await User.findOne({email})
        
            if (isRegistered) {
                return res.status(400).json({message: "Usuário já registrado"})
            };
        
            const user = await User.create({email, password})
            return res.status(201).json({message: "Usuário registrado"})
            
        } catch (err){
            res.status(500).json({errors: err.errors})
        }
    });
}

export default new AuthController();