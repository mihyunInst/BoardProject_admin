import React, { useState , useContext, useEffect } from 'react';
import '../css/DashBoard.css';
import { UserContext } from "../App.js";
import Restore from './Restore.js';
import Manager from './Manager.js';
import Statistics from './Statistics.js';

function DashBoard() {

  const globalState = useContext(UserContext); // 전역 상태

  const [menu, setMenu] = useState(1); // 1:복구, 2: 통계, 3:관리자메뉴

  // 메뉴탭 버튼 이벤트 함수
  const handleMenu = (e, number) => {
    // 모든 li 요소의 클래스를 초기화
    const allTabs = document.querySelectorAll('.tab-box li');
    allTabs.forEach(tab => tab.classList.remove('active'));
    
    // 클릭된 li 요소에 클래스를 추가하여 스타일 변경
    e.target.classList.add('active');

    setMenu(number);
  }

  return (
      <div className='dash-board-container'>
        <h1>관리자 페이지</h1>

        <div className='admin-info'>
          <p>현재 접속 관리자 : {globalState.user.memberNickname}</p>
          <button onClick={globalState.handleLogout}>로그아웃</button>
        </div>

        <ul className='tab-box'>
          <li className="active" onClick={(e) => handleMenu(e, 1)}>복구</li>
          <li onClick={(e) => handleMenu(e, 2)}>통계</li>
          <li onClick={(e) => handleMenu(e, 3)}>관리자 메뉴</li>
        </ul>

        {menu === 1 && <Restore />}
        {menu === 2 && <Statistics />}
        {menu === 3 && <Manager />}

      </div>
  )
}

export default DashBoard;