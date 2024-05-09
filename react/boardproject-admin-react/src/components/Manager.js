import { useEffect, useState } from "react";

export default function Manager() {

    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [tel, setTel] = useState("");
    const [accountList, setAccountList] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangeNickname = (e) => {
        setNickname(e.target.value);
    }

    const handleChangeTel = (e) => {
        setTel(e.target.value);
    }

    // 관리자 계정 발급
    const submitAdminSingUp = () => {
        fetch("/admin/signUp", {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({
                memberEmail : email, 
                memberNickname : nickname,
                memberTel : tel
            })
        })
        .then(res => res.text())
        .then(result => {
            console.log(result);
            // result : null 이거나 발급된 비밀번호

            if(result.length == 0) {
                alert("발급 오류!");
            } else {
                alert(`발급된 비밀번호는 ${result} 입니다. 다시 확인할 수 없으니 저장해주시기 바랍니다.`);
            }

           
            initInputValue();
            getAdminAccountList();
        })
    }

    // 인풋창 값 비우기
    const initInputValue = () => {
        let emailEl = document.querySelector("#email");
        let nicknameEl = document.querySelector("#nickname");
        let telEl = document.querySelector("#tel");

        emailEl.value = "";
        nicknameEl.value = "";
        telEl.value = "";
        
        setEmail("");
        setNickname("");
        setTel("");
    }

    // 관리자 계정 목록 조회
    const getAdminAccountList = () => {
        fetch("/admin/adminAccountList")
        .then(res => res.json())
        .then(data => {

            if(data.length == 0) {
                setAccountList([]);
            } else {
                setAccountList(data);
            }
        })
    }

    useEffect(() => {
        getAdminAccountList();
    },[]);

    useEffect(() => {
        if(accountList != null) {
            setIsLoading(false);
        } 
    }, [accountList]);
    

    if(isLoading) {
        return <h1>Loading...</h1>
    } else {
        return (
            <>
                
                <div className="manager-div">
                    <section className="manager-section">
                        
                        <h2>관리자 계정 발급</h2>
                        <table>
                            <tr>
                                <td>사용할 이메일 : </td>
                                <td>
                                    <input 
                                    id="email"
                                    type="email" 
                                    placeholder="ex) admin2@kh.or.kr"
                                    onChange={handleChangeEmail} />
                                </td>
                            </tr>
                            <tr>
                                <td>사용할 이름 : </td>
                                <td>
                                    <input 
                                    id="nickname"
                                    type="text" 
                                    placeholder="ex) 관리자2"
                                    onChange={handleChangeNickname} />
                                </td>
                            </tr>
                            <tr>
                                <td>사용할 전화번호 : </td>
                                <td>
                                    <input 
                                    id="tel"
                                    type="text" 
                                    placeholder="ex) 01012341234"
                                    onChange={handleChangeTel} />
                                </td>
                            </tr>
                        </table>
                        <button className="issueBtn" onClick={submitAdminSingUp}>발급</button>
                    </section>
    
    
                    <section className="manager-section">
                        <h2>관리자 계정 목록</h2>
                        <table className="manager-list-table" border={1}>
                            <tr>
                                <th>번호</th>
                                <th>이메일</th>
                                <th>관리자명</th>
                            </tr>
                            {
                                accountList.map((member, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{member.memberNo}</td>
                                            <td>{member.memberEmail}</td>
                                            <td>{member.memberNickname}</td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </section>
    
                </div>
            </>
        )
    }
    
}