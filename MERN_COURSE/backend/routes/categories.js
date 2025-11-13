import Category from '../models/category.js'
import express from 'express'
import mongoose from 'mongoose'
const router = express.Router()

router.get('/', async (req, res) => {
    const categoryList = await Category.find()

    if (!categoryList) {
        res.status(500).json({ success: false })
    }
    res.status(200).send(categoryList)
})

router.get('/:id' , async (req , res) => {
    const category = await Category.findById(req.params.id)

    if (!category) {
        res.status(500).json({ success: false })
    }
    res.status(200).send(category)
})

router.put('/:id' , async(req,res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color,
        },
        { new: true } // retorna o documento atualizado
    )
    if (!category)
        return res.status(404).send('A categoria nao pode ser criada')

    res.send(category)
})

router.post('/', async (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
    })

    category = await category.save()

    if (!category)
        return res.status(404).send('A categoria nao pode ser criada')

    res.send(category)
})

router.delete('/:id', (req, res) => {
    Category.findByIdAndDelete(req.params.id)
        .then((category) => {
            if (category) {
                res.status(200).json({
                    success: true,
                    message: 'A categoria foi deletada',
                })
            } else {
                res.status(404).json({
                    success: false,
                    message: 'A categoria nao foi encontrada',
                })
            }
        })
        .catch((err) => {
            res.status(400).json({ success: false, error: err })
        })
})

export default router
