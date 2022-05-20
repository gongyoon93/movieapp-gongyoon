import React, { useState, useEffect } from 'react'
import { API_URL, API_KEY, MOVIE_LANGUAGE } from '../../Config';
import MainImage from './section/MainImage';
import { IMAGE_BASE_URL } from '../../Config';
import GridCards from "../commons/GridCards";
import { Row } from "antd";

function Landingpage() {
 
  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  console.log('e32');
  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=${MOVIE_LANGUAGE}&page=1`;

    fetch(endpoint)
    .then(res => res.json())
    .then(res => {
       setMovies([...Movies, ...res.results]);
       setMainMovieImage(res.results[0]);
    });

  }, []);

  return (
    <div style={{ width: '100%', margin: '0' }}>
  
      {/* Main Image */}

      {
        MainMovieImage && <MainImage 
        image={`${IMAGE_BASE_URL}original${MainMovieImage.backdrop_path}`}
        title={MainMovieImage.title}
        text={MainMovieImage.overview}
        />
      }

      <div style={{ width: '85%', margin: '1rem auto'}}>

        <h2>최신 영화</h2>
        <hr />

        {/* Movie Grid Cards */}

        <Row gutter={[16, 16]}>

          {Movies && Movies.map((movie, index) => 
            <React.Fragment key={index}>
              <GridCards
                image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                movieId={movie.id}
                movieName={movie.title}
              />
            </React.Fragment>

          )}

        </Row>

      </div>

      <div style={{ display: 'flex', justifyContent: 'center',}}>
        <button>불러오기</button>
      </div>

    </div>


  )
}

export default React.memo(Landingpage)