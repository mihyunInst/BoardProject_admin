import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import DashBoard from "./components/DashBoard";
import './css/App.css';

export const UserContext = React.createContext();

function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("userData")));

  // 이메일 입력 받아 상태에 세팅
  const changeInputEmail = (e) => {
    setEmail(e.target.value);
  }
  
  // 비밀번호 입력 받아 상태에 세팅
  const changeInputPw = (e) => {
    setPassword(e.target.value);
  }

  // 로그인 시 비동기 요청 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch("/admin/login", {
      method : "POST",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify({
        memberEmail : email, 
        memberPw : password
      })
    })
    .then(res => res.text())
    .then(result => {

      if(result.length == 0) {
        alert("이메일 혹은 비밀번호 불일치!");
        return;

      } else {
        
        result = JSON.parse(result); // 결과값을 JS객체 형태로 파싱
        
        // 저장할 데이터
        const data = {
          memberEmail: result.memberEmail,
          memberNickname: result.memberNickname
        };

        // 현재 시간을 milliseconds로 구함
        const currentTime = new Date().getTime();

        // 1시간 후의 시간을 milliseconds로 구함
        const expirationTime = currentTime + 60 * 60 * 1000; // 60분 * 60초 * 1000밀리초

        // 데이터와 만료 시간을 localStorage에 저장
        localStorage.setItem('userData', JSON.stringify(data));
        localStorage.setItem('expirationTime', expirationTime);

        // 상태에 얻어온 loginMember의 데이터 세팅
        setUser(data);

        // 만료 시간을 확인하기 위해 타이머 설정
        setTimeout(() => {
          // 만료 시간이 지나면 localStorage에서 데이터 삭제
          localStorage.removeItem('userData');
          localStorage.removeItem('expirationTime');
        }, 60 * 60 * 1000); // 1시간 후
        
      }

    })
  }

  // 로그아웃 시 비동기 요청 함수
  const handleLogout = () => {

    fetch("/admin/logout")
    .then(res => res.text())
    .then(result => {

      if(result > 0) {
        setUser(null);
        localStorage.removeItem('userData');
        localStorage.removeItem('expirationTime');
      } else {
        alert("로그아웃 중 문제 발생!");
      }
    })
  }

  // user라는 객체에 상태와, 함수를 묶어서 
  // Provider를 통해 하위 컴포넌트로 데이터 전달함
  const globalState = {
    user : user,
    changeInputEmail : changeInputEmail,
    changeInputPw : changeInputPw,
    handleSubmit : handleSubmit,
    handleLogout : handleLogout
  }
  
  return (
    <div className="body-container">
      <UserContext.Provider value={globalState}>
        {
          localStorage.getItem("userData") != null ?
            <DashBoard />
            :
            <Login />
          }
      </UserContext.Provider>
    </div>
  );
}

export default App;
