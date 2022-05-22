import React from 'react'
import { API_URL, API_KEY, MOVIE_LANGUAGE, IMAGE_BASE_URL } from '../../Config';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainImage from '../LandingPage/section/MainImage';
import MovieInfo from './section/MovieInfo';
import GridCards from "../commons/GridCards";
import { Row } from "antd";

function MovieDetail() {

    let movieId = useParams().movieId;
    const [Movie, setMovie] = useState([]);
    const [Casts, setCasts] = useState([]);
    const [Toggle, setToggle] = useState(false);

    useEffect(() => {
        const endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=${MOVIE_LANGUAGE}`;
        const endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=${MOVIE_LANGUAGE}`;
        fetchMovieDetail(endpointInfo);
        fetchMovieCrew(endpointCrew);
    }, []);

    const fetchMovieDetail = (endpoint) => {
        fetch(endpoint)
        .then(res => res.json())
        .then(res => {
            setMovie(res);
        });
    };

    const fetchMovieCrew = (endpoint) => {
        fetch(endpoint)
        .then(res => res.json())
        .then(res => {
            setCasts(res.cast);
        });
    };

    const toggleCrewInfo = () => {
        setToggle((Toggle) => !Toggle);
    }
  
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
                    <button onClick={toggleCrewInfo}>출연진 정보</button>
                </div>

            {Toggle && 
                <Row gutter={[16, 16]}>

                {Casts && Casts.map((cast, index) => 
                    <React.Fragment key={index}>
                    <GridCards
                        image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                        characterName={cast.name}
                    />
                    </React.Fragment>
    
                )}
                </Row>
            }

            </div>

        </div>
  )
}

export default MovieDetail