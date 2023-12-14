const express = require("express");
const fs = require("fs");
const path = require('path');
const app = express();
const port = 8080;
app.use( function ( req, res, next ) {
 const { url, path: routePath } = req ;
 console.log( 'Request: Timestamp:', new Date().toLocaleString(), ', URL (' + url + '), PATH (' + routePath + ').' ) ;
 next();
});
app.use('/', express.static(path.join(__dirname, '')))
app.listen(port, () => {
 console.log(`Server running on port ${port}...`)
}); 

app.get('/api/v1/listUsers', function(req, res) {
    fs.readFile(__dirname + "/data/" + "users.json", 'utf8', function(err, data){
    console.log(data);
    res.end(data);
    });
}); 

app.delete('/api/v1/deleteUser', function(req, res){
    fs.readFile(__dirname + "/data/" + "users.json", 'utf8', function(err, data){
    data = JSON.parse(data);
    delete data["user"+req.query["user"]];
    fs.writeFile(__dirname + "/data/users.json", JSON.stringify(data), err => {
    if (err) {
    console.error(err);
    return;
    }
    });
   
    console.log(data);
    res.end(JSON.stringify(data));
    });
}); 

   //add a user 
app.post('/api/v1/addUser', function(req, res){
    fs.readFile(__dirname + "/data/" + "users.json", 'utf8', function(err, data){
        data = JSON.parse(data);
        const newUser = {
            name: req.query["name"],
            password: req.query["password"],
            profession: req.query["profession"],
            id: req.query["user"]
        }
        uID = "user"+req.query["user"]
        data[uID] = newUser
        console.log(data);
        fs.writeFile(__dirname + "/data/users.json", JSON.stringify(data), err => {
            if (err) {
               console.error(err);
            return;
            }
            console.log(data);
            res.end(JSON.stringify(data));
        });

        console.log(data);
    });
});


//filter the list of users so the server only sends information for the user you specify 
app.get('/api/v1/filterUser', function(req, res){
    fs.readFile(__dirname + "/data/" + "users.json", 'utf8', function(err, data){
        data = JSON.parse(data);
        var userVal = "user" + req.query["user"];
        if (data[userVal]) {
            res.end(JSON.stringify(data[userVal]));
            console.log(data[userVal]);
        }
    });
});