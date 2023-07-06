const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true});
const connection  = mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database connection established successfully");
});

app.use(require('./routers/auth'));
app.listen(3000, ()=>{
    console.log(`Server is listening to port ${port}`);
});