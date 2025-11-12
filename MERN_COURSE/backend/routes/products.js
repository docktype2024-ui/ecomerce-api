
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

router.post(`/`, (req, res) => {
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

export default router