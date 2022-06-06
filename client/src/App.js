import { Routes,Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login'
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import NewPost from './pages/NewPost'
import {PostProvider} from './context/postContext'
import {Toaster} from 'react-hot-toast'

function App() {
  return (
    <div className="App bg-slate-700 h-screen">
      <PostProvider>

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/newPost' element={<NewPost/>}/>
        <Route path='/newPost/:id' element={<NewPost/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      <Toaster></Toaster>
      </PostProvider>
    </div>
  );
}

export default App;
