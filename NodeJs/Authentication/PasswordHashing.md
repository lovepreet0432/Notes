1️⃣ Why we MUST hash passwords before saving

Storing plain passwords is a critical security flaw.

If DB is leaked and passwords are:

❌ Plain text → instant account takeover

❌ MD5 / SHA → cracked using rainbow tables

✅ bcrypt / argon2 → safe even after DB leak

👉 Rule: Passwords should never be readable — even by you

2️⃣ Hashing vs Encryption (quick clarity)

Encryption → reversible ❌

Hashing → irreversible ✅

Passwords must be hashed, not encrypted.

3️⃣ What makes password hashing special?

Password hashing must be:

Slow (to stop brute force)

Salted (to stop rainbow tables)

Adaptive (cost can increase over time)

That’s why we use:

✅ bcrypt

✅ argon2 (best)

❌ SHA / MD5 (never)

4️⃣ Best algorithms for password hashing
Algorithm	Status
bcrypt	Very popular
argon2	Best (modern)
scrypt	Good
SHA-256	❌ Never
5️⃣ Password hashing using bcrypt (Node.js)
Install
npm install bcrypt

Hash before saving to DB
const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const saltRounds = 10; // cost factor
  return await bcrypt.hash(password, saltRounds);
}

Save to DB
const hashedPassword = await hashPassword(req.body.password);

await User.create({
  email: req.body.email,
  password: hashedPassword
});

6️⃣ Login: compare password (never re-hash manually)
async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

if (!await verifyPassword(inputPassword, user.password)) {
  throw new Error("Invalid credentials");
}


✔ bcrypt extracts salt automatically
✔ Safe comparison
✔ Timing-attack safe

7️⃣ What is SALT (important 🔥)

Salt = random value added before hashing.

bcrypt internally does:

hash(salt + password)


Even if two users have same password:

hash1 ≠ hash2


👉 bcrypt handles salt automatically (you don’t manage it)

8️⃣ What NOT to do ❌ (common mistakes)

❌ Store plain password

❌ Use SHA-256 or MD5

❌ Use same salt for all users

❌ Compare hashes manually

❌ Log passwords

9️⃣ Using Argon2 (modern & recommended)
Install
npm install argon2

Hash
const argon2 = require("argon2");

const hash = await argon2.hash(password);

Verify
const isValid = await argon2.verify(hash, password);


👉 Argon2 is memory-hard → even better against GPU attacks

🔟 How passwords are stored in DB

Example bcrypt hash:

$2b$10$eImiTXuWVxfM37uY4JANjQ== 


This includes:

Algorithm

Cost factor

Salt

Hash

1️⃣1️⃣ Interview-ready answer (strong)

Passwords should be hashed before saving to the database using slow, salted algorithms like bcrypt or argon2. This ensures that even if the database is compromised, passwords cannot be reversed or easily cracked.