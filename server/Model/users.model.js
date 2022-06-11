const pool = require('../db/config')


const getAllUsers = async () => {
    const query = "SELECT * FROM users"
    try {
        return await pool.query(query)
    } catch (error) {
        error.message = error.code
        return error
    }
}
const getUserById = (id, user) => {
    const query = `SELECT * FROM users WHERE id = ${id}`
    try {
        return pool.query(query, user)
    } catch (error) {
        error.message = error.code
        return error
    }
}
const getUserByEmail = (email, user) => {
    const query = `SELECT * FROM users WHERE email = '${email}'`
    try {
        return pool.query(query, user)
    } catch (error) {
        error.message = error.code
        return error
    }
}
const addNewUser = (user) => {
    const query = `INSERT INTO users SET ?`
    try {
        return pool.query(query, user)
    } catch (error) {
        error.message = error.code
        return error
    }
}
const loginUser = (email) => {
    const query = `SELECT * FROM users WHERE email = '${email}'`
    try {
        return pool.query(query)
    } catch (error) {
        error.message = error.code
        return error
    }
}

const deleteUserById = (id) => {
    const query = `DELETE FROM users WHERE id = ${id}`
    try {
        return pool.query(query)
    } catch (error) {
        error.message = error.code
        return error
    }
}

const editUserById = (id, user) => {
    const query = `UPDATE users SET ? WHERE id = ${id}`
    try {
        return pool.query(query, user)
    } catch (error) {
        error.message = error.code
        return error
    }
}

module.exports = { getAllUsers, getUserById, addNewUser, deleteUserById, editUserById, loginUser,getUserByEmail }