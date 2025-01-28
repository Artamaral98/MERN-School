import User from "../../models/userModel.js"
import bcrypt from "bcrypt"

const loginValidation = async (email, password,) => {
    
    if(!email || !password){
        return
    }

    const user = await User.findOne({email}).select("password")
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!user || !isPasswordValid) {
        return
    };

    return user

}

export default loginValidation