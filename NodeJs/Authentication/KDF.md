1️⃣ What is a Key Derivation Function (KDF)?

A KDF takes:

A weak or short secret (like a password)

A salt

A cost (time / memory)

…and turns it into a strong cryptographic key.

👉 Output = fixed-length key safe for encryption or authentication.

2️⃣ Why do we need KDFs?

Passwords are:

Short

Guessable

Low entropy

Encryption keys must be:

Random

Long

Hard to brute force

💡 KDF bridges this gap.

3️⃣ What problems KDFs solve

Prevent brute-force attacks

Defeat rainbow tables (salt)

Slow down attackers (cost)

Protect against GPU/ASIC attacks (memory-hard KDFs)

4️⃣ How a KDF works (simple flow)
password + salt
        ↓
  KDF (iterations / memory)
        ↓
  derived key (256-bit, 512-bit...)


Same password + same salt → same key
Different salt → different key

5️⃣ Most common KDFs (very important)
🔹 PBKDF2

Old but still widely used

CPU-intensive

Built into Node.js

🔹 bcrypt

Adaptive (cost factor)

Built-in salt

Common for password hashing

🔹 scrypt

Memory-hard

Strong vs GPUs

🔹 Argon2 (best)

Winner of Password Hashing Competition

Memory-hard + tunable

Recommended today