const nodemailer = require('nodemailer')

// const transporter = nodemailer.createTransport({
//  host: 'jezreel.veloso@gmail.com',
//  port: 587,
//  secure: false,
//  auth: {
//    user: 'jezreel.veloso@gmail.com',
//    pass: 'jezreel2000',
//  },
//})

// module.exports = transporter

//const emailOptions = {
// from: 'jezreelgamer2@gmail.com',
//to: 'jezreelgamer1@gmail.com',
//subject: 'Account confirmation',
//text: 'hi bitch',
//html: '<strong>Sit</strong><em>hi</em>',
//}
//transporter.sendMail(emailOptions)

// Create a transporter object using SMTP transport
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jezreel.veloso@gmail.com',
    pass: 'jezreel2000',
    type: 'login',
  },
})

// Define email options
let mailOptions = {
  from: 'jezreel.veloso@gmail.com',
  to: 'jezreelgamer1@gmail.com',
  subject: 'Test Email',
  text: 'This is a test email sent using Node.js',
}

// Send email
transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.error('Error occurred:', error)
  } else {
    console.log('Email sent:', info.response)
  }
})
