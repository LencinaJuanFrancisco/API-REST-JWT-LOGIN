import React from "react";
import loginImage from "../img/laptop.jpg";
import { Link } from "react-router-dom";
import { Formik, Form, Field,ErrorMessage } from "formik"; //, ErrorMessage

import { useUsers } from "../context/usersContext";
import * as Yup from "yup";


export default function Login() {
  const { login,createUser,errorMessage,hasLoginError } = useUsers();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="bg-gray-800 flex flex-col justify-center">
        <Formik
          initialValues={{name:"", email: "", password: "",image:"" }}
          validationSchema={
            Yup.object({
              name: Yup.string().required("el nombre es requerido").min(2,"el nombre debe contener como minimo 2 caracteres").max(90,"el nombre debe contener un maximo de 90 caracteres"),
              email: Yup.string().email("debe ser un tipo de email valido").required('el campo es requerido'),
              password: Yup.string().required('el campo es requerido').min(8,"debe contener al menos 8 caracteres").max(15,"no debe super un maximo de 15 caracteres"),
            })
          }
          onSubmit={async (values) => {
            //console.log('CREATE USER',values);
            await createUser(values)
          }}
        >
          {({ handleSubmit,setFieldValue }) => (
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
              <h2 className="text-4xl text-white font-bold text-center">
                Register
              </h2>
              <div className="flex flex-col text-gray-400 py-2">
                <label htmlFor="">Name</label>
                <Field
                  name="name"
                  type="text"
                  className="rounded-lg  bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none "
                />
                <ErrorMessage 
                  component="p"
                  className="text-red-600 text-sm"
                  name= "name"
                />
              </div>
              <div className="flex flex-col text-gray-400 py-2">
                <label htmlFor="">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="rounded-lg  bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none "
                />
                <ErrorMessage 
                  component="p"
                  className="text-red-600 text-sm"
                  name= "email"
                />
              </div>
              <div className="flex flex-col text-gray-400 py-2">
                <label htmlFor="">Password</label>
                <Field
                  name="password"
                  type="password"
                  className="rounded-lg  bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none "
                />
                <ErrorMessage 
                  component="p"
                  className="text-red-600 text-sm"
                  name= "password"
                />
              </div>
              <div>
              <label htmlFor="title" className="text-sm block text-gray-400">
                Image
              </label>
              <input
              onChange={(e)=> setFieldValue('image',e.target.files[0])}
                type="file"
                name="image"
                id=""
                className="rounded-lg  bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none "
              />
              </div>

              <button
                type="submit"
                className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/30 text-white font-semibold rounded-lg"
              >
                Register
              </button>
              {hasLoginError && <span className="text-red-600 text-sm">{errorMessage}</span>}
            </Form>
          )}
        </Formik>
      </div>
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={loginImage} alt="" />
      </div>
    </div>
  );
}
