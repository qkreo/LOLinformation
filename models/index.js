const mongoose = require("mongoose");

const connect = () => {
mongoose
.connect("mongodb+srv://qkero407:IIDRYTIy1FLCJu2c@cluster0.iao4kcr.mongodb.net/test")
.catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
console.error("몽고디비 연결 에러", err);
});

module.exports = connect;