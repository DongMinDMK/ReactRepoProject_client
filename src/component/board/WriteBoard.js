import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import '../../style/board.css';

function WriteBoard() {

    const [loginUser, setLoginUser] = useState({});
    const [pass, setPass] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [savefilename, setSavefilename] = useState("");
    const [imgStyle, setImgStyle] = useState({display:"block"});
    const [imgSrc, setImgSrc] = useState("http://via.placeholder.com/200x150");
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get("/api/members/getMember")
        .then((result)=>{
            setLoginUser(result.data);            
        })
    },[]
    )

    async function onFileUpload(e){
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        const result = await axios.post("/api/boards/fileupload", formData)
        setImage(result.data.image);
        setSavefilename(result.data.savefilename);
        setImgStyle({width:"300px"});
        setImgSrc(`http://localhost:5000/img/${result.data.savefilename}`);
    }

    function onSubmit(){
        if(!pass){
            return window.alert("비밀번호를 입력해주세요.");
        }
        if(!title){
            return window.alert("게시글 제목을 입력해주세요");
        }
        if(!content){
            return window.alert("게시글 내용을 입력해주세요");
        }

        axios.post("/api/boards/insertBoard", {userid:loginUser.userid, pass:pass, email:loginUser.email, title:title, content:content, image:image, savefilename:savefilename})
        .then((result)=>{
            window.alert("정상적으로 게시물 등록이 완료되었습니다.");
            navigate("/main");
        })
        .catch((err)=>{
            window.alert("알수 없는 이유로 게시물 등록을 진행하실 수 없습니다.");
            console.error(err);
            navigate("/writeBoard");
        })
    }


  return (
    <div>
      <div className='writeBoard'>
            <h2>Board Write Form</h2>
            <div className='field'>
                <label>작성자</label><input type="text" value={loginUser.userid} readOnly/>
            </div>
            <div className='field'>
                <label>패스워드</label><input type="password"  value={pass} onChange={(e)=>{
                    setPass(e.currentTarget.value);
                }}/>
            </div>
            <div className='field'>
                <label>이메일</label><input type="text"  value={loginUser.email} readOnly/>
            </div>
            <div className='field'>
                <label>제목</label>
                <input type="text" value={title} onChange={
                    (e)=>{ setTitle( e.currentTarget.value ) }
                }/>
            </div>
            <div className='field'>
                <label>내용</label>
                <textarea rows="10" value={content} onChange={
                    (e)=>{ setContent( e.currentTarget.value ) }
                }></textarea>
            </div>
            <div className='field'>
                <label>이미지</label>
                <input type="file" onChange={(e)=>{ onFileUpload(e); }  }/>
                {/* e 를 전달인수로 전달해야 해당함수에서 방금 선택한 이미지를 인식할 수 있습니다. */}
            </div>
            <div className='field'>
                <label>이미지 미리보기</label>
                <div><img src={imgSrc} style={imgStyle} alt=""/></div>
            </div>
            <div className='btns'>
                <button onClick={ ()=>{ onSubmit() } }>작성완료</button>
                <button onClick={ ()=>{ navigate('/main') }}>돌아가기</button>
                <button></button>
            </div>
        </div>
    </div>
  )
}

// 테스트
export default WriteBoard