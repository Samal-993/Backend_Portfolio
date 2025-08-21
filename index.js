const express = require("express")
const mongoose = require("mongoose")
const Info = require("./model/info.js")
const cors = require("cors")
const app = express()

const MONGO_URL = "mongodb://127.0.0.1:27017/portfolio";


//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())


//Connect to MongoDB
async function main(){
     await mongoose.connect(MONGO_URL)

}

main()
.then(() => {
    console.log("Mongoose Connected");
    
})
.catch((err) => {
    console.log(err);
    
})

app.post('/info' , async(req , res) => {
    try{
        const {name, email, number, message} = req.body;
        const newInfo = new Info({name, email , number , message});
        await newInfo.save();
        res.status(200).json({message:"Form submitted successfully"})


    } catch (error) {
  console.error("Error saving form:", error); // Show full error in console
  res.status(500).json({
    message: "Server Error",
    error: error.message || error, // Send readable error to frontend
  });
}
})
app.listen(5000 , ()=> {
    console.log('Server is running on port 5000');
    
})