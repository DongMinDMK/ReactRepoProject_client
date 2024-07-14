import './App.css';
import{Routes, Route} from "react-router-dom";

import Login from "./component/Login";
import Main from "./component/Main";
import JoinForm from "./component/member/JoinForm";
import MemberUpdate from "./component/member/MemberUpdate"
import BoardView from "./component/board/BoardView";
import WriteBoard from "./component/board/WriteBoard"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/main" element={<Main></Main>}></Route>
        <Route path="/joinForm" element={<JoinForm></JoinForm>}></Route>
        <Route path="/memberUpdate" element={<MemberUpdate></MemberUpdate>}></Route>
        <Route path="/boardView/:num" element={<BoardView></BoardView>}></Route>
        <Route path="/writeBoard" element={<WriteBoard></WriteBoard>}></Route>
      </Routes> 
    </div>
  );
}

export default App;
