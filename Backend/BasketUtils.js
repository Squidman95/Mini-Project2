const Basket = require('./Data/Basket.js');
const ProductData = require('./Data/ProductData.js');
const fs = require('fs');
const path = require("path");
const basketPath = path.join(__dirname, './Data/Basket.json');

function getBasket(uuid){
    console.log(uuid);
    let data = JSON.parse(fs.readFileSync(basketPath));
    return data.filter(basket => {return basket.id == uuid})[0];
}

function createBasket(uuid){
    const basket = {
        id: uuid,
        items : [],
    };

    fs.readFile(basketPath, function (err, data) {
        let json = JSON.parse(data);
        json.push(basket);
        fs.writeFile(basketPath, JSON.stringify(json), function(err){
          if (err) throw err;
          console.log('Basket added!');
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

        // let trendString = JSON.stringify(trendJson, null, 2);

        fs.writeFile(basketPath, JSON.stringify(json, null, 2), function(err){
          if (err) throw err;
          console.log('Basket updated!');
        });

    });
}

function deleteProductFromBasket(uuid, item){
    Basket.removeFromBasket(uuid, item);
}

module.exports = { getBasket, createBasket, addItemToBasket, deleteProductFromBasket };