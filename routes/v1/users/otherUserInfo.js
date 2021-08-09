const userService = require("../../../services/user")
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

                const id = req.params.id;
                const user = userService.getOtherUser(id);
                if (user.length > 0) {
                    message = user;
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