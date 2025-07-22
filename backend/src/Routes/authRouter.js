const routes = require("express").Router();
const { loginUser, logout } = require("../Controller/authController");


routes.post("/login", loginUser);
routes.get("/logout", logout);
module.exports = routes;
