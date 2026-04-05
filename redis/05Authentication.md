🔐 Why enable authentication in Redis?

By default, Redis:

Has no password
Accepts connections from anyone (if exposed)

❌ Risk:

Anyone can read/write/delete your data
Can flush DB (FLUSHALL) 😬
Can exploit your server

👉 So authentication is must-have in production

🧠 Redis Authentication Models

There are 2 ways:

1. Simple Password (Old way)
2. ACL (Access Control Lists – Modern way) ✅
🔑 1. Simple Password Authentication
⚙️ Enable password

In redis.conf:

requirepass myStrongPassword

Restart Redis.

🔌 Connect with password
redis-cli -a myStrongPassword

OR inside CLI:

AUTH myStrongPassword
👨‍💻 Node.js Example
import { createClient } from "redis";

const client = createClient({
  password: "myStrongPassword",
  socket: {
    host: "localhost",
    port: 6379,
  },
});

await client.connect();
⚠️ Limitation
Only one global password
No user roles
Not flexible

👉 That’s why we use ACL now 👇

👑 2. Redis ACL (Recommended)

👉 Introduced in Redis 6+

Allows:

Multiple users
Permissions control
Command restrictions
🧩 Create a user
ACL SETUSER myuser on >mypassword ~* +@all

👉 Meaning:

on → enable user
>mypassword → password
~* → access all keys
+@all → allow all commands
🔌 Connect using ACL
redis-cli -u redis://myuser:mypassword@localhost:6379
👨‍💻 Node.js Example
const client = createClient({
  username: "myuser",
  password: "mypassword",
  socket: {
    host: "localhost",
    port: 6379,
  },
});

await client.connect();
🔒 Restrict Permissions (Very Important)

Example:

ACL SETUSER readonly on >pass123 ~* +get +exists

👉 This user can:

✅ Read data
❌ Cannot write/delete
🎯 Real Use Cases
Read-only APIs
Admin vs user roles
Microservices with limited access