import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

let smpt_login = process.env.SMTP_LOGIN || "---"
let smpt_pass = process.env.SMTP_PASSWORD || "---"

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: smpt_login,
        pass: smpt_pass,
    },
});


app.get('/', function (req, res) {
    res.send('Hello World')
})

app.post('/sendMessage', function (req, res) {
    let {
        email,
        message,
        name,
        subject
    } = req.body

    transporter.sendMail({
        from: 'Portfolio Site', // sender address
        to: "onethps@gmail.com", // list of receivers
        subject: `${subject}`,
        text:`${message}`,
        html: `
        <b>${name}</b>
        <div>
        <b>${message}</b>
        </div>
        `, // html body
    }).then(info => {
        console.log({
            info
        });
    }).catch(console.error);

    res.send('OK')
})

let port = process.env.PORT || 3010

app.listen(port, function () {
    console.log('OKAY!')
})