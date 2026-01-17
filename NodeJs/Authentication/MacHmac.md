1️⃣ What is MAC?

MAC = Message Authentication Code

A MAC is used to make sure:

Message is not modified (Integrity)

Message is from a trusted sender (Authenticity)

It uses:

The message

A shared secret key

👉 If you don’t have the secret, you can’t create a valid MAC.

2️⃣ What problem does MAC solve?

If I send you this:

amount=500


An attacker can change it to:

amount=5000


With MAC:

amount=500 + MAC(secret)


If attacker changes the message → MAC verification fails ❌

3️⃣ What is HMAC?

HMAC = Hash-based Message Authentication Code

It is a specific type of MAC

Uses a cryptographic hash function (SHA-256, SHA-512)

Uses a secret key

👉 HMAC is the most common MAC used in web systems.

4️⃣ MAC vs HMAC (simple)

MAC → general concept

HMAC → implementation using hashing

Example:

“Vehicle” is MAC, “Car” is HMAC 🚗

5️⃣ How HMAC works (simple flow)

Take the message

Mix it with a secret key

Hash using SHA-256

Output = HMAC

Verification:

Receiver recomputes HMAC using same secret

Compares both values

6️⃣ Why not just hash?
hash(message)


❌ Anyone can regenerate it

HMAC(secret, message)


✅ Only secret holder can generate it

7️⃣ Where MAC / HMAC is used (VERY important)
🔹 Signed Cookies

Cookie value + HMAC

Detects tampering

Used in Express, Next.js

🔹 JWT (HS256)
header.payload.HMAC(secret)


Auth tokens

Server-to-server trust

🔹 Payment Webhooks (Stripe, Razorpay)

Gateway signs payload using HMAC

Backend verifies authenticity

🔹 API Request Signing

AWS APIs

Private APIs between services

🔹 CSRF Protection

Token signed using HMAC

Prevents token tampering

8️⃣ HMAC vs Digital Signature (interview gold)
Feature	HMAC	Digital Signature
Key type	Shared secret	Public/Private keys
Verification	Private	Public
Speed	Fast	Slower
Best for	Internal systems	Public systems

👉 Use HMAC when both sides trust each other
👉 Use Digital Signature when public verification is needed

9️⃣ Real-life analogy

Secret handshake 🤝 = MAC

Anyone without the handshake fails

🔟 Interview-ready answers

MAC

A MAC ensures message integrity and authenticity using a shared secret key.

HMAC

HMAC is a hash-based MAC that combines a cryptographic hash function with a secret key to securely verify data integrity.