1️⃣ Data representation in computing (big picture)

At the lowest level, computers don’t understand characters, numbers, images, or code.
They understand only two states:
ON / OFF
HIGH voltage / LOW voltage
TRUE / FALSE

👉 These two states are represented as 0 and 1

Everything you see:
text
images
videos
databases

code
is ultimately converted into patterns of 0s and 1s.

2️⃣ Number systems (why multiple systems exist)
A number system defines:
how many symbols we use
how values increase
Decimal (Base 10)
Used by humans

Digits: 0–9
345 = (3×10²) + (4×10¹) + (5×10⁰)
Binary (Base 2)
Used by computers
Digits: 0, 1

101 = (1×2²) + (0×2¹) + (1×2⁰) = 5

Octal (Base 8)

Digits: 0–7
Mostly historical (Unix permissions)

755 (octal) = rwxr-xr-x

Hexadecimal (Base 16)

Digits: 0–9, A–F

FF = 255


📌 Hex is used because it is:

compact
human-readable
maps cleanly to binary

3️⃣ Relationship between Binary and Hex (important)

1 hex digit = 4 bits

Binary:  11111111
Hex:     FF


That’s why:

memory dumps
buffers
network packets
are shown in hex, not decimal.

4️⃣ Digital data units (very important)
Bit

Smallest unit
Value: 0 or 1
Byte
8 bits
Range: 0–255
10101010 → 1 byte

Larger units
Unit	Size
1 KB	1024 bytes
1 MB	1024 KB
1 GB	1024 MB

📌 Buffers store bytes, not bits

5️⃣ Binary data at the physical level (THIS IS KEY 🔑)

Inside your computer:
No numbers
No text
No colors
Only electric signals

Example

High voltage → 1
Low voltage → 0
Memory cells (RAM) store:
Charged = 1
Discharged = 0

Hard disks:
Magnetized in one direction = 1
Opposite direction = 0

👉 Binary matches physics perfectly
That’s why computers use it.