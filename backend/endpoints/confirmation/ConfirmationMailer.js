const nodemailer = require("nodemailer");
const config = require('config');

const user = config.get("mail.user")
const pass = config.get("mail.pass");

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: config.mail.user,
        pass: config.mail.pass
    },
});

function sendConfirmationMail(name, email, confirmationCode) {
    transport.sendMail({
        from: user,
        to: email,
        subject: "Papaya here! Please confirm your account",
        html:
            `<h1>Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Please confirm your Papaya account by clicking on the following link</p>
        <a href=http://papaya-app.online/verify/${confirmationCode}> Click here</a>
        </div>`,
    }).catch(err => console.log(err));
}


function sendPasswordResetMail(name, email, password) {
    console.log('sending pw reset mail')
    transport.sendMail({
        from: user,
        to: email,
        subject: "Papaya here! Here is your new Password!",
        html:
            `<h1>New Password</h1>
          <h2>Hello ${name}</h2>
          <p> Your new password is: ${password}</p>
          <p> Please set a new Password immediately after loggin in!</p>
          <a href=http://papaya-app.online/> Click here to login </a>
          </div>`,
    }).catch(err => console.log(err));
}


module.exports = {
    sendConfirmationMail,
    sendPasswordResetMail
}