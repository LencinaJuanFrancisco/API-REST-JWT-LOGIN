import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


const MySwal = withReactContent(Swal);

const HandelHerror=async({ err })=> {
  
  const modal = (errorMessage) =>{
     MySwal.fire({
      title: <strong>{errorMessage}</strong>, 
      timer: 5000,
      timerProgressBar: true,
      icon: "error",
    })
  }
  
  return (
    <div className="text-white bg-red-500 py-2 my-2 w-96 text-center rounded-lg shadow-lg shadow-red-500/60">
      {modal(err)}
      
    </div>
  );
}
export default HandelHerror