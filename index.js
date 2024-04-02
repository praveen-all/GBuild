const express=require("express");
const app=express();


const PORT=process.env.PORT|8080;


// create server


app.listen(PORT,()=>{
    console.log(`server start listen on port ${PORT}`);
})