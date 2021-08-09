const userService = require("../../../services/user");
const jwt = require("jsonwebtoken");

module.exports = () => {
    return (req, res) => {

        jwt.verify(req.token, "secretKey", (err, authUser) => {
            if (err) {
                res.status(200).json({
                    message: "Unauthorized access"
                });
            } else {
                const email = req.body.email;
                const mobile = req.body.mobile;
                const name = req.body.name;
                let fileName = "";

                if (req.file) {
                    fileName = req.file.fileName;
                }

                let message = "";
                const user = userService.getUserByEmail(email);

                if (user.length == 0) {
                    message = "No user found";
                } else {
                    userService.updateInfo(email, name, mobile, fileName);
                    message = "Update Successful";
                }
                res.status(200).json({
                    success: true,
                    message
                });
            }
        });
    };
};

