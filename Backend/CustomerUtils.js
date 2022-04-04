const userData = require('./Data/UserData.js');
const users = userData.customers;

const fs = require('fs');
const path = require("path");
const userDataPath = path.join(__dirname, './Data/UserData.json');

function getCustomerInfo(uuid){
    let data = JSON.parse(fs.readFileSync(userDataPath));
    return data.filter(user => user.id == uuid)[0];
}

function createCustomer(uuid, name, email, password){
    const newUser = {
        id: uuid,//Math.floor(Math.random() * 100),
        name: name,
        email: email,
        password: password,
    }

    fs.readFile(userDataPath, function (err, data) {
        let json = JSON.parse(data);
        let user = json.filter(u => {return u.id == uuid})[0];
        
        if(user !== undefined) {
            console.log(`Removing old user with id ${uuid}`);
            removeById(json, uuid);
        }
        json.push(newUser);
        fs.writeFile(userDataPath, JSON.stringify(json, null, 2), function(err){
            if (err) throw err;
            console.log(`User with id ${uuid} added`);
        });
    });
}

function deleteCustomer(uuid){
    fs.readFile(userDataPath, function (err, data) {
        let json = JSON.parse(data);
        const index = json.map(b => b.id).indexOf(parseInt(uuid));
        json.splice(index, 1);
        fs.writeFile(userDataPath, JSON.stringify(json, null, 2), function(err){
            if (err) throw err;
            console.log('User has been deleted');
        });
    });
}

// function deleteCustomer(uuid){
//     userData.removeCustomer(uuid);
//     return userData.customers;
// }

function updateCustomer(uuid, name, email, password){

    fs.readFile(userDataPath, function (err, data) {
        let json = JSON.parse(data);
        const index = json.map(b => b.id).indexOf(parseInt(uuid));
        json[index].name = name;
        json[index].email = email;
        json[index].password = password;
        fs.writeFile(userDataPath, JSON.stringify(json, null, 2), function(err){
            if (err) throw err;
            console.log('User has been updated');
        });

    });
}

function getAllCustomers(){
    return JSON.parse(fs.readFileSync(userDataPath));
    // return users;
}



module.exports = {getCustomerInfo, createCustomer, deleteCustomer, updateCustomer, getAllCustomers}