import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";


import {
  type TemperatureData,
  temperatureAlgorithm,
  type TweetInteractions,
  type Interaction,
} from "../src/temperature";

import {
  validateInterfaceTweetInteractions,
  validateTimestampsAllUnix,
} from "../src/validation";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

 

function handlePost(body: any) {
  let jsonResponse = temperatureAlgorithm(body);
  return jsonResponse;
}



app.get("/api",  (req,res) => {
  try {
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Chirper Temperature</title>
    </head>
    <body>
      <h1>Hello!</h1>
      <p>Seems like you're interested in using the Chirper Temperature Algorithm.</p>
      <p>You can check out the documentation here : <a href="https://siyamthandandlovu.github.io/chirper">Chirper Temperature </a></p>
    </body>
    </html>
  `;

    res.status(200).send(htmlContent);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});




app.get("*",  (req,res) => {
  try {
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Chirper Temperature</title>
    </head>
    <body>
      <h1>Hello!</h1>
      <p>Seems like you're interested in using the Chirper Temperature Algorithm.</p>
      <p>You can check out the documentation here : <a href="https://siyamthandandlovu.github.io/chirper">Chirper Temperature </a></p>
    </body>
    </html>
  `;

    res.status(200).send(htmlContent);
  } catch (error) {
     const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Chirper Temperature</title>
    </head>
    <body>
      <h1>Hello!</h1>
      <p>Seems like you're interested in using the Chirper Temperature Algorithm.</p>
      <p>You can check out the documentation here : <a href="https://siyamthandandlovu.github.io/chirper">Chirper Temperature </a></p>
    </body>
    </html>
  `;

     res.status(200).send(htmlContent);
  }
});







app.post("/api", (req, res) => {
  try {
    const data = req.body;

    // Check if the request body is a valid JSON object
    if (typeof data !== "object" || data === null) {
      throw new Error("Invalid JSON");
    }

    // Process the valid JSON data (for example, send a success response)
    res.status(200).json({ message: "Valid JSON received", data });
  } catch (error) {
    // Send an invalid JSON error response
    res.status(400).json({ error: "Invalid JSON" });
  }
});

/* hjgvh


app.post("/api", async (c) => {
  try {
    const body = await c.req.json();

    if (!validateInterfaceTweetInteractions(body)) {
      return c.json(
        { error: "Invalid interface for tweet interactions object" },
        400
      );
    }

    if (!validateTimestampsAllUnix(body)) {
      return c.json({ error: "Invalid timestamps" }, 400);
    }

    let responseBody = handlePost(body);
    console.log("responseBody: ", responseBody);
    return c.json({ message: "Received successfully", data: responseBody });
  } catch (error) {
    return c.json({ error: "Invalid JSON input" }, 400);
  }
});

 */






const server = http.createServer(app);

server.listen(8080, () => {
    console.log(`Server running on port ${server.address()}`);

});

