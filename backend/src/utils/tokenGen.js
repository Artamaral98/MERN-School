import jwt from "jsonwebtoken"

const tokenGen = (user, res) => {
    const expireTime = 1000 * 60 * 60 * 24 * 7 // 1 semana
    const cookieName = 'token'

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET_KEY, {expiresIn: expireTime});

    res.cookie(cookieName, token, {
        httpOnly:true,
        admin: true,
        maxAge: expireTime
    })

    return token




}

export default tokenGen