"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* import express from "express";
 */
var express = require("express");
var http = require("http");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var compression = require("compression");
var cors = require("cors");
/* import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
 */
var temperature_1 = require("../src/temperature");
var validation_1 = require("../src/validation");
var app = express();
app.use(cors({
    credentials: true,
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
function handlePost(body) {
    var jsonResponse = (0, temperature_1.temperatureAlgorithm)(body);
    return jsonResponse;
}
app.get("*", function (req, res) {
    try {
        var htmlContent = "\n<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <script src=\"https://cdn.tailwindcss.com\"></script>\n    <title>Chirper Temperature</title>\n  </head>\n\n  <body>\n    <div class=\"mt-5 top-50\">\n      <img src=\"\" alt=\"\" class=\"w-25\" />\n\n      <h1 class=\"text-center text-6xl my-3 font-bold\">Hello!</h1>\n      <p class=\"text-center text-3xl my-3\">\n        Looks like you're interested in using the <br />\n        <b> Chirper Temperature Algorithm.</b>\n      </p>\n\n      <p class=\"text-center text-xl my-3\">\n        You can check out the documentation here : <br />\n        <a\n          class=\"link-dark px-3 bg-[#5daade] border-black border rounded-full duration-300 hover:border-black hover:bg-white\"\n          href=\"https://siyamthandandlovu.github.io/chirper\"\n        >\n          Chirper Temperature Documentation\n        </a>\n      </p>\n    </div>\n  </body>\n</html>\n\n  ";
        res.status(200).send(htmlContent);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Error" });
    }
});
app.post("/api", function (req, res) {
    try {
        var data = req.body;
        // Check if the request body is a valid JSON object
        if (typeof data !== "object" || data === null) {
            throw new Error("Invalid JSON");
        }
        if (!(0, validation_1.validateInterfaceTweetInteractions)(data)) {
            throw new Error("Invalid interface for tweet interactions object");
        }
        if (!(0, validation_1.validateTimestampsAllUnix)(data)) {
            throw new Error("Invalid timestamps");
        }
        var responseBody = handlePost(data);
        console.log("responseBody: ", responseBody);
        // Process the valid JSON data (for example, send a success response)
        res.status(200).json({ message: "Temperature Values Ready", responseBody: responseBody });
    }
    catch (error) {
        // Send an invalid JSON error response
        res.status(400).json({ error: error.message });
    }
});
var server = http.createServer(app);
server.listen(8080, function () {
    console.log("Server running on port ".concat(server.address()));
});
