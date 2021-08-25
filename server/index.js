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
    const { message, user: sender, type, members } = req.body;

    if(type === 'message.new') {
        members
            .filter((member) => member.user_id !== sender.id)
            .forEach(({ user }) => {
                if(!user.online) {
                    twilioClient.messages.create({ 
                        body: `You have a new message from ${message.user.fullName} - ${message.text}`,  
                        messagingServiceSid: 'MG8893dd312da357e6883c026c93a2bb1a',      
                        to: user.phoneNumber
                    })
                    .then(() => console.log('Message sent to: ', user.fullName))
                    .catch((e) =>  console.log(e));
                }
        });

        return res.status(200).send("OK");
    }

    return res.send('Not a new message request.');
});

app.use('/auth', authRoutes);

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));