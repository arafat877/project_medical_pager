const express = require('express');
const cors = require('cors');

const authRoutes = require ('./routes/auth.js');

const app = express();
const PORT = process.env.PORT || 5000;

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console
const twilioClient = require('twilio')(accountSid, authToken);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (_, res) => res.send('Hello World!'));

app.post('/', (req, res) => {
    if(res || req) {
        console.log('================================= REQ BODY USER =================================')
        console.log(req.body)
    }
    twilioClient.messages.create({ 
        body: 'You have a new message.',  
        messagingServiceSid: 'MG8893dd312da357e6883c026c93a2bb1a',      
        to: '385916114297' 
    })
    .then(() => res.status(200).send("OK"))
    .catch((e) => {
        console.log(e);
        res.status(500).send("Error");
    })
});

// console.log('here');
// let body = '';

// req.on("data", (chunk) => {
//     console.log('Inside req.on(data)', { chunk });
//    body += chunk;
// });

// // Payload from Stream
// req.on("end", () => {
//     console.log('Inside req.on(end)');
//     let parsedBody = JSON.parse(body);

//     // Verifying there is a message in the payload
//     if(parsedBody.message == undefined) return;

//     console.log('before message sent');
//     // Here you can send an email, integrate an SMS service, or perform any other desired actions based on your Webhook events data
//     twilioClient.messages.create({ 
//         body: 'You have a new message.',  
//         messagingServiceSid: 'MG8893dd312da357e6883c026c93a2bb1a',      
//         to: '+385916114297' 
//     }).then(() => res.status(200).send("OK")).done();
//    });

//    res.send('Done');
app.use('/auth', authRoutes);

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));