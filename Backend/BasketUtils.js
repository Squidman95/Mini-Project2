const Basket = require('./Data/Basket.js');
const ProductData = require('./Data/ProductData.js');

function getBasket(uuid){
    console.log(uuid);
    return Basket.getBasket(uuid);
}

function createBasket(uuid){
    Basket.createBasket(uuid);
}

function addItemToBasket(uuid, productId, amount = null){
    let item = ProductData.products.filter(product => {product.id === productId});
    if(amount !== null){
        for(let i = 0; i < amount; i++){
            Basket.addToBasket(uuid, item);
        }
    }
    else Basket.addToBasket(uuid, item);
}

function deleteProductFromBasket(uuid, item){
    Basket.removeFromBasket(uuid, item);
}

module.exports = { getBasket, createBasket, addItemToBasket, deleteProductFromBasket };