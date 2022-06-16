const { addNewPost, getPostsWith, getAllPosts, editPost, listOnePost, deleteOnePost } = require('../Model/posts.model')
const { matchedData } = require('express-validator')
const notNumber = require('../utils/notNumber');

const listAll = async (req, res, next) => {
    let rtaList = null;
    if (req.query.title) {
        rtaList = await getPostsWith(req.query.title)
    } else {
        rtaList = await getAllPosts()
    }
    if (rtaList instanceof Error) return next(rtaList);
    rtaList.length ? res.status(200).json(rtaList) : res.status(200).json({ message: "no hay posts" });

}
const addOne = async (req, res, next) => {
    const cleanBody = matchedData(req);
    const rtaAdd = await addNewPost({ userid: 2, ...cleanBody })
    rtaAdd instanceof Error ? next(rtaAdd)
        : res.status(200).json({id:rtaAdd.insertId, userid: 2, ...cleanBody })

}
const editOne = async (req, res, next) => {
    console.log('editOne',req.params.id);
    if (notNumber(req.params.id, next)) return
    const rtaEdit = await editPost(+req.params.id, req.body)
    if (rtaEdit instanceof Error) return next(rtaEdit)
    rtaEdit.affectedRows ? res.status(200).json({ id:req.params.id,...req.body}) : next()
}
const listOne = async (req, res, next) => {
    if (notNumber(req.params.id, next)) return
    const rtaListaOne = await listOnePost(+req.params.id)
    if (rtaListaOne instanceof Error) return next(rtaListaOne)
    if (!rtaListaOne.length) return next()
    res.status(200).json(rtaListaOne)
}
const deleteOne = async (req, res, next) => {
    if (notNumber(req.params.id, next)) return
    const rtaDelete = await deleteOnePost(+req.params.id)
    if (rtaDelete instanceof Error) return next(rtaDelete)
    //console.log('rtaDeleted------------>', rtaDelete.affectedRows);
    !rtaDelete.affectedRows ? next() : res.status(200).json({ message: "Posts deleted!" });
}

module.exports = { listAll, addOne, editOne, listOne, deleteOne }