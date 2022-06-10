import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {useNavigate} from 'react-router-dom'
import { loginReq, getUsersReq } from "../api/users";
const userContext = createContext();

export const useUsers = () => {
  const context = useContext(userContext);
  return context;
};

export const UsersProvider = ({ children }) => {
 const navigate = useNavigate()
  const [state, setState] = useState({ loading: false, error: false });
  const [JWT, setJWT] = useState(null);
  const [users, setUsers] = useState();
  const [userLogued,setUserLogued] = useState([])

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
          setState({ loading: false, error: true });
        
      }
      //return res.data;
   
  };
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
        logout,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
