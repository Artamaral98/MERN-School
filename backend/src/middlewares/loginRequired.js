import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const loginRequiredMiddleware = async (req, res, next) => {
  const {authorization} = req.headers

  if(!authorization) {
    return res.status(401).json({
      errors:['Necessário fazer login']
    })
  }

  const [bearer, token] = authorization.split(' ') 

  try {
    const dados = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { id, email} = dados

    const user = User.findOne({ //checar se o usuário atual é o mesmo usuário do token fornecido.
      where:{
        id:id,
        email:email
      }
    })

    if (!user){
      return res.status(401).json({
        errors: ['Usuário inválido.']
      })
    }

    req.userId = id;
    req.userEmail = email;
    return next()

  } catch(err){
    return res.status(401).json({
      errors: ['token expirado ou inválido']
    })
  }
}

export default loginRequiredMiddleware