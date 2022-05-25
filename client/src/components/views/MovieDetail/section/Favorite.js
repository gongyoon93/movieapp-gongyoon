import React, {useEffect} from 'react';
import Axios from 'axios';


function Favorite(props) {
    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.movieRunTime;

    let variables = {
        userFrom,
        movieId
    };
    useEffect(() => {
        Axios.post('/api/favorite/favoriteNumber', variables)
        .then(res => {
            if(res.data.success){
                
            } else {
                alert('좋아요 정보를 가져오는데 실패하였습니다.');
            }
        });

        Axios.post('/api/favorite/favorited', variables)
        .then(res => {
            if(res.data.success){
                
            } else {
                alert('정보를 가져오는데 실패하였습니다.');
            }
        });
    }, []);

  return (
    <div>
        <button>좋아요</button>
    </div>
  )
}

export default Favorite