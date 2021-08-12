const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');

// Define values. 
const api_key = 'e6nfz3p5c2qb' 
const api_secret = 'rfus6h6xq2y5gf9m9jkf4gqrcm282y9efzqtyw2a5r37targmuf9zgp764hasqe9' 
const app_id = '1136741' 

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Initialize a Server Client 
        const serverClient = connect(api_key, api_secret, app_id); 
        const client = StreamChat.getInstance(api_key, api_secret); 

        const { users } = await client.queryUsers({ name: username });

        if(!users.length) return res.status(400).json({ message: "Wrong password" });

        const success = await bcrypt.compare(password, users[0].hashedPassword);

        const token = serverClient.createUserToken(users[0].id); 

        if(success) {
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
        const { fullName, username, password } = req.body;

        const userId = crypto.randomBytes(20).toString('hex');
        console.log(userId)
        
        // Initialize a Server Client 
        const serverClient = connect(api_key, api_secret, app_id); 
        // const client = StreamChat.getInstance(api_key, api_secret); 

        // Encrypt a password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a token
        const token = serverClient.createUserToken(userId); 

        console.log(token);
        console.log(hashedPassword);
    
        res.status(200).json({ token, fullName, username, userId, hashedPassword });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error });
    }
}


module.exports = { signup, login };