import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function MemberUpdate() {
    const[userid, setUserid] = useState("");
    const [pwd, setPwd] = useState("");
    const [pwdchk, setPwdchk] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get("/api/members/getMember")
        .then((result)=>{
            if(!result.data){
                navigate("/");
                return window.alert("로그인이 필요한 서비스입니다.");
            }else{
                setUserid(result.data.userid);
                setName( result.data.name );
                setEmail( result.data.email );
                setPhone( result.data.phone );
                setPwd(result.data.pwd);
            }
        })
        .catch((err)=>{
            console.error(err);
        })
    }, []
    )

    function onSubmit(){
        if(!userid){
            return window.alert("아이디를 입력하세요");
        }
        if(!pwd){
            return window.alert("비밀번호를 입력하세요");
        }
        if( !name ){ return alert('이름을 입력하세요');   }
        if( !email ){  return alert('이메일을 입력하세요');   }
        if( !phone ){ return alert('전화번호를 입력하세요');   }
        if( pwd != pwdchk ){  return alert('패스워드확인이 일치하지 않습니다');   }

        axios.post("/api/members/updateMember", {userid:userid, pwd:pwd,name:name, email:email, phone:phone})
        .then((result)=>{
            window.alert("성공적으로 수정이 완료되었습니다.");
            navigate("/main");
        })
        .catch((err)=>{
            window.alert("알수없는 이유로 수정이 불가합니다.");
            console.error(err);
        })
    }

  return (
    <div className="login">
            <form id="login-form">
                <h2>Edit Member</h2>
                <div className='field'>
                    <label>USER ID</label>
                    <input type="text" value={userid} readOnly/>
                </div>
                <div className='field'>
                    <label>PASSWORD</label>
                    <input type="password" value={pwd} onChange={
                        (e)=>{ setPwd( e.currentTarget.value ) }
                    } />
                </div>
                <div className='field'>
                    <label>RETYPE PASS</label>
                    <input type="password" value={pwdchk} onChange={
                        (e)=>{ setPwdchk( e.currentTarget.value ) }
                    } />
                </div>
                <div className='field'>
                    <label>NAME</label>
                    <input type="text" value={name} onChange={
                        (e)=>{ setName( e.currentTarget.value ) }
                    } />
                </div>
                <div className='field'>
                    <label>EMAIL</label>
                    <input type="text" value={email} onChange={
                        (e)=>{setEmail( e.currentTarget.value )}
                    } />
                </div>
                <div className='field'>
                    <label>PHONE</label>
                    <input type="text" value={phone} onChange={
                        (e)=>{ setPhone( e.currentTarget.value ) }
                    } />
                </div>
                <div className="btns">
                    <input type="button" value="정보수정" onClick={
                        ()=>{  onSubmit();   }
                    }/>
                    <input type="button" value="돌아가기" onClick={
                        ()=>{ navigate('/main'); }
                    }/>
                </div>
            </form>   
        </div>
  )
}

export default MemberUpdate