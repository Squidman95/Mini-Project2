// const productData = require('ProductData./Data/js');

const fs = require('fs');
const path = require("path");
// const basketPath = path.join(__dirname, './Data/Basket.json');
const productsPath = path.join(__dirname, './Data/ProductData.json');
const userDataPath = path.join(__dirname, './Data/UserData.json');

let products = JSON.parse(fs.readFileSync(productsPath));


function getBasket(uuid){
    let data = JSON.parse(fs.readFileSync(userDataPath));
    return data.filter(basket => {return basket.id == uuid})[0];
}

function createBasket(uuid){
    let newUserBasket = {
        id: uuid,
        user: {
            fname: null,
            lname: null,
            email: null,
            password: null
        },
        items: [],
    };

    let json = JSON.parse(fs.readFileSync(userDataPath, {encoding:'utf8', flag:'r'}));

    let basket = json.filter(b => {return b.id == uuid})[0];
    if(basket === undefined) {
        basket = newUserBasket;
        json.push(basket);
        fs.writeFileSync(userDataPath, JSON.stringify(json, null, 2));
    }
    console.log(basket);
    return basket;
}

function addItemToBasket(uuid, productId, amount = null){
    console.log(`Received request to PUT item ${productId} in basket for UID ${uuid}`);
    let item = getItemSimple(productId);
    let json = JSON.parse(fs.readFileSync(userDataPath, {encoding:'utf8', flag:'r'}));
    let basket = json.filter(b => {return b.id == uuid})[0];
    const index = json.map(b => b.id).indexOf(uuid);
    basket.items.push(item);
    json[index] = basket;
    fs.writeFileSync(userDataPath, JSON.stringify(json, null, 2));
    return basket;
}

function deleteProductFromBasket(uuid, productId){
    let item = products.filter(product => {return product.id == productId})[0];
    let json = JSON.parse(fs.readFileSync(userDataPath, {encoding:'utf8', flag:'r'}));
    let basket = json.filter(b => {return b.id == uuid})[0];
    const index = json.map(b => b.id).indexOf(uuid);
    removeById(basket.items, item.id);
    json[index] = basket;
    fs.writeFileSync(userDataPath, JSON.stringify(json, null, 2));
    return item;
}

// Just utility functions, not queries
const removeById = (jsonArray, itemId) => {
    const index = jsonArray.findIndex(element => {
        return element.id === String(itemId);
    });
    if(index === -1){
        return false;
    };
    return !!jsonArray.splice(index, 1);
};
function getItemSimple(productId){
    let product = products.filter(product => {return product.id == productId})[0];
    let simpleItem = {
        name: product.name,
        id: product.id,
        price: product.price,
        image: product.image
    }
    return simpleItem;
}


module.exports = { getBasket, createBasket, addItemToBasket, deleteProductFromBasket };
