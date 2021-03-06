const router = require('express').Router();
const { allUser, listOne, register, deleteOne, editOne, login, forgot, reset, saveNewPass } = require('../controllers/users.controllers')
const { validatorCreateUser, validatorEditUser, validatorResetPassword } = require('../validators/user.validator')
const uploadFile = require("../utils/handleStorage")


router.get('/', allUser)
router.get('/:id', listOne)
router.post('/register', register)//validatorCreateUser,
router.put('/:id',  editOne)//validatorEditUser,
router.post('/login', login)
router.post("/forgot-password", forgot)
router.get('/reset/:token', reset)
router.post('/reset/:token',  saveNewPass)//validatorResetPassword,
router.delete('/:id', deleteOne)

module.exports = router;