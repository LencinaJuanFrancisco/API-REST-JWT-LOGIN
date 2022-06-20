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
  const [stateError, setStateError] = useState({
    loading: false,
    error: false,
    errorMessage: "",
  });
  const [JWT, setJWT] = useState(null);
  const [users, setUsers] = useState();
  const [userLogued, setUserLogued] = useState([]); //pongo los datos del usuario loguedado
  const [userRegister, setUserRegiste] = useState(""); //creo este estado asi, una ves registrodo lo redirecciono al login y carlo los datos sel usuario sin volver a solicitarlos

  const login = async (userLog) => {
    setStateError({ loading: true, error: false });
    const res = await loginReq(userLog);
    
    if (res.status === 200) {
      setStateError({ loading: false, error: false });
      setJWT(res.JWT);
      setUserLogued(res.user[0]);
      navigate("/listPost");
    } else {
      setStateError({ loading: false, error: true, errorMessage: res.data.message });
    }
   
  };
  //creo una funcion para actualizar el estado
const newState=async()=>{
   const res = await getUsersReq()
   setUsers(res)
}
useEffect(() => {
  (async()=>{
    await newState()
  })()
}, []);

  const createUser = async (user) => {
    try {
     // console.log("entre al menos al createUser?---");
      setStateError({ loading: true, error: false, errorMessage: "" });
      const res = await createUserReq(user);
      //console.log("crete----", res.status);
      if (res.status === 400) {
        //console.log("---- y ---- ");
        setStateError({ loading: false, error: true, errorMessage: res.message });
      } else {
        //console.log("para grear usuario", res);
        setStateError({ loading: false, error: false, errorMessage: "" });
        await newState()
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
    try {
      await updateUserReq(id,upUser);
      await newState()
      navigate('/listUsers')
    } catch (error) {
      console.log(error);
    }
  };

  const logout = useCallback(() => {
    setJWT(null);
    navigate('/')
  }, [setJWT]);

  

  useEffect(()=>{
    setStateError({ loading: false, error: false, errorMessage: "" });
  },[])

  useEffect(()=>{
      setJWT(null)
  },[])

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
        setStateError,
        isLoginloading: stateError.loading,
        errorValue: stateError.error,
        errorMessage: stateError.errorMessage,
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
