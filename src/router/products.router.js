const express = require('express');
const router = express.Router();
const fs = require('fs');

let products = [];
let productId = 1;

router.get('/', (req, res) => {
     fs.writeFile('./products.json', JSON.stringify(products), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error al escribir en el archivo JSON');
      } else {
        res.send({products});
      }
    });
  });
  
  // Ruta para obtener un producto por su ID
  router.get('/:pid', (req, res) => {
    const productId = req.params.id;
     fs.writeFile('./products.json', JSON.stringify(products), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error al escribir en el archivo JSON');
      } else {
        res.send({productId});
      }
    });
  });

  router.post('/', express.json(), (req, res) =>  {
  const product = {
    id: productId++,
    title: req.body.title,
    description: req.body.description,
    code: req.body.code,
    price: req.body.price,
    status: req.body.status,
    stocks: req.body.stocks,
    category: req.body.category,
    thumbnails: req.body.thumbnails
  };
    products.push(product);
    fs.writeFile('./products.json', JSON.stringify(products), (err) => {  
        if (err) {
            console.error(err);
            res.status(500).send('Error al escribir en el archivo JSON');
        } else {
            res.send({products});
            res.status(201).send('Producto creado con éxito');
        }
    })
    });

    router.put('/:pid',(req, res) =>{
    const productId = req.params.id;
    const product = products.find(p => p.id === productId);
    if (product) {  
        product.title = req.body.title;
        product.description = req.body.description;
        product.code = req.body.code;
        product.price = req.body.price;
        product.status = req.body.status;
        product.stocks = req.body.stocks;
        product.category = req.body.category;
        product.thumbnails = req.body.thumbnails;
        fs.writeFile('./products.json', JSON.stringify(products), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error al escribir en el archivo JSON');
            } else {
                res.send({products});
                res.status(201).send('Producto actualizado con éxito');
            }
        })
      }
    });
    
    router.delete('/:pid', (req, res) => {
    const productId = req.params.id;
    const product = products.find(p => p.id === productId);
    if (product) {
        products = products.filter(p => p.id !== productId);
        fs.writeFile('./products.json', JSON.stringify(products), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error al escribir en el archivo JSON');
            } else {
                res.send({products});
                res.status(201).send('Producto eliminado con éxito');
            }
        })
    }
    });
    
        
  module.exports = router