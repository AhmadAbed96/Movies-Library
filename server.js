const express = require ("express");
const app = express();
const Port = 3000;

const data = require("./Movie Data/data.json")
app.listen(Port,() =>{
    console.log(`the server listen to ${Port}`)
} )

//routes
app.get("/",homeHandler)
app.get("/favorite",handler)
app.get("*" , handleNotFound)



//functions

function homeHandler(req,res){
    let dataMovie = [];
     newMovie = new Movie(data.title,data.poster_path,data.overview)

     res.json(newMovie)
}

function handler(req,res) {
    res.send("Wellcome to favorite page")
}

function Movie(title,poster_path,overview){
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview
}

function handleNotFound(req,res){
    res.status(404).send("Not found")
}
app.get("/",(req,res) => res.send("500 error"))
app.use(function(err , req , res ,text){
    res.type("text/plain");
    res.status(500);
    res.send("Sorry, something went wrong")
})