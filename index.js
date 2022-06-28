require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}, () => console.log("connected db"))


const app = express();
app.use(express.json())

app.get("/", (req, res) => {
	res.send("BLOG API home page")
})
app.use(cors());

app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);

app.listen(3004, () => {
	console.log("server just started");
})


