What is Cryptography?

Cryptography is the science of protecting information so that only the intended person/system can read or verify it.

It helps with:

🔐 Confidentiality (hide data)

🧾 Integrity (data not changed)

👤 Authentication (prove identity)

Types of Cryptography
1️⃣ Symmetric Encryption

👉 Same key is used to encrypt and decrypt data.

2️⃣ Asymmetric Encryption (Public-Key)

👉 Uses two keys

Public key → encrypt

Private key → decrypt

3️⃣ Hashing (One-way)

👉 Converts data into fixed-length value
👉 Cannot be reversed
Algorithms

SHA-256

bcrypt

4️⃣ Digital Signatures

👉 Ensures data authenticity + integrity

How it works

Data is hashed

Hash is encrypted with private key

Verified using public key

5️⃣ Message Authentication Code (HMAC)

👉 Hash + secret key

Used for

API request verification

Webhooks (Stripe, Razorpay)

Where Cryptography is Used in Node.js (Real Projects)
🔐 Authentication

Password hashing (bcrypt)

JWT signing & verification

OAuth tokens

Node.js Crypto Library

Built-in module 👉 crypto

Used for:

Encryption/decryption

Hashing

HMAC

Key generation

import crypto from "crypto";

How to Answer in Interview (Short & Strong)

Cryptography is used to secure data using encryption, hashing, and digital signatures. In Node.js, it’s commonly used for password hashing with bcrypt, JWT authentication, HTTPS security, API signature verification using HMAC, and payment gateway validations.

const crypto = require("crypto");

const hash = crypto
  .createHash("sha256")
  .update("my-secret-text")
  .digest("hex");

console.log(hash);


1️⃣ What is a digital signature (plain English)

A digital signature proves two things:

Who sent the data (authentication)

Data was not changed (integrity)

Sender can’t deny it later (non-repudiation)

👉 It does NOT hide data
👉 It DOES prove trust