import app from "./app.js"
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})