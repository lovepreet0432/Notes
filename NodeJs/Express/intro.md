What is Express.js?

Express.js is a minimal and flexible Node.js web framework that simplifies building web servers and APIs.

Built on top of Node’s http module

Provides middleware, routing, and utilities

Makes code cleaner than using raw http.createServer

Why we need Express.js

Using plain Node:

const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/users' && req.method === 'GET') {
    res.end(JSON.stringify([{ name: 'Alice' }]));
  } else {
    res.statusCode = 404;
    res.end('Not found');
  }
});

server.listen(3000);


Problems:

Manual routing

Repetitive header handling

Middleware logic is hard

No convenient helpers

With Express:

const express = require('express');
const app = express();

app.get('/users', (req, res) => {
  res.json([{ name: 'Alice' }]);
});

app.listen(3000, () => console.log('Server running'));


Clean routing

res.json, res.send helpers

Middleware system

Core Concepts of Express.js
1️⃣ Routing

Routing defines how the server responds to a request URL + method.

app.get('/', (req, res) => res.send('Home Page'));
app.post('/login', (req, res) => res.send('Login'));
app.put('/user/:id', (req, res) => res.send('Update'));

2️⃣ Middleware

Middleware = functions executed in order for each request, can modify request/response.

Types:

Application-level

Router-level

Error-handling

Third-party (body-parser, cors, morgan)

Example:
app.use(express.json()); // parse JSON bodies

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});


next() passes control to the next middleware

3️⃣ Request & Response Objects

Express wraps Node’s req/res objects.

Common properties/methods:
req.body       // JSON/body data (after body-parser)
req.params     // Route params /users/:id
req.query      // Query params ?q=test
req.headers    // Request headers

res.send()     // Send text/html
res.json()     // Send JSON
res.status(200)// Set status code
res.redirect() // Redirect

4️⃣ Error Handling

Custom middleware to catch errors:

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

5️⃣ Static Files

Serve CSS, JS, images easily:

app.use(express.static('public'));


Files in public folder are automatically served

Example: public/index.html → http://localhost:3000/index.html

6️⃣ Query Params & Route Params
app.get('/search', (req, res) => {
  console.log(req.query.q); // ?q=abc
});

app.get('/user/:id', (req, res) => {
  console.log(req.params.id);
});

7️⃣ Body Parsing

Built-in now with Express >= 4.16:

app.use(express.json());      // JSON bodies
app.use(express.urlencoded({ extended: true })); // Form data

8️⃣ Express + Node Streams

req is a Readable stream

res is a Writable stream

Example: streaming a file to client

app.get('/video', (req, res) => {
  const fs = require('fs');
  const stream = fs.createReadStream('video.mp4');
  stream.pipe(res);
});

9️⃣ Router (modular routes)
const router = express.Router();

router.get('/profile', (req, res) => res.send('Profile Page'));

app.use('/user', router);


/user/profile will now hit that route

Keeps routes modular

10️⃣ Middleware Flow Example
app.use((req, res, next) => {
  console.log('Middleware 1');
  next();
});

app.get('/', (req, res, next) => {
  console.log('Route handler');
  next();
});

app.use((req, res) => {
  console.log('Middleware 2');
  res.send('Done');
});


Output on GET /:

Middleware 1
Route handler
Middleware 2

When Express is used in real apps

REST APIs (CRUD)

Authentication systems (JWT, sessions)

File uploads (Multer)

Serving static sites / SPA backends

Microservices

Express vs Core Node HTTP
Feature	Node HTTP	Express
Routing	Manual	Built-in, clean
Middleware	Hard	Easy, chainable
Request parsing	Manual	express.json(), urlencoded
Response helpers	res.end()	res.json(), res.send()
Static files	Manual	express.static()