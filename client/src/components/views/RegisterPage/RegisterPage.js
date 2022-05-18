import React, { useState } from 'react'
import {useDispatch} from 'react-redux';
import {RegisterUser} from '../../../_actions/user_action';
import {useNavigate} from 'react-router-dom';


function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
     setEmail(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
 };
 
  const onPwHandler = (event) => {
    setPassword(event.currentTarget.value);
 };

 const onConfirmPwHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
 };

 const goBack = () => {
  navigate('/login');
};

  const onSubmitHandler = (event) => {
    event.preventDefault();

    // console.log('Email', Email);
    // console.log('Password', Password);

    if(Password !== ConfirmPassword){
      return alert('비밀번호와 비밀번호 확인을 동일해야 합니다');
    }

    let body = {
        email: Email,
        name: Name,
        password: Password
    } 

    dispatch(RegisterUser(body))
    .then(res => {
      if(res.payload.success){
        alert('회원가입이 완료되었습니다.');
        navigate('/login');
      } else {
        alert("Error");
      } 
    });

  };

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center'
      , width: '100%', height: '100vh'
    }}>
      <form style={{display:'flex', flexDirection:'column'}}
            onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPwHandler} />
        <label>Confirm Password</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPwHandler} />
        <br />
        <button type="submit">
          회원 가입 신청
        </button>
        <br />
        <button onClick={goBack}>
          뒤로 가기
        </button>
      </form>
    </div>
  )
}

export default RegisterPage