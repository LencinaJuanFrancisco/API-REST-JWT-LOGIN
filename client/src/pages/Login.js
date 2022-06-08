import React from "react";
import loginImage from "../img/laptop.jpg";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { Link ,useNavigate} from "react-router-dom";
import { Formik, Form, Field ,ErrorMessage} from "formik"; //, ErrorMessage
import { useUsers } from "../context/usersContext";


export default function Login() {
  const navigate = useNavigate
  const { login,usersLogued } = useUsers();

  const isLogued = () => {
    
  
        }
  
 

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={loginImage} alt="" />
      </div>
      <div className="bg-gray-800 flex flex-col justify-center">
        
         
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={
            Yup.object({
              email: Yup.string().email("debe ser un tipo de email valido").required('el campo es requerido'),
              password: Yup.string().required('el campo es requerido')
            })}
          onSubmit={ (values) => {
             login(values);
          }}
        >
          {({handleSubmit}) => (
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
        <h2 className="text-4xl text-white font-bold text-center">SIGN IN</h2>
              <div className="flex flex-col text-gray-400 py-2">
                <label htmlFor="email">User Name</label>
                <Field
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
                e.stopPropagation()
                isLogued()}}
               type="submit"
                className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/30 text-white font-semibold rounded-lg"
              >
                Sign in
              </button>
            </Form>
          )}
        </Formik>

        
      </div>
    </div>
  );
}
