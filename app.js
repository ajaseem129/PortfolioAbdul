var express = require('express');
var app = express();

app.use(express.static(__dirname + '/assets'));
app.set('view engine', 'ejs');
var dbConf= require('./controllers/dbConf');
const { query } = require('express');

app.get('/', function(req, res){
    res.redirect('/home');
});

app.get('/home', function(req,res){
    res.render('index');

});
app.get('/index', function(req,res){
    res.redirect('/home');

});

app.post('/home/filterList',function(req,res)
{   
    var query= "SELECT distinct category from projectList";
    dbConf.query(query,function(err,result,fields)
    {
        // console.log(result);
        res.send(result);
    });
});
app.post('/home/projectList',function(req,res)
{
    var query= "SELECT * from projectList";
    dbConf.query(query,function(err,result,fields)
    {
        // console.log(result);
        res.send(result);
    });
});
app.post('/forms/contactme', function(req,res)
{
    console.log("sending contact");
});
app.post('/home/portfolio-details/',function(req,res)
{
    
});
app.get('/home/portfolio-details/:prName',function(req,res)
{   
    var Prname = req.params.prName;
    var query ='Select * from projectInfo,projectList where projectInfo.Title="'+Prname+'" AND projectInfo.Title=projectList.Title';
    console.log(query);
    
    dbConf.query(query,function(err,result,fields)
    {
        // console.log(result)
        var res1 = result[0]
        // console.log(res['images[0]'])
        var arr = res1['images'];
        var jso = JSON.parse(arr);
        res.render('portfolio-details.ejs', {results: res1,img: jso});
        // res.render('index.ejs', {active: 'Dashboard',serverStats: result, diskStats:ds});


    });

});


app.listen(3000);
