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
  console.log("Check sendConfiMail")
  transport.sendMail({
    from: user,
    to: email,
    subject: "Papaya here! Please confirm your account",
    html:
      `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Please confirm your Papaya account by clicking on the following link</p>
        <a href=http://localhost:3000/verify/${confirmationCode}> Click here</a>
        </div>`,
  }).catch(err => console.log(err));
}

module.exports = {
  sendConfirmationMail
}