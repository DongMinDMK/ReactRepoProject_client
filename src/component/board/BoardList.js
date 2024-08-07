import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import "../../style/board.css"

function BoardList() {

  const [boardList, setBoardList] = useState([]);
  const [paging, setPaging] = useState({});
  const [beginend, setBeginend] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get("/api/boards/getBoardList/1")
    .then((result)=>{
      setBoardList([...result.data.boardlist])
      setPaging(result.data.paging);
      console.log(result.data.boardlist);

      const pageArr=[];
      for(let i=result.data.paging.beginPage; i<=result.data.paging.endPage; i++){
        pageArr.push(i);
      }

      setBeginend([...pageArr]);
    })
    .catch((err)=>{
      console.error(err);
    })
  }, []
  )

  function onBoardView(num){
    navigate("/boardView/" + num);
  }

  function onPageMove(page){
    // 매개변수로 전달된 페이지로 게시물을 검색한 후
    // 리스트를 갱신하세요

    axios.get(`/api/boards/getBoardList/${page}`)
            .then((result)=>{
                setBoardList( [...result.data.boardlist ] );
                setPaging(result.data.paging);

                const pageArr=[];
                for(let i=result.data.paging.beginPage; i<=result.data.paging.endPage; i++){
                    pageArr.push(i);
                }
                setBeginend([...pageArr]);

            })
            .catch((err)=>{console.error(err)})
          }
          return (
            <div className='boardList'>
                    <div className='titlerow'>
                        <div className='titlecol'>번호</div>
                        <div className='titlecol'>제목</div>
                        <div className='titlecol'>글쓴이</div>
                        <div className='titlecol'>작성일</div>
                        <div className='titlecol'>조회수</div>
                    </div>
        
                    {
                        boardList.map((board, idx)=>{
                            return (
                                <div className='row' key={idx}>
                                    <div className='col'>{board.num}</div>
                                    <div className='col' onClick={()=>{
                                        onBoardView( board.num );
                                    }}>{board.title}</div>
                                    <div className='col'>{board.userid}</div>
                                    <div className='col'>{board.writedate.substring(0, 10)}</div>
                                    <div className='col'>{board.readcount}</div>
                                </div>
                            )
                        })
                    }
        
                    {
                        <div id ="paging" style={{textAlign:"center", padding: "10px"}}>
                        {
                            (paging.prev)?(
                                <span style={{cursor:"pointer"}} onClick={()=>{
                                    onPageMove(paging.beginPage-1)
                                }}>&nbsp;◀&nbsp;</span>
                            ):(<></>)
                        }
                        {
                            (beginend)?(
                                beginend.map((page, idx)=>{
                                    return (
                                        <span style={{cursor:"pointer"}} key={idx} onClick={()=>{
                                            onPageMove(page)
                                        }}>&nbsp;{page}&nbsp;</span>
                                    )
                                })
                            ):(<></>)
                        }
                        {
                            (paging.next)?(
                                <span style={{cursor:"pointer"}} onClick={()=>{
                                    onPageMove(paging.endPage+1)
                                }}>&nbsp;▶&nbsp;</span>
                            ):(<></>)
                        }
                        </div>
                    }
        
              </div>
          )
  }

export default BoardList