const v2 = require('cloudinary')

v2.config({  
    cloud_name:"dwtltggn7",
    api_key:"616388625615248",
    api_secret:"-QpZaPWI7S5anMDM1RB-HiDLKfg"
})

 const uploadImage = async filePath =>{
   return await v2.uploader.upload(filePath,{
        folder: 'Blogs UTN'
    })
}

 const deleteImage = async id=>{
    return await v2.uploader.destroy(id)
}
module.exports = {uploadImage,deleteImage}