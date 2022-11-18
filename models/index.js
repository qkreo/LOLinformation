const mongoose = require("mongoose");
require('dotenv').config();

const connect = () => {
mongoose

// .connect(`mongodb+srv://qkero407:${process.env.SECRET_KEY}@cluster0.iao4kcr.mongodb.net/test`)
.connect(`mongodb+srv://test:${process.env.SECRET_KEY}@cluster0.sojhuso.mongodb.net/test`)
.catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
console.error("몽고디비 연결 에러", err);
});

module.exports = connect;