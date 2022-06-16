const { tokenVerify } = require("../utils/handleJWT")

const isAuth = async (req, res, next) => {
    if (!req.headers.authorization) {
        let error = new Error("Necesita nurvos permisos para continuar")
        error.status = 403
        return next(error)
    }
    const token = req.headers.authorization.split(" ").pop()
    const validToken = await tokenVerify(token)
    if (validToken instanceof Error) {
        
        let error = new Error("Token expirado, debe volver a logearce")
        error.status = 403
        return next(error)
    }
    req.user = validToken
    next()
}
module.exports = isAuth