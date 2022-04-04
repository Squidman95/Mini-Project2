const userData = require('./Data/UserData.js');
const users = userData.customers;

function getCustomerInfo(uuid){
    return users.filter(user => user.id == uuid);
}

function createCustomer(name, email, password){
    const newUser = {
        id: createUniqID(),
        name: name,
        email: email,
        password: password,
    }
    userData.addCustomer(newUser);
}

function deleteCustomer(uuid){
    userData.removeCustomer(uuid);
    return userData.customers;
}

function updateCustomer(uuid, name, email, password){
    if (users.filter(user => user.id == uuid)) {
        const user = users.filter(user => user.id == uuid);
        user.name = name;
        user.email = email;
        user.password = password;
        return "Update Succesfull";
    } else {
        return "Error: User not found"
    }
}

function getAllCustomers(){
    return users;
}

function createUniqID(){
    return Math.floor(Math.random() * 100) + (new Date()).getTime();
}



module.exports = {getCustomerInfo, createCustomer, deleteCustomer, updateCustomer, getAllCustomers}