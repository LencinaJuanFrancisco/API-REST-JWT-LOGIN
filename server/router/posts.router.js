const express = require('express')
const router = express.Router();
const { listAll, listOne, addOne, editOne, deleteOne } = require('../controllers/posts.controllers')
const isAuth = require('../middleware/isAuths')
const validatorCreatePost = require("../validators/posts.validator")

router.get("/", listAll)
router.post("/",isAuth,  validatorCreatePost, addOne)//isAuth
router.get("/:id", listOne)
router.put("/:id",isAuth, validatorCreatePost, editOne)//isAuth
router.delete('/:id',isAuth,deleteOne) //isAuth


module.exports = router