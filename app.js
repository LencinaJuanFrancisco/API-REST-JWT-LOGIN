require('dotenv').config()
const hbs = require("express-handlebars")
const path = require("path")
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('storage'))
const PORT = process.env.PORT || 3030

/*Bootstrap static files */
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
/*Handlebars*/
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views")) // "./views"
app.engine("hbs", hbs.engine({ extname: "hbs" }))

app.listen(PORT, (err) => {
    err ? console.log(`Error de puert ----> ${err}`)
        : console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
    res.send('hola mundillo')
})
const users = require('./router/users.router')
const posts = require('./router/posts.router')
app.use('/users', users)
app.use('/posts', posts)

//catch all route (404)
app.use((req, res, next) => {
    let error = new Error("Resource not found");
    error.status = 404
    next(error)
})

//Error handler
app.use((error, req, res, next) => {
    if (!error.status) {
        error.status = 500
    }
    res.status(error.status).json({ status: error.status, message: error.message })
})