const express = require('express');
const app = express();

const productRouter = require('./router/products.router')
const cartRouter = require('./router/cart.router')







app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter );


app.listen(8080 , () => { console.log('Server is running on port 8080') })
