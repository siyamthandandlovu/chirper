/* import express from "express";
 */
import * as express from "express";

import * as http from "http";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as compression from "compression";
import * as cors from "cors";
/* import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
 */
import {
  type TemperatureData,
  temperatureAlgorithm,
  type TweetInteractions,
  type Interaction,
} from "./temperature";

import {
  validateInterfaceTweetInteractions,
  validateTimestampsAllUnix,
} from "./validation";

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

app.get("*", (req, res) => {
  try {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Chirper Temperature</title>
  </head>

  <body>
    <div class="mt-5 top-50">
      <img src="" alt="" class="w-25" />

      <h1 class="text-center text-6xl my-3 font-bold">Hello!</h1>
      <p class="text-center text-3xl my-3">
        Looks like you're interested in using the <br />
        <b> Chirper Temperature Algorithm.</b>
      </p>

      <p class="text-center text-xl my-3">
        You can check out the documentation here : <br />
        <a
          class="link-dark px-3 bg-[#5daade] border-black border rounded-full duration-300 hover:border-black hover:bg-white"
          href="https://siyamthandandlovu.github.io/chirper"
        >
          Chirper Temperature Documentation
        </a>
      </p>
    </div>
  </body>
</html>

  `;

    res.status(200).send(htmlContent);
  } catch (error) {
    res.status(500).json({ message: "Internal Error" });
  }
});

app.post("/api", (req, res) => {
  try {
    const data = req.body;

    // Check if the request body is a valid JSON object
    if (typeof data !== "object" || data === null) {
      throw new Error("Invalid JSON");
    }

    if (!validateInterfaceTweetInteractions(data)) {
      throw new Error("Invalid interface for tweet interactions object");
    }

    if (!validateTimestampsAllUnix(data)) {
      throw new Error("Invalid timestamps");
    }

    let responseBody = handlePost(data);
    console.log("responseBody: ", responseBody);
    // Process the valid JSON data (for example, send a success response)
    res.status(200).json({ message: "Temperature Values Ready", responseBody });
  } catch (error) {
    // Send an invalid JSON error response
    res.status(400).json({ error: error.message });
  }


  
});

const server = http.createServer(app);

server.listen(8080, () => {
  console.log(`Server running on port ${server.address()}`);
});


module.exports = app;