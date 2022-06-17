import { Routes, Route ,useNavigate} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ListPosts from "./pages/ListPosts";
import NotFound from "./pages/NotFound";
import NewPost from "./pages/NewPost";
import ListUsers from "./pages/ListUsers";
import MenuLogued from "./component/MenuLogued";
import { PostProvider } from "./context/postContext";

import { Toaster } from "react-hot-toast";
import Header from "./component/Header";
import {useUsers} from './context/usersContext'
function App() {
 const {logout,userLogued,JWT} = useUsers()
  return (
    <div className="App bg-slate-700 ">
    {/* <UsersProvider> */}
    <PostProvider>
      
     {JWT &&<MenuLogued logout={logout}  userLogued={userLogued}/> }
      <Header/>

          <Routes>
            <Route path="/" element={<ListPosts />} />
            <Route path="/register" element={<Register />} />
            <Route path="/editUser/:id" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/listUsers" element={<ListUsers />} />
            <Route path="/newPost" element={<NewPost />} />
            <Route path="/editPost/:id" element={<NewPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster></Toaster>
        </PostProvider>
        {/* </UsersProvider> */}
    </div>
  );
}

export default App;
