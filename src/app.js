const express = require('express');
const app = express();

const productRouter = require('./router/products.router')







app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', productRouter);
// app.use('/api/carts', cartsRouter );


app.listen(8080 , () => { console.log('Server is running on port 8080') })
