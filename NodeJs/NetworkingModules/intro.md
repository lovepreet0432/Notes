Networking in Node.js (big picture)

Networking in Node.js means sending and receiving data over the network using event-driven, non-blocking I/O.

Node does this using:

OS sockets

libuv (async I/O)

Core networking modules

Core Networking Modules (must know)
Module	Level	Use
net	Low-level	TCP sockets
http	High-level	HTTP server/client
https	High-level	Secure HTTP
dgram	Low-level	UDP
dns	Utility	DNS resolution
tls	Low-level	Secure sockets

We’ll go from low → high.

1️⃣ net module (TCP – foundation)
What it is

net lets you work directly with TCP sockets.

No HTTP, no headers, no structure.

Just:

Bytes in → Bytes out

TCP Server Example
const net = require("net");

const server = net.createServer(socket => {
  console.log("Client connected");

  socket.on("data", data => {
    console.log("Received:", data.toString());
    socket.write("Hello from server");
  });

  socket.on("end", () => {
    console.log("Client disconnected");
  });
});

server.listen(3000);

TCP Client Example
const client = net.createConnection({ port: 3000 }, () => {
  client.write("Hello server");
});

client.on("data", data => {
  console.log("Server:", data.toString());
  client.end();
});

Where net is used

Databases (Redis, Mongo internal protocol)

Chat servers

Custom binary protocols

Real-time systems

2️⃣ http module (built on net)
What it adds

http adds:

Request / Response abstraction

Headers

Status codes

Methods (GET, POST…)

Internally:

http → net → socket

HTTP Server
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello HTTP");
});

server.listen(3000);

HTTP Request Flow
Client
  ↓
TCP connection
  ↓
HTTP request parsed
  ↓
req (Readable Stream)
res (Writable Stream)


Important:

req = Readable stream

res = Writable stream

3️⃣ https module (secure HTTP)
What changes

Adds TLS/SSL encryption

Same API as http

https.createServer({ key, cert }, handler);


Used for:

Secure APIs

Auth

Payments

4️⃣ dgram module (UDP)
What is UDP?

Connectionless

No guarantee

Very fast

No order

UDP Example
const dgram = require("dgram");
const socket = dgram.createSocket("udp4");

socket.on("message", msg => {
  console.log(msg.toString());
});

socket.bind(41234);


Used for:

Gaming

Streaming

DNS

VoIP

5️⃣ dns module
Purpose

Resolve domain → IP

dns.lookup("google.com", (err, address) => {
  console.log(address);
});


Used in:

Networking tools

Custom resolvers

Debugging

6️⃣ tls module
What it is

Low-level encrypted sockets.

Used when:

You want encryption without HTTP

Secure custom protocols

Streaming & Networking (key connection)

Networking in Node is stream-based.

Component	Type
TCP socket	Duplex Stream
HTTP req	Readable Stream
HTTP res	Writable Stream

Example:

req.pipe(res);

Backpressure in networking

Node automatically:

Pauses reading

Resumes when writable drains

This is why Node scales well.

Real-world example (file streaming over HTTP)
http.createServer((req, res) => {
  fs.createReadStream("video.mp4").pipe(res);
});


No buffering entire file in RAM 🔥

How Express fits into this
net → http → Express


Express just:

Parses

Adds middleware

Improves DX

Interview-ready one-liners

Q: How does Node handle networking efficiently?

Using non-blocking I/O, event-driven architecture, and streams built on OS-level sockets via libuv.

Q: Difference between net and http?

net works with raw TCP sockets, while http adds a structured request/response layer on top.

When you should use what
Need	Module
Custom protocol	net
REST API	http / https
Secure custom protocol	tls
Real-time low latency	dgram
DNS lookup	dns