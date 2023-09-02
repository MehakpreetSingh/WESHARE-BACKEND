const mongoose=require('mongoose')
const mongoURI="mongodb+srv://mehakbrar811:mehak%40811@cluster0.g6rue.mongodb.net/?retryWrites=true&w=majority"
// const mongoURI="mongodb://localhost:27017/weshare"

const connectToMongo=async ()=>{
    await mongoose.createConnection(mongoURI,()=>{
        console.log("Connected to Mongo Successfully");
    }).asPromise() ;
}
module.exports = connectToMongo ;