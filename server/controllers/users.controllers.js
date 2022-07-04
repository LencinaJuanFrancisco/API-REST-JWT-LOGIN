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
  if (req.file != undefined) {
    try {
      const image = `${public_url}/${req.file.filename}`;
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

const deleteOne = async (req, res, next) => {
  if (notNumber(req.params.id, next)) return;
  const rtaDeleteOne = await deleteUserById(+req.params.id);
  if (rtaDeleteOne instanceof Error) return next(rtaDeleteOne);
  !rtaDeleteOne.affectedRows ? next() : res.status(204).end();
};

const register = async (req, res, next) => {
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
      const image =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Monsters_University_Logo.svg/1280px-Monsters_University_Logo.svg.png";
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
};
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
  process.env.client_id,
  process.env.client_secret,
  process.env.direct_uri
);
oAuth2Client.setCredentials({ refresh_token: process.env.refresh_token });

// var transport = nodemailer.createTransport({
//   host: "smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: process.env.email_user,
//     pass: process.env.email_pass,
//   },
//});

async function sendMail(link, userEmailTo) {
  try {
    var accessToken = await oAuth2Client.getAccessToken();
    var transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "juanfranciscolencina@gmail.com",
        clientId: process.env.client_id,
        clientSecret: process.env.client_secret,
        refreshToken: process.env.refresh_token,
      },
    });
    let mailDetails = {
      from: "tech.support@splinter",
      to: userEmailTo,
      subject: "Recuperación de contraseña",
      html: `<h2>Servicio de recuperación de contraseña</h2>
          <p>Para restablecer su contraseña, haga clic en el enlace y siga las instrucciones</p>
          <a href="${link}">click para recuperar tu contraseña</a>
          `,
    };
    const resTransport = await transport.sendMail(
      mailDetails,
      (error, data) => {
        if (error) {
          error.message = "Internal Server Error";
          console.log("error", error);
           return error
        } else{
          // return res.status(200).json({
          //   message: `Hola ${userName},  Te hemos enviado un correo electrónico con las instrucciones a ${userEmailTo}... Hurry up!`,
          // });
          console.log('esta ok');
           const status=200
           return status
        }
        
      }
    );
    return resTransport;
  } catch (error) {
    console.log(error);
  }
}

const forgot = async (req, res, next) => {
  // console.log('entra al back???', req.body.email);
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
  const resMail = await sendMail(link, user.email);
  console.log("respuesta de sentMail", resMail);
  return resMail
  // let mailDetails = {
  //   from: "tech.support@splinter",
  //   to: user.email,
  //   subject: "Recuperación de contraseña",
  //   html: `<h2>Servicio de recuperación de contraseña</h2>
  //       <p>Para restablecer su contraseña, haga clic en el enlace y siga las instrucciones</p>
  //       <a href="${link}">click para recuperar tu contraseña</a>
  //       `,
  // };
  // transport.sendMail(mailDetails, (error, data) => {
  //   if (error) {
  //     error.message = "Internal Server Error";
  //     res.status(500).json({ message: "error en el envio del email", error });
  //   } else
  //     res.status(200).json({
  //       message: `Hola ${user.name},  Te hemos enviado un correo electrónico con las instrucciones a ${user.email}... Hurry up!`,
  //     });
  // });
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
