import React from "react";
import BtnLogAndReg from "./BtnLogAndReg";
import HomePosts from "./HomePosts"
import HomeUsers from "./HomeUsers";
export default function Header({ JWT }) {
  return (
    <div className="flex flex-col z-0  mx-auto  overflow-hidden bg-gradient-to-r from-gray-800 to-gray-800 ">
      <div className="relative z-20 flex w-full min-h-screen px-5 pt-20 mx-auto sm:px-12 sm:h-screen max-w-7xl sm:pt-0 lg:px-0">
        <div className="w-full md:w-2/3">
          <div className="flex flex-col items-start justify-center w-full h-full pb-20">
            <div className="relative w-full lg:pl-10">
              <div className="flex items-center justify-center bg-white rounded-lg w-12 h-12 sm:rounded-xl">
                <svg className="w-12 h-12" fill="none">
                  <path
                    d="m.848 15.848 5.304 5.304L11 16.304l4.848 4.848 5.304-5.304L16.304 11l4.848-4.848L15.848.848 11 5.696 6.152.848.848 6.152 5.696 11 .848 15.848Zm30 0 5.304 5.304L41 16.304l4.848 4.848 5.304-5.304L46.304 11l4.848-4.848L45.848.848 41 5.696 36.152.848l-5.304 5.304L35.696 11l-4.848 4.848ZM11 37.25v7.5h30v-7.5H11Z"
                    fill="#000"
                  />
                </svg>
              </div>
              <h1
                className="relative z-0 w-full max-w-md py-2 text-4xl font-black text-left text-white sm:py-5 sm:text-6xl"
                data-unsp-sanitized="clean"
              >
                My Blogs
              </h1>
            </div>

            <div className="flex flex-col items-start my-4 text-left lg:pl-10">
              <p className="max-w-md mb-10 text-base font-light text-gray-200 sm:text-lg lg:text-xl dark:text-dark-200">
                Bienvenidos a la aplicacion para crear Post.Deberas registarte,
                luego logearte y podras tener acceso a la edicion, creacion y
                eliminacion de los posts y los usuarios.
                Si creas un usuario con un email vedadero, podras recuperar tu contraseña. 
              </p>

              <div className="relative flex flex-col items-center justify-start w-full space-y-5 sm:w-auto lg:space-y-0 lg:space-x-5 lg:flex-row">
                
                {!JWT && <BtnLogAndReg />}
              
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-0 md:w-1/2"></div>
      </div>
      <div className="absolute  top-0 left-0 z-0 flex items-start justify-center w-full h-screen overflow-hidden opacity-75">
        <div className="relative z-20 w-1/2">
          <div className="absolute top-0 left-0 w-full h-screen bg-gradient-to-r from-tael-500 to-tael-500"></div>
        </div>
        <div className="relative z-10 w-1/2 ">
          <div className="absolute top-0 right-0 hidden w-full h-full sm:block">
            <div className="flex items-center justify-center w-screen h-screen transform scale-75 -rotate-12 -translate-x-80 sm:-translate-x-64 sm:scale-125 md:scale-125 min-w-persp md:-translate-x-24">
              <div className="flex flex-col flex-wrap items-start justify-start w-full h-screen mx-auto space-x-3 space-y-3 transformPerspective">
                <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm mt-3 ml-3">
                  <img
                    src="https://source.unsplash.com/640x390/?tech,app"
                    className="object-cover w-full h-auto"
                  />
                </div>
                <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                  <img
                    src="https://source.unsplash.com/640x390/?tech,app"
                    className="object-cover w-full h-auto"
                  />
                </div>
                <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                  <img
                    src="https://source.unsplash.com/640x390/?tech,app"
                    className="object-cover w-full h-auto"
                  />
                </div>
                <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                  <img
                    src="https://source.unsplash.com/640x390/?tech,app"
                    className="object-cover w-full h-auto"
                  />
                </div>
                <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                  <img
                    src="https://source.unsplash.com/640x390/?tech,app"
                    className="object-cover w-full h-auto"
                  />
                </div>
                <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                  <img
                    src="https://source.unsplash.com/640x390/?tech,app"
                    className="object-cover w-full h-auto"
                  />
                </div>
                <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                  <img
                    src="https://source.unsplash.com/640x390/?tech,app"
                    className="object-cover w-full h-auto"
                  />
                </div>
                <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                  <img
                    src="https://source.unsplash.com/640x390/?tech,app"
                    className="object-cover w-full h-auto"
                  />
                </div>
                <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                  <img
                    src="https://source.unsplash.com/640x390/?tech,app"
                    className="object-cover w-full h-auto"
                  />
                </div>
                <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                  <img
                    src="https://source.unsplash.com/640x390/?tech,app"
                    className="object-cover w-full h-auto"
                  />
                </div>
                <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                  <img
                    src="https://source.unsplash.com/640x390/?tech,app"
                    className="object-cover w-full h-auto"
                  />
                </div>
                <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                  <img
                    src="https://source.unsplash.com/640x390/?tech,app"
                    className="object-cover w-full h-auto"
                  />
                </div>
                <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                  <img
                    src="https://source.unsplash.com/640x390/?tech,app"
                    className="object-cover w-full h-auto"
                  />
                </div>
                <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                  <img
                    src="https://source.unsplash.com/640x390/?tech,app"
                    className="object-cover w-full h-auto"
                  />
                </div>
                <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                  <img
                    src="https://source.unsplash.com/640x390/?tech,app"
                    className="object-cover w-full h-auto"
                  />
                </div>
                <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                  <img
                    src="https://source.unsplash.com/640x390/?tech,app"
                    className="object-cover w-full h-auto"
                  />
                </div>
                <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                  <img
                    src="https://source.unsplash.com/640x390/?tech,app"
                    className="object-cover w-full h-auto"
                  />
                </div>
                <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                  <img
                    src="https://source.unsplash.com/640x390/?tech,app"
                    className="object-cover w-full h-auto"
                  />
                </div>
                <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                  <img
                    src="https://source.unsplash.com/640x390/?tech,app"
                    className="object-cover w-full h-auto"
                  />
                </div>
                <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                  <img
                    src="https://source.unsplash.com/640x390/?tech,app"
                    className="object-cover w-full h-auto"
                  />
                </div>
                <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                  <img
                    src="https://source.unsplash.com/640x390/?tech,app"
                    className="object-cover w-full h-auto"
                  />
                </div>
                <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                  <img
                    src="https://source.unsplash.com/640x390/?tech,app"
                    className="object-cover w-full h-auto"
                  />
                </div>
                <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                  <img
                    src="https://source.unsplash.com/640x390/?tech,app"
                    className="object-cover w-full h-auto"
                  />
                </div>
                <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                  <img
                    src="https://source.unsplash.com/640x390/?tech,app"
                    className="object-cover w-full h-auto"
                  />
                </div>
                <div className="h-auto bg-gray-200 bg-cover rounded-lg overflow-hidden bg-top-center w-auto max-w-sm">
                  <img
                    src="https://source.unsplash.com/640x390/?tech,app"
                    className="object-cover w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 left-0 z-50 w-full h-screen bg-gradient-to-r from-gray-800 t to-transparent"></div>
        </div>
      </div>
      <div>
      <HomeUsers/>
      </div>
      <div>
      <HomePosts/>
        
      </div>
    </div>
  );
}
