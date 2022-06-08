import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import NewPost from "./pages/NewPost";
import ListUsers from "./pages/ListUsers";
import { PostProvider } from "./context/postContext";
import { UsersProvider } from "./context/usersContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App bg-slate-700 ">
      <UsersProvider>
        <PostProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/listUsers" element={<ListUsers />} />
            <Route path="/newPost" element={<NewPost />} />
            <Route path="/editPost/:id" element={<NewPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster></Toaster>
        </PostProvider>
      </UsersProvider>
    </div>
  );
}

export default App;
