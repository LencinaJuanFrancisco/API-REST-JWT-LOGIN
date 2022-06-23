import { Routes, Route } from "react-router-dom";
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


import Header from "./component/Header";
import { useUsers } from "./context/usersContext";

function App() {
  const { logout, userLogued, JWT,users } = useUsers();

  return (
    <div className="App bg-slate-700 h-screen relative ">
      <PostProvider>
        {JWT && <MenuLogued logout={logout} userLogued={userLogued} />}
        {JWT && <BtnCRUD JWT={JWT} />}
       
        <Routes>
          <Route path="/" element={<Header JWT={JWT}  />} />
          <Route path="/listPosts" element={<ListPosts />} />
          <Route path="/register" element={<Register />} />
          <Route path="/editUser/:id" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/listUsers" element={<ListUsers />} />
          <Route path="/newPost" element={<NewPost />} />
          <Route path="/editPost/:id" element={<NewPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
       
      </PostProvider>
    </div>
  );
}

export default App;
