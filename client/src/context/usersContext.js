import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {useNavigate} from 'react-router-dom'
import { loginReq, getUsersReq ,createUserReq} from "../api/users";
const userContext = createContext();

export const useUsers = () => {
  const context = useContext(userContext);
  return context;
};

export const UsersProvider = ({ children }) => {
 const navigate = useNavigate()
  const [state, setState] = useState({ loading: false, error: false, errorMessage:"" });
  const [JWT, setJWT] = useState(null);
  const [users, setUsers] = useState();
  const [userLogued,setUserLogued] = useState([])//pongo los datos del usuario loguedado
  const [userRegister,setUserRegiste]=useState('')//creo este estado asi, una ves registrodo lo redirecciono al login y carlo los datos sel usuario sin volver a solicitarlos

  const login = async (userLog) => {
   
      setState({ loading: true, error: false });
      const res = await loginReq(userLog);
      // console.log("----", res.user[0].name);
      if (res.status === 200) {
        setState({ loading: false, error: false });
        setJWT(res.JWT);
        setUserLogued(res.user[0])
       
        navigate('/')
    } else {
          setState({ loading: false, error: true ,errorMessage:"Algunos datos son incorrectos"});
        
      }
      //return res.data;
   
  };
  const createUser=async(user)=>{
    try{
      const res = await createUserReq(user)
      if(res.status === 204){
        setState({ loading: false, error: true ,errorMessage:"Usuario ya registrado "});
      }else{
       setUsers([...users,res.data.user[0]])
       setUserRegiste(res.data.user[0])
       navigate('/login')
      }
    }catch(error){
      console.error(error)
    }
  }
  const getUsers = async () => {
    const res = await getUsersReq();
    setUsers(res);
  };
  const logout = useCallback(() => {
    setJWT(null);
  }, [setJWT]);
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <userContext.Provider
      value={{
        userLogued,
        setUserLogued,
        users,
        setUsers,
        getUsers,
        login,
        JWT,
        setJWT,
        isLoginloading: state.loading,
        hasLoginError: state.error,
        errorMessage:state.errorMessage,
        logout,
        createUser,
        userRegister,setUserRegiste
      }}
    >
      {children}
    </userContext.Provider>
  );
};
