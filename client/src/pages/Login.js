import React, { useState } from "react";
import loginImage from "../img/laptop.jpg";

import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik"; //, ErrorMessage
import { useUsers } from "../context/usersContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import HandelError from '../component/HandelEerror'

export default function Login() {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoginloading, hasLoginError, userRegister, errorMessage,setStateError,errorValue } =
    useUsers();
    

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
          initialValues={{ email: userRegister.email || "", password: "" }}
          // initialValues={{ email:userRegister.email, password:password }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("debe ser un tipo de email valido")
              .required("el campo es requerido"),
            password: Yup.string().required("el campo es requerido"),
          })}
          onSubmit={async (values) => {
            setUserName(values.email);
            setPassword(values.password);
            await login(values);
          }}
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
                SIGN IN
              </h2>
              <div className="flex flex-col text-gray-400 py-2">
                <label htmlFor="email">User Name</label>
                <Field
                  component="input"
                  name="email"
                  type="text"
                  className="rounded-lg  bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none "
                />
                <ErrorMessage
                  component="p"
                  className="text-red-600 text-sm"
                  name="email"
                />
              </div>
              <div className="flex flex-col text-gray-400 py-2">
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  autoComplete="on"
                  className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none "
                  type="password"
                />
                <ErrorMessage
                  component="p"
                  className="text-red-600 text-sm"
                  name="password"
                />
              </div>
              <div className="flex justify-between text-gray-400 py-2">
                <p>Forgot Password</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                type="submit"
                className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/30 text-white font-semibold rounded-lg"
              >
                Sign in
              </button>
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
