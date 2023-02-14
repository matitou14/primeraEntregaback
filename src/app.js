const express = require('express')
const productsRouter = require ('./router/products.router.js')
const app = express()



let products = []

app.listen(8080 , () => { console.log('Server is running on port 8080') })



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));
app.use('/api/products', productsRouter);
// app.use('/api/carts', cartRouter );

