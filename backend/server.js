// HTTP Server:
const express = require('express');
const bodyParser = require('body-parser');

const database = require('./database/db');
const userRoutes = require('./endpoints/user/UserRoute');
const noteRoutes = require('./endpoints/note/NoteRoute');
const authenticationRoutes = require('./endpoints/authentication/AuthenticationRoute');
const confirmationRoutes = require('./endpoints/confirmation/ConfirmationRoute');
const categoryRoutes = require('./endpoints/category/CategoryRoute');

const userService = require('./endpoints/user/UserService')

const cors = require('cors')

const app = express();

app.use(cors({
    origin: '*',
    exposedHeaders: ['Authorization']
}));

app.use(bodyParser.json());

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/note', noteRoutes);
app.use('/api/v1/login', authenticationRoutes);
app.use('/api/v1/confirmation', confirmationRoutes);
app.use('/api/v1/category', categoryRoutes);


database.initDB((error, db) => {
    if (db) {
        console.log('Database succesfully binded');
    }
    else {
        console.log('Database binding not succesfull');
    }
    console.log('Pre create default admin')
    userService.createDefaultAdmin((err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
        }
    })
});

/* Error Handler: */
app.use((req, res, next) => {
    res.status(404).send('Can not find that! The url is not supported!');
});

app.use((err, req, res, next) => {
    res.status(500).send("Something broke: " + err.stack);
});

const port = 8080;

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
})