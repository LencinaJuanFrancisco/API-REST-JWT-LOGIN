const {
  addNewPost,
  getPostsWith,
  getAllPosts,
  editPost,
  listOnePost,
  deleteOnePost,
} = require("../Model/posts.model");
const { matchedData } = require("express-validator");
const notNumber = require("../utils/notNumber");
const public_url = process.env.public_url;
const imgDefault =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80";
const listAll = async (req, res, next) => {
  let rtaList = null;
  if (req.query.title) {
    rtaList = await getPostsWith(req.query.title);
  } else {
    rtaList = await getAllPosts();
  }
  if (rtaList instanceof Error) return next(rtaList);
  rtaList.length
    ? res.status(200).json(rtaList)
    : res.status(200).json({ message: "no hay posts" });
};
const addOne = async (req, res, next) => {
  const cleanBody = matchedData(req);
  try {
    if (req.file) {
      const image = `${public_url}/${req.file.filename}`;
      const rtaAdd = await addNewPost({ userid: 4, ...cleanBody, image });
      res.status(200).json({ id: rtaAdd.insertId, userid: 4, ...cleanBody });
      if (rtaAdd instanceof Error) return next(rtaAdd);
    } else {
      const rtaAdd = await addNewPost({ userid: 2, ...cleanBody });
      res.status(200).json({ id: rtaAdd.insertId, userid: 4, ...cleanBody });
      if (rtaAdd instanceof Error) return next(rtaAdd);
    }
  } catch (error) {
    next(error);
  }
};
const editOne = async (req, res, next) => {
  console.log("editOne", req.params.id);
  if (notNumber(req.params.id, next)) return;
  if (req.file != undefined) {
    try {
      const image = `${public_url}/${req.file.filename}`;
      await editPost(+req.params.id, { ...req.body, image });
      res.status(200).json({ message: "editado!!!" });
    } catch (error) {
      next(error);
      // if (rtaEdit instanceof Error) return next(rtaEdit)
    }
  } else {
    try {
      await editPost(+req.params.id, { ...req.body, image: imgDefault });
      res.status(200).json({ message: "editado!!!" });
    } catch (error) {
      next(error);
    }
  }
};
const listOne = async (req, res, next) => {
  if (notNumber(req.params.id, next)) return;
  const rtaListaOne = await listOnePost(+req.params.id);
  if (rtaListaOne instanceof Error) return next(rtaListaOne);
  if (!rtaListaOne.length) return next();
  res.status(200).json(rtaListaOne);
};
const deleteOne = async (req, res, next) => {
  if (notNumber(req.params.id, next)) return;
  const rtaDelete = await deleteOnePost(+req.params.id);
  if (rtaDelete instanceof Error) return next(rtaDelete);
  //console.log('rtaDeleted------------>', rtaDelete.affectedRows);
  !rtaDelete.affectedRows
    ? next()
    : res.status(200).json({ message: "Posts deleted!" });
};

module.exports = { listAll, addOne, editOne, listOne, deleteOne };
