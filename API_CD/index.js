const _expressPackage = require("express");  
const _bodyParserPackage = require("body-parser");  
//Initilize app with express web framework  
const app = _expressPackage();  
//To parse result in json format  
app.use(_bodyParserPackage.json()); 
app.use(_bodyParserPackage.urlencoded({extended: true }));  
// Connection string parameters.
app.use(function (req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");  
    next();  
});  
//middware require router
const userRoute = require('./Controller/Users')
const loginRoute = require('./Controller/Login')
const staffRoute = require('./Controller/Staff')
app.use('/users', userRoute);
app.use('/login',loginRoute);
app.use('/staff',staffRoute);
  
//Lets set up our local server now.  
const server = app.listen(process.env.PORT || 3001, function () {  
    const port = server.address().port;  
    console.log("App now running on port", port);  
});  
  
//Set up your sql connection string, i am using here my own, you have to replace it with your own.  

  
//Function to connect to database and execute query  

  
//GET API  

