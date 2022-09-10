import express from 'express'
import dotenv from 'dotenv'
import routerAuth from './routes/auth.routes.js'
import { dbConnection } from './config/db.js'
import cors from 'cors'
import routerEvents from './routes/events.routes.js'



const app = express()

dbConnection()

app.use(cors())

dotenv.config()

app.use(express.json())


app.use(express.static('public'))

app.use('/api/auth', routerAuth )
app.use('/api/events', routerEvents)


app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`)
})

