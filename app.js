const express = require('express');
const app = express();
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'market'
});

app.use(express.static('public'));
app.use(express.static('node_modules'));

connection.query('SELECT * FROM goods', function(error, result, fields){
    if(error) throw error;
    console.log(result);
});

app.get('/', function (req, res) {
  res.send('<p>Hello World!</p>');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});