import User from "../../models/userModel.js"


const registerValidation = async (email, password, res) => {
    
    if(!email || !password ){
        return res.status(400).json({message: "Preencha todos os campos"});
    }

    const isRegistered = await User.findOne({email})

    if (isRegistered) {
        return res.status(400).json({message: "Usuário já castrado"});
    };

    const user = await User.create({email, password})
    return user

}

export default registerValidation