
import Product from '../models/product.js'
import express from 'express'
import mongoose from 'mongoose'
const router = express.Router()

router.get(`/`, async (req, res) => {
    const productList = await Product.find()

    if (!productList){
        res.status(500).json({success:false})
    }

    res.send(productList)
})

router.post(`/`, async (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeature: isFeature,
        dateCreated: dateCreated
    })

    product = await product.save()
    if (!product){
        return res.status(500).send('O produto nao pode ser criado')
    }

    return res.send(product)
})

export default router