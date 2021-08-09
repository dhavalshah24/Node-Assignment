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
                const allUsers = userService.getAllUsers();
                res.status(200).json({
                    success: true,
                    message: allUsers
                });
            }
        });
    };
};