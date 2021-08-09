const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const token = req.headers['authorization'];

    if (token) {
        const bearer = token.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();

    } else {
        res.send("Enter the authentication token");
    }
};