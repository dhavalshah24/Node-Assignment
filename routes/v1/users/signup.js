const userService = require("../../../services/user")
var bcrypt = require('bcryptjs');

module.exports = () => {
    return (req, res) => {

        const name = req.body.name;
        const email = req.body.email;
        const mobile = req.body.mobile;
        let password = req.body.password;
        let fileName = "";
        
        if(req.file) {
            fileName = req.file.filename;
        }
        if (!isNaN(password)) {
            password = password.toString()
        }

        let message = ""
        const user = userService.getUserByEmail(email);
        
        if (user.length > 0) {
            message = "User already exists"
        } else {

            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);
            userService.insertUser(name, email, mobile, hash, fileName)
            message = "Successfully Registered. Login to get authorization token";
        }
        res.status(200).json({
            success: true,
            message
        });
    };
};