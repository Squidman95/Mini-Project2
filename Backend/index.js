const hostname = 'localhost';
// const hostname = 'http://127.0.0.1';
const port = 4000;

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
var cors = require('cors')

const productsUtils = require('./ProductsUtils.js');
const customerUtils = require('./CustomerUtils.js');
const basketUtils = require('./BasketUtils.js');
const path = require('path');

app.use(cors());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.json({extended: false}));

// Simple request time logger
app.use((req, res, next) => {
    console.log("A new request received at " + Date.now());
    // This function call tells that more processing is required for the current request and is in the next middlewar function/route handler.
    next();  
});

app.listen(port, () => console.log(`[Info] Server listening at http://${hostname}:${port}/`));

function getAllCustomers(req, res) {
    res.send({hello: 'world'});
}
app.get('/', getAllCustomers);


//BASKET
app.get('/basket/:customerId', (req,res) => {
    let basket = basketUtils.getBasket(req.params.customerId);
    if (basket === null || basket === undefined) {
        res.status(404).send('Customer does not exist');
    } else {
        res.status(200).send(basket);
    }
});

app.post('/basket/:customerId', (req,res) => {
    let basket = basketUtils.createBasket(req.params.customerId);
    // if(basket === null || basket === undefined) {
    //     res.status(404).send('Customer does not exists');
    // } else {
        res.status(200).send(basket);
    // }
});

app.put('/basket/:customerId/:productId', (req,res) => {
    let basketProduct = basketUtils.addItemToBasket(req.params.customerId, req.params.productId);
    if (basketProduct === null || basketProduct === undefined) {
        res.status(404).send('Customer or product does not exists');
    } else {
        res.status(200).send(basketProduct);
    }
});


app.delete('/basket/:customerId/:productId', (req,res) => {
    let basket = basketUtils.deleteProductFromBasket(req.params.customerId, req.params.productId);
    if(basket === null || basket === undefined) {
        res.status(404).send('Customer or product does not exist');
    } else {
        res.status(200).send(basket);
    }
});

//CUSTOMERS
// Signup
app.post('/customers/signup', (req,res) => {
    res.send(customerUtils.createCustomer(req.body));
});

// Login
app.post('/customers/login', (req,res) => {
    let loginResp = customerUtils.login(req.body);
    if (loginResp.userID === null) {
        console.log("Unable to find user with specified login details");
        loginResp = {
            err: 'Invalid login info'
        };
        res.status(403).send(loginResp);
    }
    else {
        console.log(`Found user, returning userID: ${loginResp.userID}`);
        res.status(200).send(loginResp);
    }
});

//PRODUCTS
app.get('/products', (req, res) => {
    let products = productsUtils.getProducts();
    if (products === null || products === undefined) {
        res.status(500).send('The puppies got loose in the server, so the server is down');
    } else {
        res.status(200).send(products);
    }
});

app.get('/animals', (req, res) => {
    let productsAnimal = productsUtils.getAnimals();
    if (productsAnimal === null || productsAnimal === undefined) {
        res.status(404).send('Category does not exist');
    } else {
        res.status(200).send(productsAnimal);
    }
});

app.get('/categories', (req, res) => {
    let productsCat = productsUtils.getCategories();
    if (productsCat === null || productsCat === undefined) {
        res.status(404).send('Category does not exist');
    } else {
        res.status(200).send(productsCat);
    }
});

app.get('/subcategories', (req, res) => {
    let productsSubCat = productsUtils.getSubCategories();
    if (productsSubCat === null || productsSubCat === undefined) {
        res.status(404).send('SubCategory does not exist');
    } else {
        res.status(200).send(productsSubCat);
    }
});

app.get('/products/:productID', (req, res) => {
    let product = productsUtils.getSingleProductInfo(req.params.productID);
    if (product === null || product === undefined) {
        res.status(404).send('Product does not exist');
    } else {
        res.status(200).send(product);
    }
});



// For invalid routes
app.get('*', (req, res) => {
    res.status(404).send('404! This is an invalid URL.');
});



// UNUSED CUSTOMER QUERIES
// app.get('/customers', (req,res) => {                    // Non-Essential
//     let customers = customerUtils.getAllCustomers();
//     if (customers === null || customers === undefined ) {
//         res.status(404).send('No customers exists');
//     } else {
//         res.send(customers);
//     }
// });

// app.get('/customers/:customerId', (req,res) => {        // Essential
//     let customer = customerUtils.getCustomerInfo(req.params.customerId);
//     if(customer === null || customer === undefined ) {
//         res.status(404).send('Customer does not exist');
//     } else {
//         res.status(200).send(customer);
//     }
// });

// app.put('/customers/:customerId/:fname/:lname/:email/:password', (req,res) => {        // Non-Essential
//     res.send(customerUtils.updateCustomer(req.params.customerId, req.params.fname, req.params.lname, req.params.email, req.params.password));
// });

// app.delete('/customers/:customerId', (req,res) => {     // Non-Essential
//     res.send(customerUtils.deleteCustomer(req.params.customerId));
// });


// UNUSED PRODUCT QUERIES
// app.get('/products/info', (req, res) => {   // Essential
//     let productsInfo = productsUtils.getMultipleProductsInfo();
//     if (productsInfo === null || productsInfo === undefined) {
//         res.status(500).send('The puppies got loose in the server, so the server is down');
//     } else {
//         res.status(200).send(productsInfo); 
//     }
// });


// app.get('/products/category/:category', (req, res) => { // Essential
//     let categories = productsUtils.getCategoryItems(req.params.category);
//     if (categories === null || categories === undefined) {
//         res.status(500).send('The kitties decided to take a nap, so the server is down');
//     } else {
//         res.status(200).send(categories);
//     }
// });