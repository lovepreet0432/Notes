Authentication in Node.js (big picture)

Authentication = how your server knows who the user is.

In Node.js (Express / Nest / Fastify), the most common approaches are:

Session-based auth (Stateful)

Token-based auth (Stateless – usually JWT)

1️⃣ Stateful Authentication (Session-based)
What “stateful” means

The server stores the user’s login state in memory or a database.

Think of it like:

“I remember you. I have your session saved.”

How it works (step by step)

User logs in with email & password

Server verifies credentials

Server creates a session

Session data is stored on the server
(Memory / Redis / DB)

Server sends a session ID to the browser (cookie)

On every request:

Browser sends the cookie

Server looks up the session

If found → user is authenticated

Example (Express + session)
app.post("/login", (req, res) => {
  req.session.user = { id: 1, name: "Lovepreet" };
  res.send("Logged in");
});

app.get("/profile", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send("Unauthorized");
  }
  res.send(req.session.user);
});

Pros

✅ Easy to implement
✅ Easy to revoke (delete session)
✅ Good for traditional web apps

Cons

❌ Server must store sessions
❌ Harder to scale (multiple servers need shared storage like Redis)
❌ Not ideal for mobile apps / APIs

Real-world usage

Old-school web apps

Admin panels

Apps using server-rendered pages

2️⃣ Stateless Authentication (Token-based / JWT)
What “stateless” means

The server does NOT store login state.

Each request carries everything needed to prove identity.

Think of it like:

“I don’t remember you, show me proof every time.”

How it works (step by step)

User logs in

Server verifies credentials

Server creates a JWT (token) and signs it

Token is sent to client

Client stores token (localStorage / cookie)

On every request:

Client sends token in header

Server verifies token signature

If valid → user is authenticated

Example (JWT)
const jwt = require("jsonwebtoken");

app.post("/login", (req, res) => {
  const token = jwt.sign(
    { id: 1, name: "Lovepreet" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ token });
});

app.get("/profile", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    res.send(user);
  } catch {
    res.status(401).send("Unauthorized");
  }
});

Pros

✅ No server-side storage
✅ Scales very well
✅ Perfect for APIs, mobile apps, SPAs

Cons

❌ Hard to revoke tokens
❌ Token theft = risk
❌ Larger request size (token sent every time)

Real-world usage

REST APIs

Mobile apps

React / Next.js / SPA apps

Microservices

🧠 Stateful vs Stateless (Quick Comparison)
Feature	Stateful	Stateless
Server stores session?	✅ Yes	❌ No
Scalable	❌ Hard	✅ Easy
Token stored on client	❌	✅
Logout handling	Easy	Hard
Best for	Traditional web apps	APIs & SPAs
🔥 Interview-ready one-liner

Stateful authentication stores user session data on the server, while
stateless authentication relies on tokens where each request independently proves authentication.