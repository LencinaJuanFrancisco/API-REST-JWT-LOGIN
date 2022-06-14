import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  loginReq,
  getUsersReq,
  getUserReq,
  createUserReq,
  deleteUserReq,
  updateUserReq
} from "../api/users";
const userContext = createContext();

export const useUsers = () => {
  const context = useContext(userContext);
  return context;
};

export const UsersProvider = ({ children }) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    loading: false,
    error: false,
    errorMessage: "",
  });
  const [JWT, setJWT] = useState(null);
  const [users, setUsers] = useState();
  const [userLogued, setUserLogued] = useState([]); //pongo los datos del usuario loguedado
  const [userRegister, setUserRegiste] = useState(""); //creo este estado asi, una ves registrodo lo redirecciono al login y carlo los datos sel usuario sin volver a solicitarlos

  const login = async (userLog) => {
    setState({ loading: true, error: false });
    const res = await loginReq(userLog);
    
    if (res.status === 200) {
      setState({ loading: false, error: false });
      setJWT(res.JWT);
      setUserLogued(res.user[0]);

      navigate("/");
    } else {
      setState({ loading: false, error: true, errorMessage: res.data.message });
    }
   
  };
  const createUser = async (user) => {
    try {
     // console.log("entre al menos al createUser?---");
      setState({ loading: true, error: false, errorMessage: "" });
      const res = await createUserReq(user);
      //console.log("crete----", res.status);
      if (res.status === 400) {
        //console.log("---- y ---- ");
        setState({ loading: false, error: true, errorMessage: res.message });
      } else {
        //console.log("para grear usuario", res);
        setState({ loading: false, error: false, errorMessage: "" });
        setUsers([...users, res.user[0]]);
        setUserRegiste(res.user[0]);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };
  //all users
  const getUsers = async () => {
    const res = await getUsersReq();
    setUsers(res);
  };
  //one user
  const getUser = async (id) => {
    //console.log('llega el id aca getUser',id);
    const res = await getUserReq(id);
    return res;
  };
  //update User
  const updateUser = async (id,upUser) => {
    const res = await updateUserReq(id,upUser);
    console.log('respuesta del contex',res);
    setUsers(users.map(user=> user.id === id ? {...res} : user))
    //navigate('/listUsers')
  };

  const logout = useCallback(() => {
    setJWT(null);
  }, [setJWT]);

  useEffect(() => {
    (async()=>{
      const res = await getUsersReq()
      setUsers(res)
    })()
  }, []);

  const deleteUser = async (id) => {
    const res = await deleteUserReq(id);
    console.log("deleteUser--->", res);
    //buscamos el post para actualizar el estado
    setUsers(users.filter((user) => user.id !== id));
    
  };

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
        errorMessage: state.errorMessage,
        logout,
        createUser,
        userRegister,
        setUserRegiste,
        deleteUser,
        getUser,
        updateUser,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
