var express = require('express');
var router = express.Router();
const Validator = require('fastest-validator');

const { Product } = require('../models');

const v = new Validator();

router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.post('/', async (req, res) => {
    const schema = {
        name: 'string',
        brand: 'string',
        description: 'string|optional'
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json(validate);
    }

    try {
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const schema = {
            name: 'string|optional',
            brand: 'string|optional',
            description: 'string|optional'
        };

        const validate = v.validate(req.body, schema);

        if (validate.length) {
            return res.status(400).json(validate);
        }

        const updatedProduct = await product.update(req.body);
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) =>{
    const id = req.params.id;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

    await product.destroy();

    res.json({
        message:'Product is delete'
    });
});

module.exports = router;
