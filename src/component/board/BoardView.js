import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

import '../../style/board.css';

function BoardView() {

    const [board, setBoard] = useState({});
    const [replyList, setReplyList] = useState([]);
    const navigate = useNavigate();

    const{num} = useParams();

    useEffect(()=>{
        axios.get(`/api/boards/getBoard/${num}`)
        .then((result)=>{
            // console.log(result.data);
            setBoard(result.data);
            // setReplyList([result.data.replyList])
        })
        .catch((err)=>{
            console.error(err);
        })
    },[]
)

    useEffect(()=>{
        axios.get(`/api/boards/getReplyList/${num}`)
        .then((result)=>{
            setReplyList([...result.data])
        })
        .catch((err)=>{
            console.error(err);
        })
    },[]
)
    function deleteBoard(num){
        const pass = window.prompt("삭제하기 전 비밀번호를 먼저 입력해주세요");

        if(pass != board.pass){
            return window.alert("비밀번호가 일치하지 않아 삭제를 진행하실 수 없습니다.");
        }

        axios.delete(`/api/boards/deleteBoard/${num}`)
        .then((result)=>{
            window.alert("삭제가 정상적으로 완료되었습니다.");
            navigate("/main");
        })
        .catch((err)=>{
            console.error(err);
        })

        
    }

  return (
    <div className='boardView'>
            <h2>Board View</h2>
            <div className='field'>
                <label>작성자</label><div>{board.userid}</div>
            </div>
            <div className='field'>
                <label>이메일</label><div>{board.email}</div>
            </div>
            <div className='field'>
                <label>제목</label><div>{board.title}</div>
            </div>
            <div className='field'>
                <label>내용</label><div><pre>{board.content}</pre></div>
            </div>
            <div className='field'>
                <label>이미지</label>
                <div>
                    <img src={`http://localhost:5000/img/${board.savefilename}` } style={{width:"300px"}} />
                </div>
            </div>

            <div className='btns'>
                <button onClick={()=>{ navigate(`/updateBoard/${board.num}`) }}>수정</button>
                <button onClick={()=>{ deleteBoard( board.num ) }}>삭제</button>
                <button onClick={()=>{ navigate('/main') }}>돌아가기</button>
            </div><br /><br />
            <div className="head-row">
                <div className="head-col">작성일시</div><div className="head-col">작성자</div><div className="head-col">내용</div><div className="head-col">&nbsp;</div>
            </div>
            {
                replyList.map((reply, idx)=>{
                    return(
                            <div key={idx} className="new-reply-row">
                                <div className="new-reply-col">{reply.writedate.substring(5,10)}</div>
                                <div className="new-reply-col">{reply.userid}</div>
                                <div className="new-reply-col">{reply.content}</div>
                                <div className="new-reply-col"><button>삭제</button></div>
                            </div>
                        )
                })
            }

        </div>
  )
}

export default BoardView