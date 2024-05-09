import React, { useState ,useEffect } from 'react';

export default function Restore() {

  const [withdrawMembers, setWithdrawMembers] = useState(null);  // 탈퇴회원목록
  const [deleteBoards, setDeleteBoards] = useState(null);  // 삭제게시글목록
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 탈퇴한 회원 목록 조회용 비동기 요청 함수
  const getWithdrawnMemberList = () => {
    fetch('/admin/withdrawnMemberList')
    .then(response => response.json())
    .then(data => {
      
      if(data.length == 0) {
        setWithdrawMembers([]);
      } else {
        setWithdrawMembers(data);
      }
      
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  // 탈퇴한 회원 복구 비동기 요청 함수
  const restoreMember = (e, member) => {

    if(window.confirm(member.memberNickname + "님을 탈퇴 복구 시키겠습니까?")) {
      fetch("/admin/restoreMember", {
        method : "PUT",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({ memberNo: member.memberNo })
      })
      .then(res => res.text())
      .then(result => {
        alert("복구 되었습니다");
        getWithdrawnMemberList();
      })
    } else{
      alert("취소");
    }
  }

  // 삭제된 게시글 목록 조회용 비동기 요청 함수
  const getDeleteBoardList = async() => {
    fetch('/admin/deleteBoardList')
    .then(response => response.json())
    .then(data => {

      if(data.length == 0) {
        setDeleteBoards([]);
      } else {
        setDeleteBoards(data);
      }

    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  // 삭제된 게시글 복구 비동기 요청 함수
  const restoreBoard = (e, board) => {

    if(window.confirm(board.boardNo + "번 게시글을 복구 시키겠습니까?")) {
      fetch("/admin/restoreBoard", {
        method : "PUT",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({ boardNo: board.boardNo })
      })
      .then(res => res.text())
      .then(result => {
        alert("복구 되었습니다");
        getDeleteBoardList();
      })
    } else{
      alert("취소");
    }
  }

  // 컴포넌트가 렌더링 될 때마다 side effect를 실행
  useEffect(() => {
    getWithdrawnMemberList();
    getDeleteBoardList();
  }, []);

  useEffect(() => {
    if(withdrawMembers != null && deleteBoards != null) {
      setLoading(false);
    } 
  }, [withdrawMembers, deleteBoards]);
  


  if(loading) {
    return <h1>Loading...</h1>

  } else {
    return (
      <div className='menu-box'>
        <section className='section-border'>
          <h2>탈퇴 회원 복구</h2>
        
            <h3>탈퇴한 회원 목록</h3>

            {
              withdrawMembers.length == 0 ? 
              <p>탈퇴한 회원이 없습니다</p> :
              withdrawMembers.map((member, index) => {
                return (
                  <ul className='ul-border' key={index}>
                    <li>회원 번호 : {member.memberNo}</li>
                    <li>회원 이메일 : {member.memberEmail}</li>
                    <li>회원 닉네임 : {member.memberNickname}</li>
                    <button className='restoreBtn' onClick={(e) => restoreMember(e, member)}>복구</button>
                  </ul>
                )
              })
            }
        </section>

        <section className='section-border'>  
          <h2>삭제 게시글 복구</h2>
          
            <h3>삭제된 게시글 목록</h3>

            {
              deleteBoards.length == 0 ? 
              <p>삭제된 게시글이 없습니다</p> :
              deleteBoards.map((board, index) => {
                return (
                  <ul className='ul-border' key={index}>
                    <li>게시글 번호 : {board.boardNo}</li>
                    <li>게시글 카테고리 : {board.boardName}</li>
                    <li>게시글 제목 : {board.boardTitle}</li>
                    <li>작성자 닉네임 : {board.memberNickname}</li>
                    <button className='restoreBtn' onClick={(e) => restoreBoard(e, board)}>복구</button>
                  </ul>
                )
              })
            }
        </section>
      </div> 
    )
  }
}