// const productlist = require('./Data/ProductData.js');
// const products = productlist.products;

const fs = require('fs');
const path = require("path");
const productsPath = path.join(__dirname, './Data/ProductData.json');
let products = JSON.parse(fs.readFileSync(productsPath));


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
    return products.filter(product => {return product.category == category});
}

function getCategories() {
    let array = products.map((product) => {
        return {category: product.category};
    })
    let uniqueCategories = [...new Set(array.map(item => item.category))];
    return uniqueCategories;
}


//returns both subcategories and the category they belong to
function getSubCategories() {
    //const result = [];
    let array = products.map((product) => {
        return {
            subcategory: product.subcategory, 
            category: product.category
        };
    })
    const uniqueSub = [];
    const unique = array.filter(e => {
        const isDuplicate = uniqueSub.includes(e.subcategory);

        if (!isDuplicate) {
            uniqueSub.push(e.subcategory);
            return true;
        }
        return false;
    })
    return unique;
}



module.exports = { getProducts, getMultipleProductsInfo, getSingleProductInfo, getCategoryItems, getCategories, getSubCategories};