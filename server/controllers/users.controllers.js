const {
  getAllUsers,
  getUserById,
  getUserByEmail,
  addNewUser,
  deleteUserById,
  editUserById,
  loginUser,
} = require("../Model/users.model");
const notNumber = require("../utils/notNumber");
const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign, tokenVerify } = require("../utils/handleJWT");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");
const public_url = process.env.public_url;
const public_url_react = process.env.public_url_react;
const { uploadImage, deleteImage } = require("../libs/cloudinary");

const fs = require("fs-extra");

const allUser = async (req, res, next) => {
  const rtaAllUser = await getAllUsers();
  //si hay error mando ?
  if (rtaAllUser instanceof Error) return next(rtaAllUser);
  //si no, genero un nuevo array sin el password
  const allUser = rtaAllUser.map((user) => {
    const filterUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    };
    return filterUser;
  });
  rtaAllUser.length ? res.status(200).json(allUser) : next();
};
const listOne = async (req, res, next) => {
  if (notNumber(req.params.id, next)) return;
  const rtaListOne = await getUserById(+req.params.id);
  if (rtaListOne instanceof Error) return next(rtaListOne);
  if (!rtaListOne.length) return next();
  const { id, name, email, image } = rtaListOne[0];
  const rta = {
    id,
    name,
    email,
    image,
  };
  //console.log('listOne',rta);
  res.status(200).json(rta);
};

const editOne = async (req, res, next) => {
  if (notNumber(req.params.id, next)) return;
  
    if (req.files) {
      console.log('entre al if',req.files);
      try {
      const result = await uploadImage(req.files.image.tempFilePath);
       const image = result.secure_url
       console.log('IMG',image);
        //una ves que se guarda la url en el registro de la db,y ma img sube a cloudinary, eliminamos el archivo local con fs, utilizamos fs-extra ya que esta version soporta async await
        await fs.remove(req.files.image.tempFilePath);
    
      const password = await encrypt(req.body.password);
      await editUserById(+req.params.id, { ...req.body, password, image });
      res.status(200).json({
        status: 200,
        message: "User Modified!",
        users: { ...req.body },
      });
    } catch (error) {
      next(error);
      // if (rtaEditOne instanceof Error) return next(rtaEditOne)
    }
  } else {
    try {
      const password = await encrypt(req.body.password);
      await editUserById(+req.params.id, { ...req.body, password });
      res.status(200).json({
        status: 200,
        message: "User Modified!",
        users: { ...req.body },
      });
    } catch (error) {
      next(error);
    }
  }
};
// const editOne = async (req, res, next) => {
//   if (notNumber(req.params.id, next)) return;
//   if (req.file != undefined) {
//     try {
//       const image = `${public_url}/${req.file.filename}`;
//       const password = await encrypt(req.body.password);
//       await editUserById(+req.params.id, { ...req.body, password, image });
//       res.status(200).json({
//         status: 200,
//         message: "User Modified!",
//         users: { ...req.body },
//       });
//     } catch (error) {
//       next(error);
//       // if (rtaEditOne instanceof Error) return next(rtaEditOne)
//     }
//   } else {
//     try {
//       const password = await encrypt(req.body.password);
//       await editUserById(+req.params.id, { ...req.body, password });
//       res.status(200).json({
//         status: 200,
//         message: "User Modified!",
//         users: { ...req.body },
//       });
//     } catch (error) {
//       next(error);
//     }
//   }
// };

const deleteOne = async (req, res, next) => {
  if (notNumber(req.params.id, next)) return;
  const rtaDeleteOne = await deleteUserById(+req.params.id);
  if (rtaDeleteOne instanceof Error) return next(rtaDeleteOne);
  !rtaDeleteOne.affectedRows ? next() : res.status(204).end();
};

const register = async (req, res, next) => {
  if (req.files) {
    const result = await uploadImage(req.files.image.tempFilePath);
    (image = result.secure_url),
      //una ves que se guarda la url en el registro de la db,y ma img sube a cloudinary, eliminamos el archivo local con fs, utilizamos fs-extra ya que esta version soporta async await
      await fs.remove(req.files.image.tempFilePath);
    const password = await encrypt(req.body.password);
    //console.log("pass", password);
    const newUser = await getUserByEmail(req.body.email);
    console.log(newUser.length);
    if (newUser.length > 0) {
      let error = new Error(
        "El email con el que quiere registrarse ya existe!!!"
      );
      error.status = 401;
      next(error);
    } else {
      const rtaRegister = await addNewUser({ ...req.body, password, image });
      if (rtaRegister instanceof Error) return next(rtaRegister);
      res
        .status(201)
        .json({ status: 201, message: "User Created", user: newUser });
    }
  } else {
    const image = "https://source.unsplash.com/640x390/?tech,app"
    const password = await encrypt(req.body.password);
    //console.log("pass", password);
    const newUser = await getUserByEmail(req.body.email);
   
    if (newUser.length > 0) {
      let error = new Error(
        "El email con el que quiere registrarse ya existe!!!"
      );
      error.status = 401;
      next(error);
    } else {
      const rtaRegister = await addNewUser({ ...req.body, password, image });
      if (rtaRegister instanceof Error) return next(rtaRegister);
      res
        .status(201)
        .json({ status: 201, message: "User Created", user: newUser });
    }
  }
  // } catch (error) {
  //   //console.log("son iguales");
  //   return res.status(400).json({ status: 400, message: error });
  // }
  // console.log(verifyEmail);
};

/*const register = async (req, res, next) => {
  const cleanBody = matchedData(req);
  try {
    if (req.file) {
      const image = `${public_url}/${req.file.filename}`;
      const password = await encrypt(req.body.password);
      const rtaRegister = await addNewUser({ ...cleanBody, password, image });
      if (rtaRegister instanceof Error) return next(rtaRegister);

      const newUser = await getUserByEmail(req.body.email);

      res
        .status(201)
        .json({ status: 201, message: "User Created", user: newUser });
    } else {
      const image = "https://source.unsplash.com/640x390/?tech,app"
      const password = await encrypt(req.body.password);
      const rtaRegister = await addNewUser({ ...cleanBody, password, image });
      if (rtaRegister instanceof Error) return next(rtaRegister);

      const newUser = await getUserByEmail(req.body.email);
      //console.log('cree uno SIN imagen');
      res
        .status(201)
        .json({ status: 201, message: "User Created", user: newUser });
    }
  } catch (error) {
    //console.log("son iguales");
    return res
      .status(400)
      .json({ status: 400, message: "Usuario ya registrado" });
  }
  // console.log(verifyEmail);
};*/
const login = async (req, res, next) => {
  //console.log('estoy en log lpm');
  const dbResponse = await loginUser(req.body.email);
  if (!dbResponse.length) return next();
  //console.log(req.body.password, dbResponse[0].password);
  if (await compare(req.body.password, dbResponse[0].password)) {
    const user = {
      id: dbResponse[0].id,
      name: dbResponse[0].name,
      email: dbResponse[0].email,
    };
    const token = await tokenSign(user, "10m");
    const rtaListOne = await getUserById(user.id);
    res.status(200).json({
      status: 200,
      message: "User logged in!",
      JWT: token,
      user: rtaListOne,
    });
  } else {
    let error = new Error("algunos de los datos son incorrectos");
    error.status = 401;
    next(error);
  }
};

// congiguracion para google
const oAuth2Client = new google.auth.OAuth2(
  "278308160168-5ertqp6hre9419kkg1ed1nbqnatvql4m.apps.googleusercontent.com",
  "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",
  "https://developers.google.com/oauthplayground"
);
oAuth2Client.setCredentials({
  refresh_token:
    "1//04nleuH35NwIMCgYIARAAGAQSNwF-L9Ir_hUcQRxSwaevkpARXRGhYpuPcLYbNlrnlhCm7F472XkQlegr2Mk1qD5_YA8Fe7CKAy0",
});

const forgot = async (req, res, next) => {
  console.log("entra al back???", req.body.email);
  const dbResponse = await loginUser(req.body.email);
  if (!dbResponse.length)
    return res
      .status(404)
      .json({ status: 404, message: "Usuario no encontrado" });
  const user = {
    id: dbResponse[0].id,
    name: dbResponse[0].name,
    email: dbResponse[0].email,
  };
  const token = await tokenSign(user, "15m");
  const link = `${public_url_react}/users/reset/${token}`;

  var transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "juanfranciscolencina@gmail.com",
      clientId:
        "278308160168-5ertqp6hre9419kkg1ed1nbqnatvql4m.apps.googleusercontent.com",
      clientSecret: "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",
      refreshToken:
        "1//04nleuH35NwIMCgYIARAAGAQSNwF-L9Ir_hUcQRxSwaevkpARXRGhYpuPcLYbNlrnlhCm7F472XkQlegr2Mk1qD5_YA8Fe7CKAy0",
    },
  });
  let mailDetails = {
    from: "tech.support@splinter",
    to: user.email,
    subject: "Recuperaci??n de contrase??a",
    html: `<h2>Servicio de recuperaci??n de contrase??a</h2>
        <p>Para restablecer su contrase??a, haga clic en el enlace y siga las instrucciones</p>
        <a href="${link}">click para recuperar tu contrase??a</a>
        `,
  };
  transport.sendMail(mailDetails, (error, data) => {
    if (error) {
      error.message = "Internal Server Error";
      console.log("error", error);
      res.status(500).json({ message: "error en el envio del email", error });
    } else {
      res.status(200).json({
        message: `Hola ${user.name},  Te hemos enviado un correo electr??nico con las instrucciones a ${user.email}... Hurry up!`,
      });
    }
  });
};
//FORM -> reset password
const reset = async (req, res, next) => {
  const { token } = req.params;
  const tokenStatus = await tokenVerify(token);
  if (tokenStatus instanceof Error) {
    res.status(400).json(tokenStatus);
  } else res.status(200).json("reset", { tokenStatus, token });
};
const saveNewPass = async (req, res, next) => {
  const { token } = req.params;
  console.log("token", token);
  const tokenStatus = await tokenVerify(token);
  if (tokenStatus instanceof Error) return res.status(400).json(tokenStatus);
  const password = await encrypt(req.body.password);
  const dbResponse = await editUserById(tokenStatus.id, { password });
  dbResponse instanceof Error
    ? next(dbResponse)
    : res.status(200).json({
        status: 200,
        message: `Password changed for user ${tokenStatus.name}`,
      });
};

module.exports = {
  allUser,
  listOne,
  register,
  deleteOne,
  editOne,
  login,
  forgot,
  reset,
  saveNewPass,
};
