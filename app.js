var express = require('express');
var app = express();

app.use(express.static(__dirname + '/assets'));
app.set('view engine', 'ejs');


app.get('/', function(req, res){
    res.redirect('/home');
});

app.get('/home', function(req,res){
    res.render('index.ejs');

});
app.get('/index.ejs', function(req,res){
    res.redirect('/home');

});















app.listen(3003);
