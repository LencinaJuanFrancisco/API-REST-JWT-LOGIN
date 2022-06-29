import React, { useState } from "react";
import loginImage from "../img/laptop.jpg";

import * as Yup from "yup";
import { Link,useNavigate ,useParams} from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik"; //, ErrorMessage
import { useUsers } from "../context/usersContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import HandelError from '../component/HandelEerror'
import Swal from "sweetalert2";

export default function Login() {

  const params = useParams()
  const token = params.token
  console.log('params',params);
  console.log('token',token);


  const { saveNewPass, isLoginloading, hasLoginError, errorMessage,setStateError,errorValue } =
    useUsers();
   const navigate = useNavigate() 

   //creo una funcion para manejar el tiempo del error
  const runSetTime = () => {
    setStateError({ error: false, errorMessage: " " });
  };

 

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={loginImage} alt="" />
      </div>
      <div className="bg-gray-800 flex flex-col justify-center">
        <Formik
          initialValues={{ password: "" }}
          // initialValues={{ email:userRegister.email, password:password }}
          validationSchema={Yup.object({
            password: Yup.string().required('el campo es requerido').min(8,"debe contener al menos 8 caracteres").max(15,"no debe super un maximo de 15 caracteres"),
            repitPassword: Yup.string().required('el campo es requerido').min(8,"debe contener al menos 8 caracteres").max(15,"no debe super un maximo de 15 caracteres"),
          })}
          onSubmit={async (values) => {
           if(values.password === values.repitPassword){
             const res = await saveNewPass(values.password,token);
             if(res.status === 200){
               Swal.fire(
                 'ENVIADO!',
                 'Se ha modificado correctamente !!!',
                 'success'
               )
               navigate('/login')
              
            }
             else{
              setStateError({ error: true, errorMessage: "Permisos vencidos, debera solicitar un nuevo cambio" });
              navigate('/forgot')
            }

           }else{
            setStateError({ error: true, errorMessage: "Las Contraseñas deben ser iguales" });
           }}
          }
        >
          {({ handleSubmit }) => (
            <Form
              onSubmit={handleSubmit}
              className="max-w-[400px] w-full mx-auto  bg-gray-900 p-8 px-8 rounded-lg"
            >
              <header className="flex justify-between">
                <Link
                  to="/"
                  className="text-gray-300 text-sm hover:text-gray-500 flex justify-end"
                >
                  Go Home
                </Link>
                <Link
                  to="/register"
                  className="text-gray-300 text-sm hover:text-gray-500 flex justify-end"
                >
                  register
                </Link>
              </header>
              <h2 className="text-4xl text-white font-bold text-center">
              Recuperación de contraseña
              </h2>
              
              <div className="flex flex-col text-gray-400 py-2">
                <label htmlFor="password">New Password</label>
                <Field
                  name="password"
                  autoComplete="on"
                  className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none "
                  type="password"
                />
                <ErrorMessage
                  component="p"
                  className="text-red-600 text-sm"
                  name="newPpassword"
                />
              </div>
              <div className="flex flex-col text-gray-400 py-2">
                <label htmlFor="password">Repetir Password</label>
                <Field
                  name="repitPassword"
                  autoComplete="on"
                  className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none "
                  type="password"
                />
                <ErrorMessage
                  component="p"
                  className="text-red-600 text-sm"
                  name="repitPassword"
                />
              </div>
              {/* <div className="flex justify-between text-gray-400 py-2">
                <button onClick={()=>{ navigate('/forgot')}} >Fortgot Password</button>
              </div> */}
              {!isLoginloading &&<button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                type="submit"
                className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/30 text-white font-semibold rounded-lg"
              >
                Cambiar Password
              </button>}
              {hasLoginError && (
                <strong className="text-red-500">{errorMessage}</strong>
              )}
              {isLoginloading && (
                <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 text-center text-teal-500 " />
              )}
            </Form>
          )}
        </Formik>
      </div>
      {errorValue && (
       <div className="flex justify-center my-4 py-2">
         <HandelError err={errorMessage} />
         {runSetTime()}
       </div>
     )}
    </div>
  );
}
