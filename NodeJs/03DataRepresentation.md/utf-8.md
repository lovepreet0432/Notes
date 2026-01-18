What is UTF-8 (one-line)

UTF-8 is a variable-length encoding of Unicode
It converts Unicode code points into 1 to 4 bytes using strict binary rules.

Key idea:

Small characters use fewer bytes, bigger characters use more bytes

That’s why UTF-8 is efficient and universal.

UTF-8 Golden Rules (memorize these)

Uses 1 to 4 bytes

ASCII characters stay exactly the same

First byte tells:

how many bytes follow

Continuation bytes always start with 10

1️⃣ UTF-8: 1-Byte Rule (ASCII)
Pattern
0xxxxxxx


Starts with 0

Remaining 7 bits store the character

Compatible with ASCII

Range
U+0000 → U+007F   (0 → 127)

Examples
Character	Unicode	Binary	Hex
A	U+0041	01000001	41
a	U+0061	01100001	61
0	U+0030	00110000	30

✔ Same as ASCII
✔ 1 byte only
✔ Fast and compact

2️⃣ UTF-8: 2-Byte Rule
Pattern
110xxxxx 10xxxxxx


First byte starts with 110

Second byte must start with 10

Total bits for character = 11 bits

Range
U+0080 → U+07FF

Example: © (Copyright)

Unicode:

© → U+00A9


Binary of U+00A9:

000 10101001


Fit into 11 bits:

00010101001


Split into:

11000010 10101001


Hex:

C2 A9


✔ Uses 2 bytes
✔ Common for European accents

3️⃣ UTF-8: 3-Byte Rule
Pattern
1110xxxx 10xxxxxx 10xxxxxx


First byte starts with 1110

Next two bytes start with 10

Total bits for character = 16 bits

Range
U+0800 → U+FFFF

Example: अ (Hindi)

Unicode:

अ → U+0905


Binary of 0905:

0000100100000101


Split into 16 bits:

00001001 00000101


Apply UTF-8 pattern:

11100000 10100100 10000101


Hex:

E0 A4 85


✔ Most Indian languages
✔ Arabic, Chinese (many), symbols

(Bonus) 4-Byte Rule (for completeness)
Pattern
11110xxx 10xxxxxx 10xxxxxx 10xxxxxx

Range
U+10000 → U+10FFFF

Example
😀 → U+1F600 → F0 9F 98 80


✔ Emojis
✔ Rare scripts

How UTF-8 Decoding Works (important logic)

When reading bytes:

0xxxxxxx → 1 byte char

110xxxxx → read 1 more byte

1110xxxx → read 2 more bytes

11110xxx → read 3 more bytes

Continuation bytes:

10xxxxxx → always continuation


This makes UTF-8:

Self-synchronizing

Safe for streams

Easy to validate

Why UTF-8 is used everywhere

✔ Backward compatible with ASCII
✔ Saves memory
✔ Handles all languages
✔ Safe for APIs, JSON, HTML
✔ No endianness issues

That’s why:

HTML → <meta charset="UTF-8">

JS strings

Node.js buffers

Databases default to UTF-8