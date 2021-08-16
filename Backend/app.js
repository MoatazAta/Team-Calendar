global.config = require("./config-dev.json");
const express = require("express");
const cors = require("cors");
const meetingController = require("./controllers-layer/meetings-controller");
const server = express();

server.use(cors());
server.use(express.json());
server.use("/", meetingController);

server.listen(3001, () => console.log("Listening..."));
