import Order from '../models/order.js'
import express from 'express'
import mongoose from 'mongoose'
const router = express.Router()

router.get('/' , async (req , res) => {
    const orderList = await Order.find()

    if (!orderList){
        res.status(500).json({success:false})
    }
    res.send(orderList)
})

export default router