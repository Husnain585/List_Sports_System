const express = require("express");
const port = 3000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const ConnectDB = require("./src/ConfigDB/db");
const userModel = require("./src/Routes/userRoute");
const authRouter = require("./src/Routes/authRouter");
const adminRouter = require("./src/Routes/adminRouter");
const eventRouter = require("./src/Routes/eventRouter");
const teamRouter = require("./src/Routes/teamRouter");
const sportCategoryRoutes = require("./src/Routes/sportCategoryRoutes")
const profileRouter = require("./src/Controller/profileController");


const app = express();

// Middleware's 
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true,
}));
// Routes
app.use('/users', userModel);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use('/events', eventRouter);
app.use("/team",teamRouter)
app.use("/profile",profileRouter);
app.use('/sport-categories', sportCategoryRoutes);

app.get("/", (req, res) => {
    res.send("welcome");
});


// Database Connection
ConnectDB();
// App Listen
app.listen(3000, () => {
    console.log(`server is running on port ${port}`);
});
