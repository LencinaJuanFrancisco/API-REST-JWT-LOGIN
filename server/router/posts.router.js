const express = require('express')
const router = express.Router();
const { listAll, listOne, addOne, editOne, deleteOne } = require('../controllers/posts.controllers')
const isAuth = require('../middleware/isAuths')
const validatorCreatePost = require("../validators/posts.validator")

router.get("/", listAll)
router.post("/",  validatorCreatePost, addOne)//isAuth,sacamos la utorizacion para verificar el proceso de eliminacion
router.get("/:id", listOne)
router.post("/:id", validatorCreatePost, editOne)//isAuth,sacamos la utorizacion para verificar el proceso de eliminacion
router.delete('/:id',  deleteOne) //isAuth,sacamos la utorizacion para verificar el proceso de eliminacion


module.exports = router