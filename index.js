import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 5000


let corsOrigins=[];

if(process.env.REQUEST_ORIGIN){
    corsOrigins=[process.env.REQUEST_ORIGIN];
}
else{
    corsOrigins=["http://localhost:3000"];
}
const corsOptions = {
    origin: corsOrigins,
    methods:['GET','POST'],
    allowedHeaders: ['Content-Type', 'Authorization']   
};

app.use(cors(corsOptions));


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

app.post('/send_email', function (req, res) {
    let {
        email,
        message,
        name,
        subject
    } = req.body

    transporter.sendMail({
        from: 'PORTFOLIO SITE', // sender address
        to: "onethps@gmail.com", // list of receivers
        subject: `${subject}`,
        html: `
        <b>${email}</b>
        <div>
        <b>${name}</b>
        </div>
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


app.listen(port, function () {
    console.log('OKAY!')
})