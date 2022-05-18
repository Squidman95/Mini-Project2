const hostname = 'localhost';
// const hostname = 'http://127.0.0.1';
const port = 4000;

const express = require('express');
const app = express();
var cors = require('cors')

const productsUtils = require('./ProductsUtils.js');
// import productsUtils from './ProductsUtils';
const customerUtils = require('./CustomerUtils.js');
const basketUtils = require('./BasketUtils.js');

app.use(cors());

// Simple request time logger
app.use((req, res, next) => {
    console.log("A new request received at " + Date.now());
    // This function call tells that more processing is required for the current request and is in the next middlewar function/route handler.
    next();  
});

app.use('/static', express.static('public'));
//  app.use(express.static('files'));

app.listen(port, () => console.log(`[Info] Server listening at http://${hostname}:${port}/`));

// app.get('/', (req, res) => res.send('Hello World!'));

function getAllCustomers(req, res) {

    res.send({hello: 'world'});
}
app.get('/', getAllCustomers);


//PRODUCTS
app.get('/products', (req, res) => {        // Essential
    // res.send('List of products');
    let products = productsUtils.getProducts();
    if (products === null || products === undefined) {
        res.status(500).send('The puppies got loose in the server, so the server is down');
    } else {
        res.status(200).send(products);
    }
});

app.get('/products/info', (req, res) => {   // Essential
    let productsInfo = productsUtils.getMultipleProductsInfo();
    if (productsInfo === null || productsInfo === undefined) {
        res.status(500).send('The puppies got loose in the server, so the server is down');
    } else {
        res.status(200).send(productsInfo); 
    }
});

app.get('/products/:productID', (req, res) => { // Essential
    let product = productsUtils.getSingleProductInfo(req.params.productID);
    if (product === null || product === undefined) {
        res.status(404).send('Product does not exist');
    } else {
        res.status(200).send(product);
    }
});

app.get('/categories', (req, res) => { // Essential
    let productsCat = productsUtils.getCategories();
    if (productsCat === null || productsCat === undefined) {
        res.status(404).send('Category does not exist');
    } else {
        res.status(200).send(productsCat);
    }
});

app.get('/products/category/:category', (req, res) => { // Essential
    let categories = productsUtils.getCategoryItems(req.params.category);
    if (categories === null || categories === undefined) {
        res.status(500).send('The kitties decided to take a nap, so the server is down');
    } else {
        res.status(200).send(categories);
    }
});

//CUSTOMERS
app.get('/customers', (req,res) => {                    // Non-Essential
    let customers = customerUtils.getAllCustomers();
    if (customers === null || customers === undefined ) {
        res.status(404).send('No customers exists');
    } else {
        res.send(customers);
    }
});

app.get('/customers/:customerId', (req,res) => {        // Essential
    let customer = customerUtils.getCustomerInfo(req.params.customerId);
    if(customer === null || customer === undefined ) {
        res.status(404).send('Customer does not exist');
    } else {
        res.status(200).send(customer);
    }
});

app.put('/customers/:customerId/:name/:email/:password', (req,res) => {        // Non-Essential
    res.send(customerUtils.updateCustomer(req.params.customerId, req.params.name, req.params.email, req.params.password));
});

app.delete('/customers/:customerId', (req,res) => {     // Non-Essential
    res.send(customerUtils.deleteCustomer(req.params.customerId));
});

app.post('/customers/:customerId/:name/:email/:password', (req,res) => {    // Non-Essential
    res.send(customerUtils.createCustomer(req.params.customerId, req.params.name, req.params.email, req.params.password));
});



//BASKET
app.get('/customers/:customerId/basket', (req,res) => {         // Essential
    let basket = basketUtils.getBasket(req.params.customerId);
    if (basket === null || basket === undefined) {
        res.status(404).send('Customer does not exist');
    } else {
        res.status(200).send(basket);
    }
});

app.put('/customers/:customerId/basket/:productId', (req,res) => {  // Essential
    let basketProduct = basketUtils.addItemToBasket(req.params.customerId, req.params.productId);
    if (basketProduct === null || basketProduct === undefined) {
        res.status(404).send('Customer or product does not exists');
    } else {
        res.status(200).send(basketProduct);
    }
});

app.post('/customers/:customerId/basket', (req,res) => {       // Essential
    let basket = basketUtils.createBasket(req.params.customerId);
    if(basket === null || basket === undefined) {
        res.status(404).send('Customer does not exists');
    } else {
        res.status(200).send(basket);
    }
});

app.delete('/customers/:customerId/basket/:productId', (req,res) => {   // Essential
    let basket = basketUtils.deleteProductFromBasket(req.params.customerId, req.params.productId);
    if(basket === null || basket === undefined) {
        res.status(404).send('Customer or product does not exist');
    } else {
        res.status(200).send(basket);
    }
});


// For invalid routes
app.get('*', (req, res) => {
    res.status(404).send('404! This is an invalid URL.');
});


