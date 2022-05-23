const fs = require('fs');
const path = require("path");
const userDataPath = path.join(__dirname, './Data/UserData.json');

function getCustomerInfo(uuid){
    let data = JSON.parse(fs.readFileSync(userDataPath));
    return data.filter(user => user.id == uuid)[0];
}

function createCustomer(uuid, fname, lname, email, password){
    const newUser = {
        id: uuid,
        fname: fname,
        lname: lname,
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

function updateCustomer(uuid, fname, lname, email, password){

    fs.readFile(userDataPath, function (err, data) {
        let json = JSON.parse(data);
        const index = json.map(b => b.id).indexOf(parseInt(uuid));
        json[index].fname = fname;
        json[index].lname = lname;
        json[index].email = email;
        json[index].password = password;
        fs.writeFile(userDataPath, JSON.stringify(json, null, 2), function(err){
            if (err) throw err;
            console.log('User has been updated');
        });

    });
}

function login(fname, lname, email, password){
    let jsonData = JSON.parse(fs.readFileSync(userDataPath));
    // var results = [];
    let loginResp = {
        userID: null
    };
    jsonData.forEach(user => {
        if (user.fname === fname && 
            user.lname === lname && 
            user.email === email && 
            user.password === password) {
            
                // results.push(user);
                loginResp.userID = user.id;
                return loginResp;
        }
    });
    return loginResp; // loginResp.userID should be null here
}

function getAllCustomers(){
    return JSON.parse(fs.readFileSync(userDataPath));
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


module.exports = {getCustomerInfo, createCustomer, deleteCustomer, updateCustomer, login, getAllCustomers}