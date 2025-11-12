import express from 'express'
const app = express()
import bodyparser from 'body-parser'
import morgan from 'morgan'
import mongoose from 'mongoose'
import 'dotenv/config'
import cors from 'cors'
const api = process.env.API_URL

app.use(cors())
app.options('*' , cors())

//middleware
app.use(bodyparser.json())
app.use(morgan('tiny'))


//routers
import categoriesRouter from './routes/categories.js'
import ordersRouter from './routes/orders.js'
import productsRouter from './routes/products.js'
import usersRouter from './routes/users.js'


app.use(`${api}/categories` , categoriesRouter)
app.use(`${api}/orders` , ordersRouter)
app.use(`${api}/products` , productsRouter)
app.use(`${api}/users` , usersRouter)



mongoose.connect(process.env.CONECTION_STRING , {
    dbName:'eshop-database'
})
.then(() => {
    console.log('mongo conectado com sucesso')
})
.catch((err) => {
    console.log('ocurreu um erro ao conectar o mongo:' + err)
})

app.listen(3004, () => {
    console.log(api)
    console.log('sucesso')
})
