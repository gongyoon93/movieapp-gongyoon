import React from 'react'
import { Col } from 'antd';
import { Link } from 'react-router-dom';

function GridCards(props) {
  return (
    <Col xxl={3} xl={4} lg={6} md={8} xs={24}>
        <div style={{ position: 'relative'}} >
            <Link to={`/movie/${props.movieId}`}>
                <img style={{width: '100%', height: '320px'}} src={props.image} alt={props.movieName} title={props.movieName}/>
            </Link>
        </div>
    </Col>
  )
}

export default GridCards