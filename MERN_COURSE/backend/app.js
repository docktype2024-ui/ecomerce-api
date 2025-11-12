import express from 'express'
const app = express()
import bodyparser from 'body-parser'
import morgan from 'morgan'
import mongoose from 'mongoose'

//middleware
app.use(bodyparser.json())
app.use(morgan('tiny'))


const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true,
    },
})

const Product = mongoose.model('Product' , productSchema)


import 'dotenv/config'

const api = process.env.API_URL

app.get(`${api}/products`, async (req, res) => {
    const productList = await Product.find()

    if (!productList){
        res.status(500).json({success:false})
    }

    res.send(productList)
})

app.post(`${api}/products`, (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock,
    })

    product.save()
    .then((createdProduct=> {
        res.status(201).json(createdProduct)
    }))
    .catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

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
