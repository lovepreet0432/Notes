1️⃣ What does “signing a cookie” mean?

Signing a cookie ≠ encrypting a cookie

When you sign a cookie:

Cookie value is still readable

A signature is attached

Server can detect tampering

👉 Goal: integrity, not secrecy

2️⃣ Why do we need signed cookies?

Without signing:

role=user


User can change it to:

role=admin


With signing:

role=user.s3kd92ks9d...


If user modifies it → signature fails → cookie rejected ❌

3️⃣ How cookie signing works (internals)

Server has a secret key

Cookie value is hashed using HMAC

Signature is appended to cookie

On every request:

Recalculate signature

Compare

Match → trusted

👉 Usually uses HMAC-SHA256

4️⃣ Signing cookies using cookie-parser (most common)
Install
npm install express cookie-parser

Setup
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser("my_super_secret_key"));

Set signed cookie
app.get("/login", (req, res) => {
  res.cookie("userId", "12345", {
    signed: true,
    httpOnly: true,
    secure: true,
    sameSite: "strict"
  });

  res.send("Signed cookie set");
});

Read signed cookie
app.get("/profile", (req, res) => {
  console.log(req.signedCookies.userId); // "12345"
  console.log(req.cookies.userId);       // undefined

  res.send("Profile");
});


If tampered:

req.signedCookies.userId // undefined


🔥 That’s the protection

5️⃣ What exactly is inside a signed cookie?

Internally it looks like:

s:userIdValue.signature


Example:

s:12345.Gs82JdkdkS9d...


s: → signed

. → separator

signature → HMAC

6️⃣ Manual cookie signing (to really understand it)
Create signature
const crypto = require("crypto");

function sign(value, secret) {
  return crypto
    .createHmac("sha256", secret)
    .update(value)
    .digest("base64url");
}

Verify signature
function verify(value, signature, secret) {
  const expected = sign(value, secret);
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}

7️⃣ Signed vs Encrypted cookies
Feature	Signed	Encrypted
Readable	✅	❌
Tamper-proof	✅	✅
Hides data	❌	✅
Common usage	Sessions, IDs	Sensitive data

👉 Best practice:

Session ID → signed cookie

User data → stored server-side

8️⃣ Cookie signing in real systems
🔹 Session-based auth

Cookie stores sessionId

Session data in Redis / DB

🔹 CSRF protection

Signed CSRF token in cookie

🔹 OAuth state parameter

Signed state cookie

9️⃣ Security best practices (interview gold)

Use long random secret

Always use httpOnly

Use secure in production

Prefer sameSite=strict

Rotate secrets if compromised

🔟 Interview one-liner

Signed cookies ensure integrity by attaching a cryptographic signature to the cookie value, allowing the server to detect tampering without encrypting the data.