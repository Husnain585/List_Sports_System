const express = require("express");
const port = 3000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");

const ImageModel = require("./src/Models/ImageModel");
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("uploads"));
app.use(cors({
    origin: true,
    credentials: true,
}));

// Set up for Image Uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})
const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const { path, filename } = req.file;
        const Image = await new ImageModel({path, filename});
        await Image.save();
        res.status(200).json({ message: 'Image uploaded successfully', image: Image });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading image', error: error.message });

    }
});
app.get("/img/:id", async (req, res) => {
    try {
        const image = await ImageModel.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }
        const imagepath = path.join(__dirname, 'uploads', image.filename);
        res.sendFile(imagepath);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving image', error: error.message });
    }
})

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
