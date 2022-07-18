import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
    cloud_name:"dwtltggn7",
    api_key:"616388625615248",
    api_secret:"-QpZaPWI7S5anMDM1RB-HiDLKfg"
})

export const uploadImage = async filePath =>{
   return await cloudinary.uploader.upload(filePath,{
        folder: 'Blogs UTN'
    })
}

export const deleteImage = async id=>{
    return await cloudinary.uploader.destroy(id)
}