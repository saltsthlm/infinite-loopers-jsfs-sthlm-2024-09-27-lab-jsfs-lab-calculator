import http from "http";
import { evaluate, addition, norm } from "./calculator";

const port = 8080;

const server = http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    if (req.url) {
      console.log(norm(req.url));
    }
    res.end();
  })
  .listen(port);

server.on("listening", () =>
  console.log("Server is listening on port", server.address())
);
