

const nodemailer = require("nodemailer");

const { SMTP_MAIL, SMTP_PASSWORD } = process.env

const SendMail = async (ReceiverEmail, MailSubject, MailContent) => {
    try {
        const transport = nodemailer.createTransport({
            host: "",
            port: "",
            secure: false,
            requireTLS: true,
            auth: {
                user: SMTP_MAIL,
                pass: SMTP_PASSWORD
            }
        });
        const mailOption = {
            from: SMTP_MAIL,
            to: ReceiverEmail,
            subject: MailSubject,
            html: MailContent
        }
        transport.sendMail(mailOption, () => {
            if (error) {
                console.log(`error from SendMail: ${error}`)
            } else {
                console.log("Mail sent Successfully", info.response)
            }
        })


    } catch (error) {
        console.log(error)
    }
}



module.exports = SendMail;