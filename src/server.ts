import http from "http";
import { norm } from "./calculator";

const port = 8080;

const server = http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    if (req.url) {
      const fullUrl = `http://localhost:${port}${req.url}`;

      const decodedValue = norm(fullUrl, "q");

      if (decodedValue) {
        console.log(decodedValue);
        res.end(decodedValue);
      } else {
        res.end("Ingen giltig parameter 'q' hittades.");
      }
    }
  })
  .listen(port);

server.on("listening", () =>
  console.log("Server is listening on port", server.address())
);
