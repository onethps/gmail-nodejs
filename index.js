import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'onethps@gmail.com',
        pass: 'xotnldlvxxsvwboi',
    },
});


app.get('/', function (req, res) {
    res.send('Hello World')
})

app.post('/sendMessage', function (req, res) {
    let {
        name
    } = req.body

    transporter.sendMail({
        from: '"Portfolio Site', // sender address
        to: "onethps@gmail.com", // list of receivers
        subject: "Portfolio Message", // Subject line
        html: `<b>HEY!</b>
        <div>
        <b>There is a new article. It's about sending emails, check it out!</b>
        </div>
        `, // html body
    }).then(info => {
        console.log({
            info
        });
    }).catch(console.error);

    res.send('OK')
})

app.listen(3010, function () {
    console.log('OKAY!')
})