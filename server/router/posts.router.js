const express = require('express')
const router = express.Router();
const { listAll, listOne, addOne, editOne, deleteOne } = require('../controllers/posts.controllers')
const isAuth = require('../middleware/isAuths')
const validatorCreatePost = require("../validators/posts.validator")

router.get("/", listAll)
router.post("/", isAuth, validatorCreatePost, addOne)
router.get("/:id", listOne)
router.post("/:id", isAuth, validatorCreatePost, editOne)
router.delete('/:id', isAuth, deleteOne)


module.exports = router