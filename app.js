var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/assets'));
app.set('view engine', 'ejs');
var dbConf= require('./controllers/dbConf');
const { query } = require('express');
var nodemailer = require('nodemailer');


app.get('/', function(req, res){
    res.render('index');
});
app.get('/home',function(req,res)
{
    res.redirect('/');
})
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
    console.log(req.body);
    var name=req.body.name;
    var email=req.body.email;
    var sub=req.body.subject;
    var message=req.body.message;
    var mailText= "Name: "+name;
    mailText+="\nEmail: "+email;
    mailText+="\nSubject: "+sub;
    mailText+="\nMessage: "+message;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'jaseemabdul789@gmail.com',
        pass: 'tqevbfhhlttpoqse'
        }
    });
    
    var mailOptions = {
        from: 'jaseemabdul789@gmail.com',
        to: 'jaseemabdul20@gmail.com',
        subject: 'Portfolio Contact',
        text: mailText
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });

    var query="insert into contactMe Values('"+name+"','"+email+"','"+sub+"','"+message+"')"
    dbConf.query(query,function(err,res,fields)
    {
        if(err) throw err;
        console.log(query);
    });


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


app.listen(3003);
