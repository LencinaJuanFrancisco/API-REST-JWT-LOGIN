const v2 = require('cloudinary')

v2.config({  
    cloud_name:process.env.cloud_name_cloudinary,
    api_key:process.env.api_key_cloudinary,
    api_secret:process.env.api_secret_cloudinary
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