import { useState, useEffect} from 'react';
import Axios from 'axios';
import './App.css';


function App() {
  const [movieName, setMovieName] = useState('');
  const [movieReview, setMovieReview] = useState('');
  const [movieReviewList, setMovieReviewList] = useState([]);

  const [newReview, setNewReview] = useState('');

  const loadData = () => {
    Axios.get('http://localhost:3001/api/get')
    .then((response)=> {
      // console.log(response);
      setMovieReviewList(response.data);
    })
  }

  useEffect(()=> {
      loadData();
  }, []);

  const submitReview = () => {
    Axios.post('http://localhost:3001/api/insert', { movieName, movieReview })
    .then(() => {
      setMovieReviewList([...movieReviewList, { movieName, movieReview }])
    });
    loadData();
  }

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
    loadData();
  }

  const updateReview = (movie) => {
    Axios.put('http://localhost:3001/api/update',
     { movieName:movie, movieReview:newReview });
    setNewReview('');
    loadData();
  }

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>

      <div className="form">
        <label>Movie Name:</label>
        <input 
        type="text" 
        name="movieName" 
        onChange={(e) => {
          setMovieName(e.target.value)
        }}
        />
        <label>Review :</label>
        <input 
        type="text" 
        name="review"
        onChange={(e) => {
          setMovieReview(e.target.value)
        }}/>
        <button onClick={ submitReview }>Submit</button>

        {movieReviewList.map((movie)=> {
            return <div className="card">
              <h1>Movie : { movie.movieName }</h1>
              <p>Review: { movie.movieReview }</p>
              <button onClick={ ()=> {deleteReview(movie.movieName)} }>Delete</button>
              <input 
              type="text" 
              id="updateInput"
              onChange={(e)=> {setNewReview(e.target.value)}}/>
              <button onClick={ ()=> {updateReview(movie.movieName)} }>update</button>
            </div>
        })}
      </div>
    </div>
  );
}

export default App;
