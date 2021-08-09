const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const routesController = require("./routes/v1")();

app.use("/api/v1", routesController);

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Server running on port ", port);
});