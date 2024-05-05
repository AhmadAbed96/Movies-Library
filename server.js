// import axios from 'axios';
require('dotenv').config()
const apiKey = process.env.API_KEY
const express = require ("express");
const app = express();
const Port = 3000;
const axios = require('axios');
const cors = require("cors");
app.use(cors());
// const data = require("./Movie Data/data.json");


app.listen(Port,() =>{
    console.log(`the server listen to ${Port}`)
} )

//routes    
// app.get("/Home",datahandler)
app.get("/favorite",handler);
app.get("/trending",handleTrending);
app.get("/search" , handleSearch);
app.get("/discover",handlediscover);
app.get("/popular",handlePopular);
app.get("*" , handleNotFound);


//functions

// function datahandler(req,res){
//     let dataMovie = [];
//      newMovie = new Movie(data.title,data.poster_path,data.overview)

//      res.json(newMovie)
// }


function handlePopular(req,res){
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
    axios.get(url)
    .then(result =>{
        let movie = result.data.results.map(x =>{
            return new Movie(x.title,x.poster_path,x.overview)
        })
        res.json(movie)
    })
    .catch(error =>{
        res.send("Inside catch")
    })
}

function handler(req,res) {
    res.send("Wellcome to favorite page")
}

function handleTrending(req,res){
    const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`
    axios.get(url)
    .then((result) => {
        console.log(result.data.results);
        let movieApi = result.data.results.map(x =>{
            return new MovieApi(x.id,x.title,x.release_date,x.poster_path,x.overview)
        })
        // res.send("inside then");
        res.json(movieApi);
    })
    .catch((error) =>{
        console.log(error);
        res.send("inside catch")
    })
}

function handleSearch(req,res){
    let movieName = req.query.movieName;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieName}&page=2`
    console.log(url);
    axios.get(url)
    .then(result =>{
        res.json(result.data)
    })
    .catch()
}

function handlediscover(req,res){
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`
    axios.get(url)
    .then((result) => {
        console.log(result);
        let movieApi = result.data.results.map(x =>{
            return new Movie(x.title,x.poster_path,x.overview)
        })
        // res.send("inside then");
        res.json(movieApi);
    })
    .catch((error) =>{
        console.log(error);
        res.send("inside catch")
    })
}

function Movie(title,poster_path,overview){
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview
}

function MovieApi(id,title,release_date,poster_path,overview){
    this.id = id ;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;
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