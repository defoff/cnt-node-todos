var express = require('express');
var bodyParser = require('body-parser');

var request = require('request');

var app = express();

app.use(bodyParser.json());

app.get('/', function (req, res) {

});



app.listen(3000, function () {
    console.log('Started on port 3000');
});