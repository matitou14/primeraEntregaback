const express = require('express');
const cartRouter = express.Router();
const fs = require('fs');
const path = require('path');

const cartFile = path.join(__dirname, '../data/carts.json');
const productFile = path.join(__dirname, '../data/products.json');

let carts = [];
let count = 1;

function getCarts() {
    const data = fs.readFileSync(cartFile);
    const carts = JSON.parse(data);
    return carts;
}

function getCartById(cartId) {
    const carts = getCarts();
    const cart = carts.find(c => c.id === cartId);
    return cart;
}

function getProducts() {
    const data = fs.readFileSync(productFile);
    const products = JSON.parse(data);
    return products;
}

function getProductById(productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    return product;
}

cartRouter.post('/', (req, res) => {
    const newId = count++;
    const newCart = { id: newId, products: [] };
    carts.push(newCart);
    fs.writeFileSync(cartFile, JSON.stringify(carts, null, 2));
    res.status(201).json(newCart);
});


cartRouter.get('/:cid', (req, res) => {
    const { cid } = req.params;
    const cart = getCartById(parseInt(cid));
    if (cart) {
      res.json(cart.products);
    } else {
      res.status(404).send('Cart not found');
    }
  });



cartRouter.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cart = getCartById(parseInt(cid));
    if (!cart) {
        res.status(404).send('Cart not found');
        return;
    }

    const product = getProductById(parseInt(pid));
    if (!product) {
        res.status(404).send('Product not found');
        return;
    }

    const existingProduct = cart.products.find(p => p.id === pid);
    if (existingProduct) {
        existingProduct.quantity += parseInt(quantity);
    } else {
        const newProduct = { id: pid, quantity: parseInt(quantity) };
        cart.products.push(newProduct);
    }

    fs.writeFileSync(cartFile, JSON.stringify(carts, null, 2));
    res.status(201).json(cart);
});

module.exports = cartRouter;