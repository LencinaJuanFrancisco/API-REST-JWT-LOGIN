import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { usePosts } from "../context/postContext";
import { Formik,Form,Field,ErrorMessage } from "formik";
import * as Yup from "yup";
import {AiOutlineLoading3Quarters} from 'react-icons/ai'


export default function NewPost() {
const {createPost,getPost,updatePost}= usePosts()
const navigate= useNavigate()
const params = useParams();
// creamos un useState para manejar los valores del post cuando queremos editar, asi , cuando viene la inforacion que queremos editar podemos modificar el valor inicial da los initialValues del FORMIK
const [post, setPost] = useState({
  userid:2,
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
}, [params.id]);

  return (
    <div className="h-screen w-full bg-gray-900">
     
      <div className="flex justify-center">
        <h2 className="text-white my-10">CREAR NUEVO POST</h2>
      </div>
      <div className="flex items-center  justify-center ">
      <div className="bg-zinc-800 p-10 shadow-md shadow-black w-3/4">
        <header className="flex justify-between items-center py-4 text-white">
          <h3 className="text-xl">New Post</h3>
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
              await updatePost(params.id, values);
            } else {
              console.log('este es el values',values);
              await createPost(values);
            
            }
            actions.setSubmitting(false)
            //    una vez creado el post no redireccina al home
           navigate("/");
          }}
          enableReinitialize={true}
        >
          {/* handleSubmit es una funcion propia de FORMIK */}
          {({ handleSubmit, setFieldValue,isSubmitting }) => (
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
              <label
                htmlFor="body"
                className="text-sm block text-gray-400"
              >
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
                ): 'Save'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>  
    </div>
  );
}
