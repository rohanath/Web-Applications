var express = require('express');
var app = express();
var pathController = require("./Controller/pathController");

app.set('view engine','ejs');

app.use(express.static('./public'));
pathController(app);

//app.get('/', function(req,res){
//  res.sendFile(__dirname + '/calc.html');
//});

app.listen(1234);
console.log("Listening at 1234....");
