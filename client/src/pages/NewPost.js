import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'

import { usePosts } from "../context/postContext";
import { useUsers } from "../context/usersContext";



export default function NewPost() {
  const { createPost, getPost, updatePost } = usePosts();
  const { JWT } = useUsers();
  
  const navigate = useNavigate();
  const params = useParams();
 
  // creamos un useState para manejar los valores del post cuando queremos editar, asi , cuando viene la inforacion que queremos editar podemos modificar el valor inicial da los initialValues del FORMIK
  const [post, setPost] = useState({
    userid: 2,
    title: "",
    body: "",
    // image: null,
  });

  //verificamos si viene alguna paramatro (params) para ver si vamos a usar el formulario para crear o editar, ya que si lo vamos a editar vamos a cargar la informacion en los input (Field)
  useEffect(() => {
    // si tiene id , es xq queremos actualizar.
    // cramos una funcion "autoinvocada" ya que la funcion del useEffect no permite utilizar async de forma directa. Luego, automaticamente que cerramos la funcion , la ejecutamos, ()
    (async () => {
      if (params.id) {
        const res = await getPost(params.id);
        setPost(res);
      }
    })();
  }, [params.id, getPost]);

  const MySwal = withReactContent(Swal)
  return (
    <div className="h-screen w-full bg-gray-900">
      <div className="flex justify-center">
        <h2 className="text-white my-10">
          {params.id ? (
            <span>Editar Posts</span>
          ) : (
            <span>CREAR NUEVO POST</span>
          )}
        </h2>
      </div>
      <div className="flex items-center  justify-center ">
        <div className="bg-zinc-800 p-10 shadow-md shadow-black w-3/4">
          <header className="flex justify-between items-center py-4 text-white">
            <h3 className="text-xl">
              {params.id ? (
                <span>Editar Posts</span>
              ) : (
                <span>CREAR NUEVO POST</span>
              )}
            </h3>
            <Link to="/" className="text-gray-300 text-sm hover:text-gray-500">
              Go Home
            </Link>
          </header>
          <Formik
            initialValues={post}
            validationSchema={Yup.object({
              title: Yup.string().required(
                "El titulo es requerido y debe ser de tipo Texto"
              ),
              body: Yup.string().required(
                "La descripcion es requerida y debe ser de tipo Texto"
              ),
            })}
            onSubmit={async (values, actions) => {
              // antes de enviar la informacion a guardar , debemos identificar si es un nuevo post o un update,
              //para hace vamos a usar un condicional para verificar si existe un params, asi, de esta forma podemos
              // identificar si es un update o un create
              //console.log(values)
              if (params.id) {
                const res = await updatePost(params.id, values, JWT);
                //console.log("que onda con vos", res);
                res === 200 ?
                   MySwal.fire({
                      title: "success",
                      text: 'El post fue editado correctamente',
                      icon: "success",
                      timer: 1500,
                      timerProgressBar: true,
                      confirmButtonText: "ok",
                    })
                  : <></>
                     
                    ;
              } else {
                //console.log('este es el values',values);
                const res = await createPost(values, JWT);
                res === 200
                  ? MySwal.fire({
                      title: "success",
                      text: "el Post a sido Editado correctemanete",
                      icon: "success",
                      timer: 1500,
                      timerProgressBar: true,
                      confirmButtonText: "ok",
                    })
                  : <></>
              }
              actions.setSubmitting(false);
              //    una vez creado el post no redireccina al home
              navigate("/");
            }}
            enableReinitialize={true} //este metodo de Formik , para recargar el formulario, en este caso lo utilizamos para que cuando se modifique el estado cuando editamos, vuelva a cargar el formulario pero con los datos a editar, si lo colocamos en flse, no se carga los datos que tenemos en el estado
          >
            {/* handleSubmit es una funcion propia de FORMIK */}
            {({ handleSubmit, setFieldValue, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <label htmlFor="title" className="text-sm block text-gray-400">
                  Title
                </label>
                <Field
                  name="title"
                  placeholder="title"
                  className="px-3 py-2 rounded focus:outline-none bg-gray-600 text-white w-full mb-4"
                ></Field>
                <ErrorMessage
                  component="p"
                  className="text-red-600 text-sm"
                  name="title"
                />
                <label htmlFor="body" className="text-sm block text-gray-400">
                  Description
                </label>
                <Field
                  component="textarea"
                  rows="5"
                  name="body"
                  placeholder="description"
                  className="px-3 py-2 rounded focus:outline-none bg-gray-600 text-white w-full block"
                ></Field>
                <ErrorMessage
                  component="p"
                  className="text-red-600 text-sm"
                  name="body"
                />
                <label htmlFor="title" className="text-sm block text-gray-400">
                  Image
                </label>
                {/* <input
              onChange={(e)=> setFieldValue('image',e.target.files[0])}
                type="file"
                name="image"
                id=""
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
              /> */}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/60 hover:shadow-teal-500/30 text-white font-semibold rounded-lg"
                >
                  {isSubmitting ? (
                    <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 text-center" />
                  ) : (
                    "Save"
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
