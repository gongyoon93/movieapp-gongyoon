import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Landingpage() {
  const navigate = useNavigate();
    // useEffect(() => {
    //     axios.get('/api/hello')
    //     .then(res => console.log(res.data));
    // },[]);

  const onClickHandler = () => {
      axios.get('api/users/logout')
      .then(res => {
        if(res.data.success){
          alert('로그아웃 되었습니다.');
          navigate('/login');
        }else{
          alert('로그아웃에 실패하였습니다.');
        }
      });
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
      , width: '100%', height: '100vh'
    }}>
      <h2>시작 페이지</h2>
  
      <button onClick={onClickHandler}>
        로그아웃</button>
    </div>
  )
}

export default Landingpage