const mongoose = require('mongoose');

const  connect_to_mongo = () =>{
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("successfully connected to DB ..."))
    .catch(() => console.log("Something went wrong",Error))
    
} 
module.exports = connect_to_mongo ;