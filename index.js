const express = require('express') ;
const connectToMongo = require('./dbconnect') ;
const cors = require('cors') ;
const bodyParser = require('body-parser') ;
const PORT = process.env.PORT || 5000 ;


connectToMongo()
const app = express() ;
app.use(bodyParser.json({ limit: '30mb', extended: true })) ;
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true })) ;
app.use(express.json()) ;
app.use(cors()) ;

app.use('/posts' ,require('./routes/posts') )
app.use('/auth' ,require('./routes/auth') )


app.listen(PORT , () => {
    console.log(`The iNotebook backend application is listening at http://localhost:${PORT}`);
})
