1️⃣ What is a character set in a computer?

A computer only understands numbers (0 and 1).
But humans use letters, digits, symbols, emojis, languages, etc.

So a character set is:

A mapping between characters and numbers

Example idea:

A → 65
B → 66
a → 97
0 → 48


Without a character set:

Computer sees numbers

Humans see text

No common language between them ❌

With a character set:

Computer stores numbers

Software shows correct characters ✅

📌 In short:
Character set = rulebook that tells which number represents which character

2️⃣ Why does ASCII store maximum 128 characters?

ASCII = American Standard Code for Information Interchange

It was created in the 1960s, mainly for:

English language

Teletypes

Early computers

Communication between machines

English doesn’t need:

Accents

Other languages

Emojis 😄

So ASCII included:

English letters (A–Z, a–z)

Digits (0–9)

Symbols (@ # $ %)

Control characters (Enter, Tab, Newline)

Total needed characters ≈ 128

That’s why:

ASCII range = 0 to 127 → total 128 characters

3️⃣ Why ASCII uses 7 bits?

Because of math + hardware limitations of that era.

Binary math:
1 bit  → 2 values
7 bits → 2⁷ = 128 values


Perfect match:

7 bits = 128 characters

Exactly what ASCII needed

Why not 8 bits?

Early systems were expensive

Saving 1 bit mattered

Data transmission was slower

7 bits was enough for English

Later:

Computers moved to 8-bit bytes

Extended ASCII (0–255) appeared

Still messy and inconsistent

📌 So:

ASCII is 7-bit because 2⁷ = 128 characters and that was sufficient at the time

4️⃣ What is Unicode?

ASCII solved English
But the world uses:

Hindi

Punjabi

Chinese

Arabic

Emojis

Symbols

Mathematical signs

ASCII totally fails here ❌

Unicode came to fix this

Unicode is:

A universal character set that assigns a unique number to every character in every language

Examples:

A      → U+0041
अ      → U+0905
ਕ      → U+0A15
中     → U+4E2D
😀      → U+1F600


Unicode can handle:

All languages

Emojis

Ancient scripts

Math symbols

Important clarification (very important for devs 👇)
Unicode ≠ UTF-8

Unicode = standard
UTF-8 / UTF-16 / UTF-32 = encoding formats

UTF-8:

Variable length (1 to 4 bytes)

Backward compatible with ASCII

Most popular on the web 🌍

Example:

A      → 1 byte
अ      → 3 bytes
😀      → 4 bytes


That’s why:

Websites

Node.js

React

Databases
mostly use UTF-8

One-line summary (perfect for notes)

Character set: Mapping of characters to numbers

ASCII: 7-bit system → 128 English characters

7 bits: 2⁷ = 128, hardware-friendly at that time

Unicode: Global standard for all languages and symbols