// HTTP Server:
const express = require('express');
const bodyParser = require('body-parser');

const https = require('https');
const fs = require('fs');

const database = require('./database/db');
const userRoutes = require('./endpoints/user/UserRoute');
const noteRoutes = require('./endpoints/note/NoteRoute');
const authenticationRoutes = require('./endpoints/authentication/AuthenticationRoute');
const confirmationRoutes = require('./endpoints/confirmation/ConfirmationRoute');
const categoryRoutes = require('./endpoints/category/CategoryRoute');

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
});

/* Error Handler: */
app.use((req, res, next) => {
    res.status(404).send('Can not find that! The url is not supported!');
});

app.use((err, req, res, next) => {
    res.status(500).send("Something broke: " + err.stack);
});

const port = 443;

https
    .createServer(
        {
            key: fs.readFileSync("./certificates/key.pem"),
            cert: fs.readFileSync("./certificates/cert.pem"),
        },
        app)
    .listen(port, () => {
        console.log(`App listening at https://localhost:${port}`);
    })