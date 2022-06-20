import { Routes, Route ,useNavigate} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ListPosts from "./pages/ListPosts";
import NotFound from "./pages/NotFound";
import NewPost from "./pages/NewPost";
import ListUsers from "./pages/ListUsers";
import MenuLogued from "./component/MenuLogued";
import BtnCRUD from "./component/BtnCRUD";
import { PostProvider } from "./context/postContext";

import { Toaster } from "react-hot-toast";
import Header from "./component/Header";
import {useUsers} from './context/usersContext'
function App() {
 const {logout,userLogued,JWT} = useUsers()
 const navigate = useNavigate()
  return (
    <div className="App bg-slate-700 h-screen relative ">
    {/* <UsersProvider> */}
    <PostProvider>
      
     {JWT &&<MenuLogued logout={logout}  userLogued={userLogued}/> }
     {JWT ? <BtnCRUD/> : navigate('/')} 
     {JWT ? <ListPosts/>: navigate('/') } 
          <Routes>
            <Route path="/" element={<Header JWT={JWT}/>} />
            <Route path="/listPosts" element={<ListPosts/>} />
            <Route path="/register" element={<Register />} />
           {JWT ?  <Route path="/editUser/:id" element={<Register />} />: navigate('/')}
            <Route path="/login" element={<Login />} />
            <Route path="/listUsers" element={<ListUsers />} />
            <Route path="/newPost" element={<NewPost />} />
            <Route path="/editPost/:id" element={<NewPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster/>
        </PostProvider>
        {/* </UsersProvider> */}
    </div>
  );
}

export default App;
