import React from 'react'
import { API_URL, API_KEY, MOVIE_LANGUAGE, IMAGE_BASE_URL } from '../../Config';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainImage from '../LandingPage/section/MainImage';
import MovieInfo from './section/MovieInfo';

function MovieDetail() {

    let movieId = useParams().movieId;
    const [Movie, setMovie] = useState({});

    useEffect(() => {
        const endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=${MOVIE_LANGUAGE}`;
        const endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=${MOVIE_LANGUAGE}`;
        fetchMovieDetail(endpointInfo);
    }, []);

    const fetchMovieDetail = (endpoint) => {
        fetch(endpoint)
        .then(res => res.json())
        .then(res => {
            setMovie(res);
        });
    };
  
    return (
        <div style={{ width: '100%', margin: '0' }}>

            {/* Header */}
            <MainImage image={`${IMAGE_BASE_URL}original${Movie.backdrop_path}`} title={Movie.title} text={Movie.overview} />

            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto'}}>

                {/* Movie Info */}

                <MovieInfo
                    movie={Movie}
                />

                <br />

                {/* Actors Grid */}

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem'}}>
                    <button>출연진 정보</button>
                </div>

            </div>

        </div>
  )
}

export default MovieDetail