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
app.set('view engine', 'pug');

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

connection.query('SELECT * FROM goods', function(error, result, fields){
    if(error) throw error;
    // console.log(result);
});

app.get('/', function (req, res) {
  res.render('main', {tess: 'main page'});
});

app.get('/cat', function (req, res) {
  let catId = req.query.id;

  let cat = new Promise((resolve, reject) => {
    connection.query('SELECT * FROM category WHERE id=' + catId, function (error, result, fields) {
      if (error) throw error;
      resolve(result);
    });
  });

  let goods = new Promise((resolve, reject) => {
    connection.query('SELECT * FROM goods WHERE category=' + catId, function(error, result, fields){
      if (error) throw error;
      resolve(result);
    });
  });
  
  Promise.all([cat, goods]).then((values) => {
    //console.log(JSON.parse(JSON.stringify(values[1])));
    res.render('category', {
      cat: JSON.parse(JSON.stringify(values[0])),
      goods: JSON.parse(JSON.stringify(values[1]))
    });
  });
});

app.post('/get-nav-page', function(req, res) {
  connection.query('SELECT id,category FROM category', function(error, result, fields) {
    if (error) throw error;
    res.json(result);
  });
});

app.get('/goods-page', function(req, res){
  let goodsId = req.query.id;
  connection.query('SELECT * FROM goods WHERE id=' + goodsId, function(error, result, fields){
    if (error) throw error;
    console.log(JSON.parse(JSON.stringify(result)));
    res.render('goods_page', {
      one_goods: JSON.parse(JSON.stringify(result))
    });
  });
});

