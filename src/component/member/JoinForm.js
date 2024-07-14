import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function JoinForm() {
  const [userid, setUserid] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd_chk, setPwd_chk] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const onsubmit = () =>{
    if(!userid){
      return window.alert("아이디를 입력해주세요...");
    }
    if(!pwd){return window.alert("비밀번호를 입력하세요.")};
    if(!name){return window.alert("이름을 입력하세요.")};
    if(!email){return window.alert("이메일을 입력하세요.")};
    if(!phone){return window.alert("전화번호를 입력하세요.")};
    if(pwd != pwd_chk){return window.alert("패스워드 확인이 일치하지 않습니다.")};

    axios.post("/api/members/join", {userid:userid, pwd:pwd, name:name, email:email, phone:phone})
    .then((result)=>{
      if(result.data.msg == "OK"){
        window.alert("회원가입이 정상적으로 완료되었습니다.");
        navigate("/");
      }else{
        window.alert("회원가입에 문제가 발생하였습니다.");
        navigate("/joinForm");
      }
    })
    .catch((err)=>{
      console.error(err);
      navigate("/");
    })
  }

  return (
    <div className="login">
      <form id="login-form">
          <h2>Join</h2>
          <div className="field">
            <label>USER ID</label>
            <input type="text" value={userid} onChange={
                (e)=>{setUserid(e.currentTarget.value)}
            }/>
          </div>
          <div className="field">
            <label>PASSWORD</label>
            <input type="password" value={pwd} onChange={
                (e)=>{setPwd(e.currentTarget.value)}
            }/>
          </div>
          <div className="field">
            <label>RETYPE PASS</label>
            <input type="password" value={pwd_chk} onChange={
                (e)=>{setPwd_chk(e.currentTarget.value)}
            }/>
          </div>
          <div className="field">
            <label>NAME</label>
            <input type="text" value={name} onChange={
                (e)=>{setName(e.currentTarget.value)}
            }/>
          </div>
          <div className="field">
            <label>EMAIL</label>
            <input type="text" value={email} onChange={
                (e)=>{setEmail(e.currentTarget.value)}
            }/>
          </div>
          <div className="field">
            <label>PHONE</label>
            <input type="text" value={phone} onChange={
                (e)=>{setPhone(e.currentTarget.value)}
            }/>
          </div>
          <div className="btns">
            <input type="button" value="회원가입" onClick={()=>{
                onsubmit();
            }}></input>
            <input type="button" value="돌아가기" onClick={
                ()=>{navigate("/");}
            }></input>
        </div>
      </form>
    </div>
  )
}

export default JoinForm