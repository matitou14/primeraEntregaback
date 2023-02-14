const express = require('express');
const app = express();

const productsRouter = require('./router/products.router')
const cartsRouter = require ('./router/cart.router')







app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter );


app.listen(8080 , () => { console.log('Server is running on port 8080') })
