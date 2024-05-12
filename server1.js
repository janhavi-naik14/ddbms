var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://0.0.0.0:27017/Database1')
var db=mongoose.connection
db.on('error',()=> console.log("Error in Connecting to Database"))
db.once('open',()=> console.log("Connected to Database"))

app.post("/sign_up",(req,res) => {
    // Extract data from the request body
    var name = req.body.name;
   
    var email = req.body.email;
  
    var password = req.body.password;

    // Create an object to hold the data
    var data = {
        "name": name,
        "email": email,
        "password": password
    };

    // Insert the data into the 'users' collection
    db.collection('users').insertOne(data, (err, collection) => {
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
        // Redirect to the login page after successful signup
        return res.redirect('login1.html');
    });
});
app.get("/",(req,res) => {
    res.set({
        "Allow-acces-Allow-Origin":'*'
    })
    return res.redirect('login.html')

}).listen(3001);
console.log("Listening on port 3001")

