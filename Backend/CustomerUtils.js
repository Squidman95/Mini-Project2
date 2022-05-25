const fs = require('fs');
const path = require("path");
const userDataPath = path.join(__dirname, './Data/UserData.json');

function createCustomer(userData){
    let uuid = userData.id;
    let json = JSON.parse(fs.readFileSync(userDataPath, {encoding:'utf8', flag:'r'}));
    console.log("Checking if user exists in database:");
    let user = json.filter(u => {return u.id == uuid})[0];
    if(user !== undefined) {
        let index = json.findIndex(function(item, i) {
            return item.id === uuid;
        });
    
        json[index].user = {
            fname: userData.fname,
            lname: userData.lname,
            email: userData.email,
            password: userData.password,
        };
    }
    else {
        console.log("No user/basket exists. THIS SHOULDN'T HAPPEN. Creating a new one anyway.");
        let newUserBasket = {
            id: uuid,
            user: {
                fname: userData.fname,
                lname: userData.lname,
                email: userData.email,
                password: userData.password,
            },
            items: [],
        };
        json.push(newUserBasket);
    }
    fs.writeFileSync(userDataPath, JSON.stringify(json, null, 2));
}

function login(userData){
    let jsonData = JSON.parse(fs.readFileSync(userDataPath, {encoding:'utf8', flag:'r'}));
    let loginResp = {
        userID: null
    };
    jsonData.forEach(item => {
        if (item.user.fname === userData.fname && 
            item.user.lname === userData.lname && 
            item.user.email === userData.email && 
            item.user.password === userData.password) {
                loginResp.userID = item.id;
                return loginResp;
        }
    });
    return loginResp; // loginResp.userID should be null here
}

// Just a utility function, not a query
// const removeById = (jsonArray, itemId) => {
//     const index = jsonArray.findIndex(element => {
//         return element.id === String(itemId);
//     });
//     if(index === -1){
//         return false;
//     };
//     return !!jsonArray.splice(index, 1);
// };

module.exports = {createCustomer, login}

// function getCustomerInfo(uuid){
//     let data = JSON.parse(fs.readFileSync(userDataPath));
//     return data.filter(user => user.id == uuid)[0];
// }

// function deleteCustomer(uuid){
//     fs.readFile(userDataPath, function (err, data) {
//         let json = JSON.parse(data);
//         const index = json.map(b => b.id).indexOf(parseInt(uuid));
//         json.splice(index, 1);
//         fs.writeFile(userDataPath, JSON.stringify(json, null, 2), function(err){
//             if (err) throw err;
//             console.log('User has been deleted');
//         });
//     });
// }

// function updateCustomer(uuid, fname, lname, email, password){
//     fs.readFile(userDataPath, function (err, data) {
//         let json = JSON.parse(data);
//         const index = json.map(b => b.id).indexOf(parseInt(uuid));
//         json[index].fname = fname;
//         json[index].lname = lname;
//         json[index].email = email;
//         json[index].password = password;
//         fs.writeFile(userDataPath, JSON.stringify(json, null, 2), function(err){
//             if (err) throw err;
//             console.log('User has been updated');
//         });
//     });
// }

// function getAllCustomers(){
//     return JSON.parse(fs.readFileSync(userDataPath));
// }

// module.exports = {createCustomer, login, getCustomerInfo, deleteCustomer, updateCustomer, getAllCustomers}