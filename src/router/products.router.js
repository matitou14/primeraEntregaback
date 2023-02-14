const express = require('express');
const productRouter = express.Router();
const fs = require('fs');
const path = require('path');

const prodfile = path.join(__dirname, '../data/products.json');

const products = []


productRouter.get('/', (req, res) => {
  res.json(products);
});

productRouter.get('/:pid', (req, res) => {
  const { pid } = req.params;
    const product = products.find(p => p.id === parseInt (pid));
    if (product) { res.json(product);
    } else {
        res.status(404).json({message:`Product with ID ${pid} not found` });
    }
});

  productRouter.post('/', (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

  let products = JSON.parse(fs.readFileSync(prodfile));    
  const newId = Math.max(...products.map(p => p.id)) + 1;
    const newProduct = { id: newId, title, description, code, price, status, stock, category, thumbnails };
    products.push(newProduct);
    fs.writeFileSync(prodfile, JSON.stringify(products, null, 2));
    res.status(201).json(newProduct);

});


module.exports = productRouter;