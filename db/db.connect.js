const mongoose = require("mongoose");
require("dotenv").config();
const mongoUrl =process.env.MONGODB;
const initializeDatabase = async() => {
    await mongoose.connect(mongoUrl).then(() => {
        console.log("connected Successfully!");
    })
    .catch((error) => console.log("Connection Failed", error));
}
module.exports = initializeDatabase;