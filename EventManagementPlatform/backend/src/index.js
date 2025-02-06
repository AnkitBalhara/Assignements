import express from "express";

const app = express();

app.get("/",(req,res)=>{
    res.send("Jai Shree Ram")
})

app.listen(3000,()=>{
    console.log("Server Started")
})