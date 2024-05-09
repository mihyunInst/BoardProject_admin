import React, { useState , useContext } from 'react';
import '../css/Login.css'; // Login 컴포넌트에 대한 CSS 파일
import { UserContext } from "../App.js";

function Login() {

  const globalState = useContext(UserContext);

  return (
    <div className="login-container">
      <h2>관리자 로그인</h2>
      <form onSubmit={globalState.handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">이메일:</label>
          <input 
            type="email" 
            id="email" 
            onChange={globalState.changeInputEmail}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호:</label>
          <input 
            type="password" 
            id="password" 
            onChange={globalState.changeInputPw}
            required 
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default Login;
