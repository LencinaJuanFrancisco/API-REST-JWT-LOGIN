const pool = require("../db/config");

const addNewPost = (post) => {
    const query = "INSERT INTO posts SET ?";
    try {
        return pool.query(query, post)
    } catch (error) {
        error.message = error.code
    }
}
const getPostsWith = (string) => {
    const query = `SELECT * FROM posts WHERE title LIKE '%${string}%'`
    try {
        return pool.query(query)
    } catch (error) {
        error.message = error.code
    }
}

const getAllPosts = () => {
    const query = "SELECT * FROM posts";
    try {
        return pool.query(query)
    } catch (error) {
        error.message = error.code
    }
}
const editPost = (id, data) => {
    const query = `UPDATE posts SET ? WHERE id = ${id}`
    try {
        return pool.query(query, data)
    } catch (err) {
        err.message = err.code
        return code
    }
}
const listOnePost = (id) => {
    const query = `SELECT * FROM posts WHERE id = ${id}`
    try {
        return pool.query(query)
    } catch (error) {
        error.message = error.code
        return error
    }

}
const deleteOnePost = (id) => {
    const query = `DELETE FROM posts WHERE id = ${id}`
    try {
        return pool.query(query)
    } catch (error) {
        error.message = error.code
        return error
    }
}

module.exports = { addNewPost, getPostsWith, getAllPosts, editPost, listOnePost, deleteOnePost }