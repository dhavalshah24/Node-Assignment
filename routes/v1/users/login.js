const userService = require("../../../services/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = () => {
    return (req, res) => {

        const email = req.body.email;
        let password = req.body.password;
        if(!isNaN(password)) {
            password = password.toString()
        }

        const user = userService.login(email);
        let message = "";
        var token = "";

        if(user.length > 0) {
            
            const hash = user[0].password;
            const result = bcrypt.compareSync(password, hash);
            
            if(result) {
                message = "Login successful";
                token = jwt.sign({email:email}, "ABC@123", {expiresIn: "30m"});
            } else {
                message = "Invalid password";
            }

        } else {
            message = "No user found";
        }
        res.status(200).json({
            success: true,
            message,
            token
        });
    };
};