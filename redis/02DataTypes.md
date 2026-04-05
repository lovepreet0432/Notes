🧱 1. Redis Data Types (Core Building Blocks)

Redis isn’t just key-value like {key: value} — it supports powerful data structures.

🔑 1. String (Most used)

👉 Simple key-value

SET name "Lovepreet"
GET name

📌 Use cases:

Caching API responses
Tokens (JWT, OTP)
Counters
📚 2. List (Ordered collection)

👉 Like array (push/pop)

LPUSH messages "Hello"
RPUSH messages "World"
LRANGE messages 0 -1

📌 Use cases:

Chat messages queue
Background jobs
🧩 3. Hash (Object-like)

👉 Perfect for storing objects

HSET user:1 name "Lovepreet" age 25
HGET user:1 name

📌 Use cases:

User profiles
Settings
🎯 4. Set (Unique values)

👉 No duplicates

SADD users "u1" "u2"
SMEMBERS users

📌 Use cases:

Unique visitors
Tags
Permissions
📊 5. Sorted Set (Ranking system)

👉 Values + score

ZADD leaderboard 100 "user1"
ZADD leaderboard 200 "user2"
ZRANGE leaderboard 0 -1 WITHSCORES

📌 Use cases:

Leaderboards
Rankings
Trending posts
⏱️ Bonus: Expiry (TTL)
SET token "abc123" EX 60

👉 Auto delete after 60 seconds

🔍 2. KEYS vs SCAN (VERY IMPORTANT ⚠️)

This is something many devs mess up in production.

❌ KEYS (Dangerous in production)
KEYS user:*

👉 Problem:

Blocks Redis
Scans entire database
Can crash app under load

📌 Use only:

Debugging
Small datasets
✅ SCAN (Production safe)
SCAN 0 MATCH user:* COUNT 10

👉 Why better:

Non-blocking
Iterates gradually
Safe for large datasets
🧠 Easy analogy:
KEYS = “Give me ALL data now” 😵
SCAN = “Give me data in chunks” 😌
👨‍💻 Node.js Example
async function scanKeys() {
  let cursor = 0;

  do {
    const reply = await client.scan(cursor, {
      MATCH: "user:*",
      COUNT: 10,
    });

    cursor = reply.cursor;

    for (let key of reply.keys) {
      console.log(key);
    }
  } while (cursor !== 0);
}
🔐 3. Using Redis as Session Store

This is where Redis shines in real apps.

🤔 Problem without Redis

If you store sessions in Node memory:

❌ Lost on server restart
❌ Doesn’t work with multiple servers (scaling issue)
✅ Redis Solution

👉 Centralized session storage
👉 All servers share same sessions

🧩 Flow
Client → Login → Server → Store session in Redis  
Client → Next request → Server → Fetch session from Redis
⚙️ Setup in Express

Install:

npm install express-session connect-redis redis
🧪 Example
import session from "express-session";
import RedisStore from "connect-redis";
import { createClient } from "redis";

const redisClient = createClient();
await redisClient.connect();

const store = new RedisStore({
  client: redisClient,
});

app.use(
  session({
    store,
    secret: "my-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);
🧠 What happens internally?

Redis stores something like:

session:abc123 → { userId: 1, isLoggedIn: true }
💡 Why Redis is perfect for sessions?
Fast (in-memory)
Supports expiry (auto logout)
Scalable across multiple servers
Reliable