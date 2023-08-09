

import { createTransport } from "nodemailer";

    // async..await is not allowed in global scope, must use a wrapper
 export const sendEmail = async (to, subject, html) => {
       try { // create reusable transporter object using the default SMTP transport
        let transporter = createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: 587,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.USER,
                pass: process.env.PASS, // generated ethereal password
            },
        });
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: process.env.USER,// sender address
            to,
            subject,
            html,
        });
        return info.accepted.length ? true : false;
   
} catch (error) {
    console.log(error, " error");
}

 };
