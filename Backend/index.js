const express = require('express');
const connectDb = require("./config/Db");
const userRoutes = require("./routes/userRoute");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const {notFound,errorHandler} = require("./middleWare/errorMiddleWare")

const app = express();
require('dotenv').config();
connectDb()
app.use(express.json());
app.use("/api/user",userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/messages',messageRoutes)

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT,console.log('App running successfully'));
