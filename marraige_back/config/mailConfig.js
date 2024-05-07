const nodemailer = require('nodemailer');

const transporter= nodemailer.createTransport({
    service:'Gmail',
    auth:{
        user:'amalanu0012@gmail.com',
       pass:'rytk onch vnxs exlo',
    }
});
module.exports=transporter