const mongoose=require('mongoose')
// const mongoURI="mongodb+srv://user1:user2002@cluster0.g6rue.mongodb.net/?retryWrites=true&w=majority"
const mongoURI="mongodb+srv://huhululu765:pGeOB1v3UqmakSdb@weshare.xvxmem7.mongodb.net/"
// const mongoURI='mongodb://127.0.0.1:27017/weShare'



const connectToMongo=  ()=>{
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    const db = mongoose.connection;
    db.once('open', () => {
        console.log('Connected to MongoDB');
      });
      
      // Event handling for connection errors
      db.on('error', (err) => {
        console.error('MongoDB connection error:', err);
      });
      
      // Event handling for when the connection is closed
      db.on('disconnected', () => {
        console.log('MongoDB connection disconnected');
      });
}

module.exports = connectToMongo;