import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

import '../../style/board.css';

function UpdateBoard() {

    const [loginUser, setLoginUser] = useState({});
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [pass, setPass] = useState("");
    const [oldPass, setOldPass] = useState("");
    const [image, setImage] = useState("");
    const [savefilename, setSavefilename] = useState("");
    const [imgStyle, setImgStyle] = useState({display:"block"});
    const [imgSrc, setImgSrc] = useState("http://via.placeholder.com/200x150");
    const [oldImgSrc, setOldImgSrc] = useState("")
    const navigate = useNavigate();
    const { num } = useParams();
    
    useEffect(()=>{
        axios.get("/api/members/getMember")
        .then((result)=>{
            setLoginUser(result.data);            
        })
    },[]
    )

    useEffect(()=>{
        axios.get(`/api/boards/getBoard/${num}`)
        .then((result)=>{
            setPass(result.data.pass);
            setTitle(result.data.title);
            setContent(result.data.content);
            setOldImgSrc(`http://localhost:5000/img/${result.data.savefilename}`)
            setSavefilename(result.data.savefilename);
            setOldPass(result.data.pass);
        })
        .catch((err)=>{
            console.error(err);
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

        if(pass != oldPass){
            return window.alert("비밀번호 확인이 일치하지 않습니다.");
        }

        axios.post(`/api/boards/updateBoard/${num}`, {title:title, content:content, image:image, savefilename:savefilename})
        .then(()=>{
            window.alert("수정이 정상적으로 완료되었습니다.");
            navigate(`/boardView/${num}`);
         })
         .catch((err)=>{
          console.error(err);
         })
    }

  return (
    <div>
      <div className='writeBoard'>
            <h2>Board Update Form</h2>
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
            <div className="field">
                <label>기존 이미지</label>
                <div><img src={oldImgSrc} style={{width:"300px"}} alt=""></img></div>
            </div>
            <div className='field'>
                <label>수정할 이미지</label>
                <input type="file" onChange={(e)=>{ onFileUpload(e); }  }/>
                {/* e 를 전달인수로 전달해야 해당함수에서 방금 선택한 이미지를 인식할 수 있습니다. */}
            </div>
            <div className='field'>
                <label>수정할 이미지 미리보기</label>
                <div><img src={imgSrc} style={imgStyle} alt=""/></div>
            </div>
            <div className='btns'>
                <button onClick={ ()=>{ onSubmit() } }>작성완료</button>
                <button onClick={ ()=>{ navigate('/main') }}>돌아가기</button>
            </div>
        </div>
    </div>
  )
}

export default UpdateBoard