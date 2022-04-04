const hostname = 'localhost';
// const hostname = 'http://127.0.0.1';
const port = 3000;

const express = require('express');
const app = express();

const productsUtils = require('./ProductsUtils.js');
// import productsUtils from './ProductsUtils';
const customerUtils = require('./CustomerUtils.js');
const basketUtils = require('./BasketUtils.js');

// Simple request time logger
app.use((req, res, next) => {
    console.log("A new request received at " + Date.now());
    // This function call tells that more processing is required for the current request and is in the next middlewar function/route handler.
    next();  
 });

 app.use('/static', express.static('public'));
//  app.use(express.static('files'));

app.listen(3000, () => console.log(`[Info] Server listening at http://${hostname}:${port}/`));

// app.get('/', (req, res) => res.send('Hello World!'));

function getAllCustomers(req, res) {

    res.send({hello: 'world'});
}
app.get('/', getAllCustomers);


//PRODUCTS
app.get('/products', (req, res) => {        // Essential
    // res.send('List of products');
    res.send(productsUtils.getProducts());
});

app.get('/products/info', (req, res) => {   // Essential
    res.send(productsUtils.getMultipleProductsInfo());
});

app.get('/products/:productID', (req, res) => { // Essential
    res.send(productsUtils.getSingleProductInfo(req.params.productID));
});

app.get('categories', (req, res) => { // Essential
    res.send(productsUtils.getCategories());
});

app.get('/products/:category', (req, res) => { // Essential
    res.send(productsUtils.getCategoryItems(req.params.category));
});

//CUSTOMERS
app.get('/customers', (req,res) => {                    // Non-Essential
    res.send(customerUtils.getAllCustomers());
});

app.get('/customers/:customerId', (req,res) => {        // Essential
    res.send(customerUtils.getCustomerInfo(req.params.customerId));
});

app.put('/customers/:customerId', (req,res) => {        // Non-Essential
    res.send(customerUtils.updateCustomer(req.params.customerId));
});

app.delete('/customers/:customerId', (req,res) => {     // Non-Essential
    res.send(customerUtils.deleteCustomer(req.params.customerId));
});

app.post('/customers/:name/:email/:password', (req,res) => {    // Non-Essential
    res.send(customerUtils.createCustomer(req.params.name, req.params.email, req.params.password));
});



//BASKET
app.get('/customers/:customerId/basket', (req,res) => {         // Essential
    res.send(basketUtils.getBasket(req.params.customerId));
});

app.post('/customers/:customerId/basket', (req,res) => {        // Essential
    res.send(basketUtils.createBasket(req.params.customerId));
});

app.put('/customers/:customerId/basket/:productId', (req,res) => {  // Essential
    res.send(basketUtils.addItemToBasket(req.params.customerId, req.params.productID));
});

app.delete('/customers/:customerId/basket/:productId', (req,res) => {   // Essential
    res.send(basketUtils.deleteProductFromBasket(req.params.customerId, req.params.productId));
});


// For invalid routes
app.get('*', (req, res) => {
    res.send('404! This is an invalid URL.');
});
