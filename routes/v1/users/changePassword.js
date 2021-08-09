const userService = require("../../../services/user");
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

module.exports = () => {
    return (req, res) => {
        let message = "";
        jwt.verify(req.token, "secretKey", (err, authUser) => {
            if (err) {
                res.status(200).json({
                    message: "Unauthorized access"
                });
            } else {
                const email = req.body.email;
                let currentPassword = req.body.currentPassword;
                let newPassword = req.body.newPassword;
                
                if (!isNaN(currentPassword)) {
                    currentPassword = currentPassword.toString()
                }
                
                const user = userService.login(email);
                if (user.length > 0) {

                    var hash = user[0].password;
                    const result = bcrypt.compareSync(currentPassword, hash);

                    if (result) {
                        if (!isNaN(newPassword)) {
                            newPassword = newPassword.toString()
                        }
                        
                        var salt = bcrypt.genSaltSync(10);
                        hash = bcrypt.hashSync(newPassword, salt);
                        userService.changePassword(email, hash);
                        message = "Password changed";
                    } else {
                        message = "Current Password is incorrect";
                    }
                } else {
                    message = "No user found";
                }
                res.status(200).json({
                    success: true,
                    message
                });
            }
        });

    };
};