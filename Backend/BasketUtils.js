const Basket = require('./Data/Basket.js');
const ProductData = require('./Data/ProductData.js');
const fs = require('fs');
const path = require("path");
const basketPath = path.join(__dirname, './Data/Basket.json');

function getBasket(uuid){
    let data = JSON.parse(fs.readFileSync(basketPath));
    return data.filter(basket => {return basket.id == uuid})[0];
}

function createBasket(uuid){
    const newBasket = {
        id: uuid,
        items : [],
    };

    fs.readFile(basketPath, function (err, data) {
        let json = JSON.parse(data);
        let basket = json.filter(b => {return b.id == uuid})[0];
        
        if(basket !== undefined) {
            console.log(`Removing old basket for user ${uuid}`);
            removeById(json, uuid);
        }
        json.push(newBasket);
        fs.writeFile(basketPath, JSON.stringify(json, null, 2), function(err){
            if (err) throw err;
            console.log(`Basket added for user ${uuid}`);
        });
    });
}

function addItemToBasket(uuid, productId, amount = null){

    let item = ProductData.products.filter(product => {return product.id == productId})[0];

    fs.readFile(basketPath, function (err, data) {

        let json = JSON.parse(data);
        let basket = json.filter(b => {return b.id == uuid})[0];
        const index = json.map(b => b.id).indexOf(uuid);

        basket.items.push(item);
        json[index] = basket;    

        fs.writeFile(basketPath, JSON.stringify(json, null, 2), function(err){
            if (err) throw err;
            console.log('Basket updated!');
        });

    });
}

function deleteProductFromBasket(uuid, productId){
    
    let item = ProductData.products.filter(product => {return product.id == productId})[0];

    fs.readFile(basketPath, function (err, data) {
        let json = JSON.parse(data);
        let basket = json.filter(b => {return b.id == uuid})[0];
        const index = json.map(b => b.id).indexOf(uuid);

        removeById(basket.items, item.id);
        json[index] = basket;    

        fs.writeFile(basketPath, JSON.stringify(json, null, 2), function(err){
            if (err) throw err;
            console.log('Item deleted from basket!');
        });

    });
}

const removeById = (jsonArray, itemId) => {
    const index = jsonArray.findIndex(element => {
        return element.id === String(itemId);
    });
    if(index === -1){
        return false;
    };
    return !!jsonArray.splice(index, 1);
};

module.exports = { getBasket, createBasket, addItemToBasket, deleteProductFromBasket };