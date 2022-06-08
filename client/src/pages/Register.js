import React from "react";
import loginImage from "../img/laptop.jpg";
import { Link } from "react-router-dom";
import { Formik, Form, Field } from "formik"; //, ErrorMessage
import { useUsers } from "../context/usersContext";
//import * as Yup from "yup";

export default function Login() {
  const { login } = useUsers();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      
      <div className="bg-gray-800 flex flex-col justify-center">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            await login(values);
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
                to="/login"
                className="text-gray-300 text-sm hover:text-gray-500 flex justify-end"
              >
                login
              </Link>
            </header>
              <h2 className="text-4xl text-white font-bold text-center">Register</h2>
            <div className="flex flex-col text-gray-400 py-2">
                <label htmlFor="">Name</label>
                <Field
                  name="email"
                  type="text"
                  className="rounded-lg  bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none "
                />
              </div>
              <div className="flex flex-col text-gray-400 py-2">
                <label htmlFor="">Email</label>
                <Field
                  name="email"
                  type="text"
                  className="rounded-lg  bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none "
                />
              </div>
              <div className="flex flex-col text-gray-400 py-2">
                <label htmlFor="">Password</label>
                <Field
                  name="password"
                  className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none "
                  type="password"
                />
              </div>
              
              <button
               type="submit"
                className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/30 text-white font-semibold rounded-lg"
              >
                Register
              </button>
            </Form>
          )}
        </Formik>

        {/* <form className='max-w-[400px] w-full mx-auto  bg-gray-900 p-8 px-8 rounded-lg'>
               <div className='flex flex-col text-gray-400 py-2'>
                   <label htmlFor="">User Name</label>
                   <input className='rounded-lg  bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none ' type="text" />
               </div>
               <div className='flex flex-col text-gray-400 py-2'>
                   <label htmlFor="">Password</label>
                   <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none ' type="password" />
               </div>
               <div className='flex justify-between text-gray-400 py-2'>
                   <p className='flex items-center'><input className='mr-2' type="checkbox" name="" id="" />Remember Me</p>
                   <p>Forgot Password</p>
               </div>
               <button className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/30 text-white font-semibold rounded-lg'>Sign in</button>
           </form> */}
      </div>
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={loginImage} alt="" />
      </div>
    </div>
  );
}
