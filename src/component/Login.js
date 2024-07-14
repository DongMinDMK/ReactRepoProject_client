import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import "../style/board.css";

function Login() {
    const [userid, setUserid] = useState("");
    const [pwd, setPwd] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const onsubmit = ()=>{
        if(!userid){
            return window.alert("아이디를 입력해주세요...");
        }
        if(!pwd){
            return window.alert("비밀번호를 입력해주세요...");
        }

        axios.post("/api/members/login", {userid:userid, pwd:pwd})
        .then((result)=>{
            if(result.data.msg == "OK"){
                navigate("/main");
            }else{
                setMessage(result.data.msg);
            }
        })
        .catch((err)=>{
            // console.error(err);
            navigate("/");
        })

    };

  return (
    <div className="login">
      <form id="login-form">
        <div className="field">
            <label>USER ID</label>
            <input type="text" value={userid} onChange={(e)=>{
                setUserid(e.currentTarget.value)
            }}></input>
        </div>
        <div className="field">
            <label>PASSWORD</label>
            <input type="password" value={pwd} onChange={(e)=>{
                setPwd(e.currentTarget.value)
            }}></input>
        </div>
        <div className="btns">
            <input type="button" value="LOG IN" onClick={()=>{
                onsubmit();
            }}></input>
            <input type="button" value="JOIN" onClick={
                ()=>{navigate("/joinForm");}
            }></input>
        </div>
        <div>{message}</div>
      </form>
    </div>
  )
}

export default Login