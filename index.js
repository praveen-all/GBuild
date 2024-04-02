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

const AuthRoute = require('./routes/authRoute.js');
const TestRoute=require("./routes/testScoreRoute.js");
const fTrackerRoute = require("./routes/fTrackerRoute.js")
app.use('/auth', AuthRoute);
app.use('/test',TestRoute);
app.use("/expense",fTrackerRoute);

app.listen(PORT,()=>{
    console.log(`server start listen on port ${PORT}`);
})
