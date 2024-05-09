// import axios from 'axios';
"use strict"

const Port = 3000;

const url = 'postgressql://localhost:5432/movies'
const {Client} = require("pg");
const client = new Client(url);

require('dotenv').config()
const apiKey = process.env.API_KEY
const express = require ("express");
const app = express();
const bodyParser = require('body-parser');

const axios = require('axios');
const cors = require("cors");
app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get("/",homeHandler)
app.get("/favorite",handler)
app.get("*" , handleNotFound)


//routes    
client.connect().then(() =>{
    
    app.listen(Port,() =>{
        console.log(`the server listen to ${Port}`)
    } );
})

app.get("/",homeHandler)
app.get("/favorite",favhandler);
app.get("/trending",handleTrending);
app.get("/search" , handleSearch);
app.get("/discover",handlediscover);
app.get("/popular",handlePopular);
app.post("/addMovie",handleAdd);
app.get("/getMovie",getAllHAndler);
app.delete("/deleteMovie/:id",deleteMovieHandler);
app.put("/updateMovie/:id",updateHandler)
app.put("/getMovie/:id",getHandler)
app.get("*" , handleNotFound);


function homeHandler(req,res){
    let dataMovie = [];
     newMovie = new Movie(data.title,data.poster_path,data.overview)


function homeHandler(req,res){
    let dataMovie = [];
    newMovie = new Movie(data.title,data.poster_path,data.overview)
    
    res.json(newMovie)

//functions
    function handlePopular(req,res){
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
        axios.get(url)
        .then(result =>{
            let movie = result.data.results.map(item =>{
                return new Movie(item.title,item.poster_path,item.overview)
        })
        res.json(movie)
    })
    .catch(error =>{
        res.send("Inside catch")
    })

}

function favhandler(req,res) {
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

function handlePopular(req,res){
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
    axios.get(url)
    .then(result =>{
        let movie = result.data.results.map(item =>{
            return new Movie(item.title,item.poster_path,item.overview)
        })
        res.json(movie)
    })
    .catch(error =>{
        res.send("Inside catch")
    })
}

function handleAdd(req,res){
    console.log(req.body);
    
    const { title, poster_path, overview} = req.body
    
    let sql = 'INSERT INTO movie(title,poster_path,overview) VALUES($1, $2 , $3) RETURNING *;'
    let values = [title , poster_path , overview]
    client.query(sql, values)
    .then(result =>{
        console.log(result.rows);
        return res.json(result.rows);
    })
    .catch()
}

function getAllHAndler(req,res){
    let sql = 'SELECT * from movie;'

    client.query(sql).then((result) =>{
        res.json(result.rows)
    }).catch()
}

function deleteMovieHandler(req,res){
    const id = req.params.id;
    const sql = `DELETE FROM movie where id = ${id} RETURNING *`
    
    client.query(sql)
    .then((result) =>{
        res.status(204).json({})
    })
    .catch()
}
    
function updateHandler(req,res){
        const id = req.params.id;
        const sql = `UPDATE movie SET title = $1, poster_path = $2 , overview = $3 where id = ${id} RETURNING *`
        let values = [title , poster_path , overview]
        client.query(sql, values)
        .then(result =>{
        console.log(result.rows);
        return res.status(200).json(result.rows);
    })
    .catch()
}



function getHandler(req, res) {
    
        const id = req.params.id
        const sql = `SELECT * FROM movies WHERE movie_id = ${id}`
        client.query(sql)
        .then((result) => {
            res.send(result.rows)
        })
        
        .catch() 
        
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