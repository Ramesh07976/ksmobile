const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer =require('nodemailer');


app.use(bodyParser.urlencoded({extended:true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');


app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.render('home');
});

app.post('/send-mail',(req,res)=>{
    var transporter =nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'mylearningraja@gmail.com',
            pass:'*kumar123456*'
        }
    });

	var maillist = ['ramesharisen@gmail.com', 'excellencecoding@gmail.com'];
	var subject = 'New Enq ... ';
    	var mailOptions = {

    		from: 'ramesh kumar <mylearningraja@gmail.com>',
			to: maillist,
			subject: subject,
    		text: 'You have a submission with the following details... Name: '+req.body.name+'Email: '+req.body.email+ 'Contact No :'+req.body.mobile+ 'Message: '+req.body.message,
			html: '<p>You have a submission with the following details...</p><ul><li>Name: ' + req.body.name + '</li><li>Email: ' + req.body.email + '</li> <li>Contact No: ' + req.body.mobile + '</li> <li>Message: ' + req.body.message + '</li></ul>'
			
};


  	transporter.sendMail(mailOptions, function(error, info){
  		if(error){
  			console.log(error);
  			res.redirect('/');
  		} else {
  			console.log('Message Sent: '+info.response);
  			res.redirect('/');
  		}
  	});
});


app.get('/product',(req,res)=>{
    res.render('product');
});
app.get('/about',(req,res)=>{
    res.render('about');
});
app.get('/contact',(req,res)=>{
    res.render('contact');
});








app.listen(3000,(req,res)=>{
    console.log('server start on port 3000');
})
