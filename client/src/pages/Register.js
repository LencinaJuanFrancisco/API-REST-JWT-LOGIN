import React, { useEffect , useState} from "react";
import loginImage from "../img/laptop.jpg";
import { Link,useParams,useNavigate } from "react-router-dom";
import { Formik, Form, Field,ErrorMessage } from "formik"; //, ErrorMessage
import HandelError from '../component/HandelEerror'

import { useUsers } from "../context/usersContext";
import * as Yup from "yup";



export default function Login() {
 
  const params = useParams()
 
  const { createUser,errorMessage,hasLoginError,getUser,updateUser,setStateError,errorValue } = useUsers();

  // creamos un useState para manejar los valores del post cuando queremos editar, asi , cuando viene la inforacion que queremos editar podemos modificar el valor inicial da los initialValues del FORMIK
  const [user, setUser] = useState({
    name: "",
    email: "",
    password:"",
    image: "",
  });
//verificamos si viene alguna paramatro (params) para ver si vamos a usar el formulario para crear o editar, ya que si lo vamos a editar vamos a cargar la informacion en los input (Field)
  useEffect(()=>{
    // si tiene id , es xq queremos actualizar.
    // cramos una funcion "autoinvocada" ya que la funcion del useEffect no permite utilizar async de forma directa. Luego, automaticamente que cerramos la funcion , la ejecutamos, ()
    (async()=>{
      if(params.id){
        const res = await getUser(params.id)
        console.log('esto me llego al Register', res);
        setUser(res)
      }
    })()
  },[params.id])
 
  //creo una funcion para manejar el tiempo del error
  const runSetTime = () => {
  
    setStateError({ error: false, errorMessage: " " });
  };


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="bg-gray-800 flex flex-col justify-center">
        <Formik
          initialValues={user}
          
          validationSchema={
            Yup.object({
              name: Yup.string().required("el nombre es requerido").min(2,"el nombre debe contener como minimo 2 caracteres").max(90,"el nombre debe contener un maximo de 90 caracteres"),
              email: Yup.string().email("debe ser un tipo de email valido").required('el campo es requerido'),
              password: Yup.string().required('el campo es requerido').min(8,"debe contener al menos 8 caracteres").max(15,"no debe super un maximo de 15 caracteres"),
            })
          }
          onSubmit={async (values) => {
            if(params.id){
              await updateUser(params.id,values)
            }else{
              await createUser(values)
            }
           
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
                  login
                </Link>
              </header>
              <h2 className="text-4xl text-white font-bold text-center">
               { params.id ? <span>Editar</span> : <span>Register</span> }
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
               {params.id ? <span>Edit</span> : <span>Register</span> }
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
