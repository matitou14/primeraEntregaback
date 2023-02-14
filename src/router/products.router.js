const express = require('express');
const productRouter = express.Router();

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



  
module.exports = productRouter;