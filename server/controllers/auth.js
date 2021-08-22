const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');
require('dotenv').config()

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console
const twilioClient = require('twilio')(accountSid, authToken);

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID 

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const serverClient = connect(api_key, api_secret, app_id); 
        const client = StreamChat.getInstance(api_key, api_secret); 

        const { users } = await client.queryUsers({ name: username });

        if(!users.length) return res.status(400).json({ message: "Wrong password" });

        const success = await bcrypt.compare(password, users[0].hashedPassword);

        const token = serverClient.createUserToken(users[0].id); 

        if(success) {
            // twilioClient.messages 
            // .create({ 
            //     body: 'You have successfully logged in.',  
            //     messagingServiceSid: 'MG8893dd312da357e6883c026c93a2bb1a',      
            //     to: '+385916114297' 
            // }) 
            // .then(message => console.log(message.sid)) 
            // .done();

            res.status(200).json({ token, fullName: users[0].fullName, username, userId: users[0].id });
        } else {
            res.status(400).json({ message: "Wrong password" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const signup = async (req, res) => { 
    try {
        const { fullName, username, password, phoneNumber } = req.body;

        const userId = crypto.randomBytes(20).toString('hex');
        console.log(userId)
        
        const serverClient = connect(api_key, api_secret, app_id); 

        const hashedPassword = await bcrypt.hash(password, 10);

        const token = serverClient.createUserToken(userId); 

        twilioClient.messages 
            .create({ 
                body: 'You have successfully created an account.',  
                messagingServiceSid: 'MG8893dd312da357e6883c026c93a2bb1a',      
                to: phoneNumber 
            }) 
            .then(message => console.log(message.sid)) 
            .done();

        res.status(200).json({ token, fullName, username, userId, hashedPassword, phoneNumber });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error });
    }
}


module.exports = { signup, login };