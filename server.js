const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const bodyParser = require('body-parser');
const { DB_URL } = require('./Configs/db.config');
const { PORT } = require('./Configs/server.config');
const cors = require('cors')

const app = express();

app.use(cors())

mongoose.connect(DB_URL)
.then(()=>{
    console.log("Successfully Connected to DataBase");
})
.catch((err)=>{
    console.log(`Cannot Connect To database`, err);
})

app.use(bodyParser.json());

require('./src/Routes/auth.routes')(app);
require('./src/Routes/movies.routes')(app);
require('./src/Routes/theater.routes')(app);
require('./src/Routes/booking.routes')(app);
require('./src/Routes/payment.routes')(app);


app.listen(PORT,() => {
    console.log(`your application is running on port: ${PORT}`);
});