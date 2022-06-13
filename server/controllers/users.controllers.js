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
const public_url = process.env.public_url;

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
  res.status(200).json(rta);
};
const editOne = async (req, res, next) => {
  if (notNumber(req.params.id, next)) return;
  if (req.file != undefined) {
    try {
      const image = `${public_url}/${req.file.filename}`;
      await editUserById(+req.params.id, { ...req.body, image });
      res.status(200).json({ message: "User Modified!" });
    } catch (error) {
      next(error);
      // if (rtaEditOne instanceof Error) return next(rtaEditOne)
    }
  } else {
    try {
      await editUserById(+req.params.id, { ...req.body });
      res.status(200).json({ message: "User Modified!" });
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
      //console.log('cree uno CON imagen');
      res.status(201).json({status:201, message: "User Created", user: newUser });
    } else {
      const password = await encrypt(req.body.password);
      const rtaRegister = await addNewUser({ ...cleanBody, password });
      if (rtaRegister instanceof Error) return next(rtaRegister);
  
      const newUser = await getUserByEmail(req.body.email);
      //console.log('cree uno SIN imagen');
      res.status(201).json({status:201, message: "User Created", user: newUser });
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
    const token = await tokenSign(user, "1h");
    const rtaListOne = await getUserById(user.id);
    res.status(200).json({
      status: 200,
      message: "User logged in!",
      JWT: token,
      user: rtaListOne,
    });
  } else {
    let error = new Error("Unauthorized");
    error.status = 401;
    next(error);
  }
};
var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.email_user,
    pass: process.env.email_pass,
  },
});
const forgot = async (req, res, next) => {
  const dbResponse = await loginUser(req.body.email);
  if (!dbResponse.length) return next();
  const user = {
    id: dbResponse[0].id,
    name: dbResponse[0].name,
    email: dbResponse[0].email,
  };
  const token = await tokenSign(user, "15m");
  const link = `${public_url}/users/reset/${token}`;

  let mailDetails = {
    from: "tech.support@splinter",
    to: user.email,
    subject: "Pasword Recovery with magic link",
    html: `<h2>Password Recovery Service</h2>
        <p>To reset your password, please click the link and follow the instructions</p>
        <a href="${link}">click to recover your password</a>
        `,
  };
  transport.sendMail(mailDetails, (error, data) => {
    if (error) {
      error.message = "Internal Server Error";
      res.next(error);
    } else
      res.status(200).json({
        message: `Hi ${user.name}, we've sent an email with instructions to ${user.email}... Hurry up!`,
      });
  });
};
//FORM -> reset password
const reset = async (req, res, next) => {
  const { token } = req.params;
  const tokenStatus = await tokenVerify(token);
  if (tokenStatus instanceof Error) {
    res.send(tokenStatus);
  } else res.render("reset", { tokenStatus, token });
};
const saveNewPass = async (req, res, next) => {
  const { token } = req.params;
  const tokenStatus = await tokenVerify(token);
  if (tokenStatus instanceof Error) return res.send(tokenStatus);
  const password = await encrypt(req.body.password_1);
  const dbResponse = await editUserById(tokenStatus.id, { password });
  dbResponse instanceof Error
    ? next(dbResponse)
    : res
        .status(200)
        .json({ message: `Password changed for user ${tokenStatus.name}` });
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
