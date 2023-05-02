const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/user');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(400).send("Not sufficient data provided");
        }

        const userExists = await User.findOne({ email: email.toLowerCase() });
        if (userExists) {
            const isPasswordCorrect = await bcrypt.compare(password, userExists.password);
            if(isPasswordCorrect){
                const token = jwt.sign(
                    { data: userExists },
                    "auth-token",
                    { expiresIn: "2d" }
                )
    
                return res.status(200).json({
                    message: "Logged in successfully",
                    data: userExists,
                    token: token
                });
            }
            return res.status(400).json({message: "Invalid credentials"});
        }
        // return res.status(404).send("No such user exists.");
    }
    catch(err){
        return res.status(400).send({
            data: err,
            message: "Something went wrong, please try again"
        });
    }
}