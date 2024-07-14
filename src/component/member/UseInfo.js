import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "../../style/board.css"

function UseInfo() {

    const [loginUser, setLoginUser] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
            axios.get("/api/members/getMember")
            .then((result)=>{
                setLoginUser(result.data);
            })
            .catch((err)=>{
                console.error(err);
                navigate('/');
            })
        },[]
    );

    function onLogout(){
        axios.get('/api/members/logout')
        .then(()=>{
            navigate('/');
        })
        .catch((err)=>{
            console.error(err);
        })
    }


  return (
    <div className="loginUser">
      <h3>{loginUser.userid}({loginUser.name})님 어서오세요. &nbsp;</h3>
      <button onClick={
        ()=>{navigate("/memberUpdate")}
      }>회원정보수정</button>
      <button onClick={
        ()=>{onLogout();}
      }>로그아웃</button>
      <button onClick={
        ()=>{navigate("/writeBoard")}
      }>게시글쓰기</button>
    </div>
  )
}

export default UseInfo