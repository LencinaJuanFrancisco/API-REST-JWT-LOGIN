//const url = "https://api-rest-jwt-utn.herokuapp.com"


export const getPosReq=async()=>{
   try {
       //const res = await axios.get('https://api-rest-jwt-utn.herokuapp.com/posts')
       
       const res =[{
           id:1,
           title:"hola mundo",
           body:"sarasa"
       },{
        id:2,
        title:"chau mundo",
        body:"sarasa"
    },{
        id:3,
        title:"otro mundo",
        body:"sarasa"
    }
    ]
       console.log(res);
       return res
       
   } catch (error) {
       console.log('vengo del getPosReq ',error);
   }
    
}