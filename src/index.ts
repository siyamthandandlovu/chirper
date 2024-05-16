import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());





app.get("/", async (c) => {
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

    return c.html(htmlContent);
  } catch (error) {
    return c.json({ error: "Invalid JSON" }, 400);
  }
});

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

// Define a GET route
 
// Define a GET route
app.get('/api', (req, res) => {
    res.status(200).json({ message: 'Welcome to the server!' });
});


const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server running");
});
