const productlist = require('./Data/ProductData.js');
const products = productlist.products;

function getProducts(){
    return products;
}

function getMultipleProductsInfo(){
    return products.map((product) => {
        return {name: product.name, price: product.price};
    })
}

function getSingleProductInfo(itemId){
    return products.filter(product => product.id === itemId);
}

function getCategoryItems(category){
    return products.filter(product => product.category === category);
}

function getCategories() {
    let array = products.map((product) => {
        return {category: product.category};
    })
    let categoriesArray = [new Set(array)];
    return categoriesArray;
}

module.exports = { getProducts, getMultipleProductsInfo, getSingleProductInfo, getCategoryItems };