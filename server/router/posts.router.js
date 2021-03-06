const express = require('express')
const router = express.Router();
const { listAll, listOne, addOne, editOne, deleteOne } = require('../controllers/posts.controllers')
const isAuth = require('../middleware/isAuths')
const validatorCreatePost = require("../validators/posts.validator")
const uploadFile = require("../utils/handleStorage")

router.get("/", listAll)
router.post("/",isAuth, uploadFile.single("image"), validatorCreatePost, addOne)
router.get("/:id", listOne)
router.put("/:id",isAuth,uploadFile.single("image"), validatorCreatePost, editOne)
router.delete('/:id',isAuth,deleteOne) 


module.exports = router