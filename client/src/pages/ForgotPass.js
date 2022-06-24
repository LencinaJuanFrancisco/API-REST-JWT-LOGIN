import React from "react";
import loginImage from "../img/laptop.jpg";
import { Link, } from "react-router-dom";
import { Formik, Form, Field,ErrorMessage } from "formik"; //, ErrorMessage
import HandelError from '../component/HandelEerror'
import { useUsers } from "../context/usersContext";

import * as Yup from "yup";



export default function ForgotPass() {
 

  const { login, isLoginloading, hasLoginError, userRegister, errorMessage,setStateError,errorValue,forgot } =
  useUsers();
  
    //creo una funcion para manejar el tiempo del error
    const runSetTime = () => {
      setStateError({ error: false, errorMessage: " " });
    };


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="bg-gray-800 flex flex-col justify-center">
        <Formik
          initialValues={{
            email:""
          }}
          
          validationSchema={
            Yup.object({
              email: Yup.string().email("debe ser un tipo de email valido").required('el campo es requerido'),
            })
          }
          onSubmit={async (values) => {
           //aca tengo que llamar a la funcion fotgot password
               await forgot(values)
            
           
          }}
          
          //esta funcio es de formik, y se utiliza para cargar los datos en el fomulario, es decir, formik carga inicialmete los datos vacios que se encuentran en el initialValue(),
          //luego cuando queremos editar y cargar con los datos que recogemos con el params, devemos recargar el formulario con los datos obtenido, enableReinitialize 
          enableReinitialize={true}
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
                  Login
                </Link>
              </header>
             
              
              <div className="flex flex-col text-gray-400 py-2">
                <label htmlFor="">Ingrese su email para recuperar su Password</label>
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
              
             

              <button
                type="submit"
                className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/30 text-white font-semibold rounded-lg"
              >
              <span>Enviar</span> 
              </button>
              {hasLoginError && <span className="text-red-600 text-sm">{errorMessage}</span>}
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
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={loginImage} alt="" />
      </div>
    </div>
  );
}
