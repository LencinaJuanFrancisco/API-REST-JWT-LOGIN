import { Routes,Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login'
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import NewPost from './pages/NewPost'
import {PostProvider} from './context/postContext'

function App() {
  return (
    <div className="App">
      <PostProvider>

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/newPost' element={<NewPost/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      </PostProvider>
    </div>
  );
}

export default App;
