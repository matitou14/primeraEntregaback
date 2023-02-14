const express = require('express');
const cartsRouter = express.Router();
const fs = require('fs');
const path = require('path');
const cartsPath = path.join(__dirname, './carts.json');

let carts = [];

fs.readFile(cartsPath, (err, data) => {
    if (err) throw err;
    carts = JSON.parse(data);
});

const writeToFile = (filePath, data) => {
    fs.writeFile(filePath, JSON.stringify(data), err => {
        if (err) throw err;
    });
};

// Define the "get" route to retrieve a specific cart by ID
cartsRouter.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const cart = carts.find(c => c.id === id);
    res.send(cart);
});

// Define the "post" route to add a product to a cart
cartsRouter.post('/', (req, res) => {
    const id = parseInt(req.params.id);
    const cart = carts.find(c => c.id === id);
    const productId = req.body.productId;
    const product = product.find(p => p.id === productId);
    if (cart && product) {
        cart.products.push(product);
        writeToFile(cartsPath, carts);
        res.send(cart);
    } else {
        res.status(400).send({ error: 'Not found' });
    }
});

module.exports = cartsRouter;
