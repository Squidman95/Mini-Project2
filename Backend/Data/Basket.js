const baskets = [
    {
        id: 0,
        items : [],
    },
    {
        id: 1,
        items : [],
    },
    {
        id: 2,
        items : [],
    },
]

function getBasket(uuid){
    return baskets.filter(basket => {return basket.id == uuid})[0];
}

function addToBasket(uuid, item){
    let basket = getBasket(uuid);
    basket.items.push(item);
}

function removeFromBasket(uuid, itemIdentifier){
    // do stuff
}

function emptyBasket(uuid){
    const basket = getBasket(uuid);
    basket.items = [];
}

function createBasket(uuid){
    const basket = {
        id: uuid,
        items : [
            {
                // item 1
            }
        ],
    };
    baskets.push(basket);
}

module.exports = {getBasket, addToBasket, removeFromBasket, emptyBasket, createBasket}