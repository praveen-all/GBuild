const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('./firebase');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 8000;
const secret = 'your_secret_key';

app.use(cors());
app.use(bodyParser.json());



app.listen(PORT,()=>{
    console.log(`server start listen on port ${PORT}`);
})