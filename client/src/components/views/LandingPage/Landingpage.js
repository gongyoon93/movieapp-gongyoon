import React, { useEffect } from 'react'
import { useState } from 'react';
import { API_URL, API_KEY, MOVIE_LANGUAGE } from '../../Config';
import MainImage from './section/MainImage';
import { IMAGE_BASE_URL } from '../../Config';

function Landingpage() {
 
  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=${MOVIE_LANGUAGE}&page=1`;

    fetch(endpoint)
    .then(res => res.json())
    .then(res => {
       setMovies([res.results]);
       setMainMovieImage(res.results[0]);
    });

  }, []);

  return (
    <div style={{ width: '100%', margin: '0' }}>
  
      {/* Main Image */}

      {
        MainMovieImage && <MainImage 
        image={`${IMAGE_BASE_URL}original${MainMovieImage.backdrop_path}`}
        title={MainMovieImage.original_title}
        text={MainMovieImage.overview}
        />
      }

      <div style={{ width: '85%', margin: '1rem auto'}}>

        <h2>최신 영화</h2>
        <hr />

        {/* Movie Grid Cards */}

      </div>

      <div style={{ display: 'flex', justifyContent: 'center',}}>
        <button>불러오기</button>
      </div>

    </div>


  )
}

export default Landingpage