const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
//middleWares
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());

const connection = mysql.createPool({
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.HOSTNAME,
  database: 'CRUDDataBase',
});

app.get('/api/get', (req,res) => {
  const getAll = "SELECT * FROM movie_reviews";
  connection.query(getAll, (err, result) => {
    // console.log(result);
    res.send(result);
      })
})

app.post('/api/insert', (req,res) => {
  const { movieName, movieReview } = req.body;
  const insertMovie = "INSERT INTO movie_reviews (movieName, movieReview) VALUES ( ?, ?)";
  connection.query(insertMovie, [movieName, movieReview], (err, result) => {
    console.log(result);
  })
})

app.delete('/api/delete/:movieName', (req,res)=> {
  const name = req.params.movieName;
  const deleteMovie = "DELETE FROM movie_reviews WHERE movieName = ?";

  connection.query(deleteMovie, name, (err, result)=> {
    if (err) console.log(err);
    console.log("%s deleted!", name);
  });
});

app.put('/api/update', (req,res)=> {
  const { movieName, movieReview } = req.body;
  const updateMovie = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";

  connection.query(updateMovie, [ movieReview, movieName], (err, result)=> {
    if (err) console.log(err);
    console.log("%s updated!", movieName);
  });
})
app.listen(3001, () => {
    console.log("from whom the bells tolls")
});