const routes = require("express").Router()
const upload = require("../../../middleware/fileupload");
const auth = require("../../../middleware/auth");

module.exports = () => {
    routes.get("/", auth, require("./getAllUsers")());
    routes.get("/:id", auth, require("./otherUserInfo")());
    routes.post("/changePassword", auth, require("./changePassword")());
    routes.post("/signup", upload, require("./signup")());
    routes.post("/login", require("./login")());
    routes.post("/updateInfo", auth, upload, require("./updateInfo")());
    return routes;
};