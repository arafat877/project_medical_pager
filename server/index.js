const express = require('express');
const cors = require('cors');

const authRoutes = require ('./routes/auth.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.get('/', (_, res) => res.send('Hello World!'));

app.post('/', (req, res) => {
    let body = '';

    req.on("data", (chunk) => {
       body += chunk;
    });
 
    // Payload from Stream
    req.on("end", () => {
        let parsedBody = JSON.parse(body);

        console.log({parsedBody});
       
        // Verifying there is a message in the payload
        if(parsedBody.message === undefined) return;
 
        // Here you can send an email, integrate an SMS service, or perform any other desired actions based on your Webhook events data
        twilioClient.messages.create({ 
            body: 'You have a new message.',  
            messagingServiceSid: 'MG8893dd312da357e6883c026c93a2bb1a',      
            to: '+385916114297' 
        }).then(() => res.status(200).send("OK")).done();
       });
 });

app.use('/auth', authRoutes);

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));