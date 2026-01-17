🧠 1. Data Representation in Computing

Computers don’t understand text, colors, or sounds directly — they only understand numbers (0 and 1).
Everything — your text, images, videos, emojis — gets represented as a series of binary digits (bits).

So basically:

Data representation = How information is stored and processed as 0s and 1s.

Example:
When you write "A" in your program → internally the computer converts it to a binary code (like 01000001).

🔢 2. Number Systems (Decimal, Binary, Octal, Hexadecimal)
System	Base	Digits Used	Example	Meaning in Decimal
Decimal	10	0–9	45	45
Binary	2	0, 1	1011	1×8 + 0×4 + 1×2 + 1×1 = 11
Octal	8	0–7	57	5×8 + 7 = 47
Hexadecimal	16	0–9, A–F	1A	1×16 + 10 = 26

👉 Hexadecimal is very common in computing because it’s compact and easily converts to binary.

Example:
Binary 1111 1111 = Hex FF = Decimal 255

💾 3. Digital Data Units

Data is stored in bits and bytes.

Unit	Symbol	Size	Example
Bit	b	Smallest unit (0 or 1)	1 bit = either ON or OFF
Byte	B	8 bits	01000001 = 1 Byte (‘A’)
Kilobyte	KB	1024 Bytes	~ one small text file
Megabyte	MB	1024 KB	~ one song
Gigabyte	GB	1024 MB	~ one movie
Terabyte	TB	1024 GB	~ a big hard drive
🔤 4. Character Set & Character Encoding
Character Set:

It’s like a dictionary — a collection of all possible characters a computer can represent (like letters, numbers, emojis).

Examples:

ASCII → English characters only (A–Z, a–z, digits, symbols)

Unicode → Characters from all languages + emojis 😄

Character Encoding:

Encoding means assigning numbers (codes) to each character from that set, and then converting those numbers to binary for storage.

Example:

Character	Code (ASCII)	Binary
A	65	01000001
a	97	01100001

So, "Hello" is actually stored as:
01001000 01100101 01101100 01101100 01101111

🌍 5. UTF-8 (in detail)

UTF-8 is the most common text encoding on the web.
It’s a way to store Unicode characters efficiently.

🧩 How it works:

UTF-8 uses 1 to 4 bytes per character.

Range	Bytes	Example
U+0000 to U+007F	1 byte	English letters
U+0080 to U+07FF	2 bytes	Latin, Greek
U+0800 to U+FFFF	3 bytes	Most languages
U+10000 to U+10FFFF	4 bytes	Emojis, rare symbols
Example:
Character	Unicode	UTF-8 Bytes (in Hex)
A	U+0041	41
©	U+00A9	C2 A9
😀	U+1F600	F0 9F 98 80

👉 That’s why “UTF” = Unicode Transformation Format.

So UTF-8 can represent any character from any language, but still keeps English text short (1 byte per char).

🔠 6. UTF-16

UTF-16 also stores Unicode characters, but it uses 2 or 4 bytes per character.

Range	Bytes	Example
U+0000–U+FFFF	2 bytes	Most normal letters
U+10000–U+10FFFF	4 bytes	Emojis, rare symbols

Example:

Character	Unicode	UTF-16 (Hex)
A	U+0041	00 41
😀	U+1F600	D8 3D DE 00

UTF-16 is common in systems like Windows, Java, and JavaScript (internally strings in JS use UTF-16).

💡 Quick Node.js Example
// Character encoding example in Node.js
const text = "A😀";
const utf8 = Buffer.from(text, 'utf8');
const utf16 = Buffer.from(text, 'utf16le'); // 'le' = little endian

console.log("UTF-8 bytes:", utf8);
console.log("UTF-16 bytes:", utf16);


Output:

UTF-8 bytes: <Buffer 41 f0 9f 98 80>
UTF-16 bytes: <Buffer 41 00 3d d8 00 de>


Notice how the emoji takes more bytes — because emojis live in higher Unicode ranges
















🧱 1. Introduction to Buffers

A buffer is just a temporary space in memory used to hold binary data — basically raw bytes (0s and 1s).

Why? Because sometimes Node.js needs to handle data that isn’t text:

Reading a file (image, video, PDF)

Handling network packets

Streaming audio/video

📦 Think of a buffer as a box that temporarily stores raw data while your code processes it.

💡 Example
// Creating a buffer from a string
const buf = Buffer.from('Hello');
console.log(buf);          // <Buffer 48 65 6c 6c 6f>
console.log(buf.toString()); // Hello


48 65 6c 6c 6f are the hexadecimal codes for “Hello”.

🧩 2. ArrayBuffer in JavaScript

Before Node.js Buffers existed, browsers already had a concept of ArrayBuffer — a fixed-length binary data container.

It’s low-level and doesn’t know what type of data it holds.

You use TypedArrays (like Uint8Array, Int16Array) to read/write it.

Example:

const buffer = new ArrayBuffer(8); // 8 bytes
console.log(buffer.byteLength); // 8


But you can’t access buffer[0] directly — you need a view.

🔢 3. Signed and Unsigned Values
Unsigned:

Only positive numbers.

Example: Uint8Array stores values from 0 to 255.

Signed:

Can hold both negative and positive numbers.

Example: Int8Array stores values from -128 to +127.

Example:

const unsigned = new Uint8Array([255]);
const signed = new Int8Array([255]);
console.log(unsigned[0]); // 255
console.log(signed[0]);   // -1 (overflow wraps around)

✍️ 4. Reading and Writing to ArrayBuffers

You can manipulate binary data through views (typed arrays or DataView).

Example:

const buffer = new ArrayBuffer(4);
const view = new Uint8Array(buffer);

view[0] = 65; // A
view[1] = 66; // B
view[2] = 67; // C
view[3] = 68; // D

console.log(new TextDecoder().decode(view)); // ABCD


You can also use DataView for more control (like setting 16-bit or 32-bit numbers).

⚙️ 5. Typed Arrays

TypedArrays are views that let you interpret the bytes in an ArrayBuffer as a specific data type.

TypedArray	Bytes per element	Range
Int8Array	1	-128 to 127
Uint8Array	1	0 to 255
Int16Array	2	-32768 to 32767
Float32Array	4	Decimal numbers
Float64Array	8	High precision

Example:

const buf = new ArrayBuffer(4);
const intView = new Int16Array(buf);
intView[0] = 500;
intView[1] = 1000;

console.log(intView); // Int16Array(2) [500, 1000]

💾 6. Transforming ArrayBuffer Data (Memory ↔ Disk ↔ Network)

Data moves between memory, disk, and network as binary streams.

Example process:

You read file data (binary) → stored in memory as Buffer/ArrayBuffer.

You transform it (compress, encrypt, parse).

You send it over network or write it back to disk.

Example:

import fs from 'fs';

// Read file into a buffer
const data = fs.readFileSync('photo.jpg');

// Send over network (simulated)
console.log('Sending data size:', data.length);

// Write it back
fs.writeFileSync('copy.jpg', data);

⚡ 7. Buffers in Node.js

Node.js adds its own Buffer class — built on top of Uint8Array, optimized for:

File I/O

Network sockets

Streams

Unlike ArrayBuffer, Node’s Buffer:

Has extra helper methods (toString(), slice(), etc.)

Can easily convert strings ↔ bytes

Is directly usable with Node APIs

Example:

const buf = Buffer.from('NodeJS');
console.log(buf); // <Buffer 4e 6f 64 65 4a 53>
console.log(buf.toString('utf8')); // NodeJS

🧱 8. alloc() vs allocUnsafe()
Buffer.alloc(size)

Creates a buffer of given size filled with zeros.

Safe but slower (memory is cleared).

Buffer.allocUnsafe(size)

Creates a buffer without clearing memory.

Faster but may contain old memory data (potentially sensitive).

Example:

const safeBuf = Buffer.alloc(10);
const fastBuf = Buffer.allocUnsafe(10);

console.log('Safe Buffer:', safeBuf);
console.log('Unsafe Buffer:', fastBuf);


Output:

Safe Buffer: <Buffer 00 00 00 00 00 00 00 00 00 00>
Unsafe Buffer: <Buffer 8a 4f ...random bytes...>


👉 Use allocUnsafe only if you immediately overwrite the buffer’s content.

🏊 9. Buffer Pool

Node.js manages a Buffer Pool behind the scenes to avoid creating small memory chunks again and again.

When you need a small buffer, Node may slice it from a pre-allocated pool.

This improves performance (less memory allocation overhead).

Simplified concept:

[ Memory Pool (8KB) ]
|---|---|---|---|---|---|
 Small Buffer Requests


Example:
When you call Buffer.alloc(10) multiple times,
Node reuses space from that pool instead of asking the OS for new memory each time.


🧱 1. Buffer Pool — In Depth

When Node.js handles streams (like file reads or network sockets), it needs to create many small buffers — sometimes thousands per second.
If it called the OS for memory each time, it would be slow and wasteful.

So Node uses a Buffer Pool, a pre-allocated chunk of memory (default: ~8KB) from which smaller buffers are sliced.

⚙️ How it works (simplified view):

Imagine Node creates a pool of 8KB like this:

[Buffer Pool: 8192 bytes]
|------------------------------------------------|
0                                               8192


Now, when you call:

Buffer.alloc(100);


Node doesn’t go to the OS for new memory — it just cuts out 100 bytes from that pool.

Next call:

Buffer.alloc(200);


→ Takes the next 200 bytes.

Once the pool is full, Node allocates a new one.
This reduces memory fragmentation and system calls, making performance smoother — especially in network-heavy apps.

🔍 Quick Example

When you do:

const buf1 = Buffer.alloc(100);
const buf2 = Buffer.alloc(100);


Internally:

Both may come from the same pool.

They’re separate slices pointing to the same underlying memory region.

That’s why modifying one buffer slice can affect another if you directly share memory references (which is why Node carefully manages them).

🧰 2. Buffer Methods and Properties

Here are the most commonly used Buffer methods and what they do 👇

🏗️ Creation
Buffer.alloc(size)        // Zero-filled buffer
Buffer.allocUnsafe(size)  // Faster, uninitialized
Buffer.from(string)       // From string
Buffer.from(array)        // From array of bytes
Buffer.from(otherBuffer)  // Copy of another buffer

🧮 Reading / Writing
const buf = Buffer.alloc(4);

buf.write('AB'); // write data
console.log(buf.toString()); // AB

buf[0] = 65; // write ASCII code directly
console.log(buf.toString()); // AB

🔎 Conversion
const buf = Buffer.from('Node');
console.log(buf.toString('utf8'));  // Node
console.log(buf.toString('hex'));   // 4e6f6465
console.log(buf.toString('base64'));// Tm9kZQ==

✂️ Slicing / Copying
const buf1 = Buffer.from('Hello');
const buf2 = buf1.slice(0, 2); // He
buf1[0] = 74; // Change H → J
console.log(buf2.toString());  // Je  (same memory reference!)


Use .copy() if you want a true clone:

const copy = Buffer.alloc(2);
buf1.copy(copy, 0, 0, 2);

📏 Properties
Property	Description
buf.length	Size in bytes
Buffer.byteLength(str)	Byte length of a string
Buffer.isBuffer(obj)	Check if it’s a buffer
Buffer.compare(buf1, buf2)	Compare two buffers

Example:

const buf = Buffer.from('Hi');
console.log(buf.length); // 2
console.log(Buffer.isBuffer(buf)); // true

💼 3. Practical Use of Buffers

Buffers are everywhere behind the scenes in Node.js — especially when handling binary data.

✅ Common use cases

File system operations

import fs from 'fs';
const data = fs.readFileSync('image.png');
console.log(data); // <Buffer ...binary data...>


Networking (TCP/UDP sockets)

socket.on('data', (chunk) => {
  console.log('Received:', chunk.toString());
});


Streams

const readStream = fs.createReadStream('video.mp4');
readStream.on('data', (chunk) => {
  console.log('Chunk size:', chunk.length);
});


Cryptography

import crypto from 'crypto';
const hash = crypto.createHash('sha256').update(Buffer.from('secret')).digest('hex');
console.log(hash);


Binary Protocols / Image Manipulation

Working with image pixels

Reading custom binary formats

Serializing data to send over network

⚠️ 4. Limitations of Buffers

Even though buffers are powerful, they have some caveats:

Limitation	Explanation
Fixed Size	Once created, size can’t change (no dynamic resizing).
Manual Memory Management	You must track how much memory you use to avoid leaks.
Unsafe Allocations	Using allocUnsafe() incorrectly may expose sensitive old memory data.
Limited High-Level Operations	Buffers don’t have built-in JSON parsing, string splitting, etc.
Endianness Issues	When dealing with multi-byte numbers, byte order matters between systems.
🔐 5. Base64 Encoding
What is Base64?

It’s a way to represent binary data as text using only 64 printable ASCII characters.
Useful when you need to send binary data (like images) over systems that only handle text (like JSON, email, or URLs).

Base64 uses:

A–Z, a–z, 0–9, +, /


Each 3 bytes of binary data = 4 characters in Base64.

💡 Example

Binary → Base64 process:

Text: "Man"
ASCII: 77 97 110
Binary: 01001101 01100001 01101110
Grouped (6 bits): 010011 010110 000101 101110
Base64 chars: T  W  F  u
Result: "TWFu"

🧠 6. Base64 in Node.js

Node makes Base64 conversion super easy using Buffers.

➡️ Encode
const str = 'Hello World';
const encoded = Buffer.from(str).toString('base64');
console.log(encoded); // SGVsbG8gV29ybGQ=

⬅️ Decode
const decoded = Buffer.from(encoded, 'base64').toString('utf8');
console.log(decoded); // Hello World

💾 Example with binary data
import fs from 'fs';

// Read image as buffer
const img = fs.readFileSync('logo.png');

// Convert to Base64 string (for sending via JSON or API)
const base64Image = img.toString('base64');

// Write back to new file
fs.writeFileSync('copy.png', Buffer.from(base64Image, 'base64'));










🌊 1. What Are Streams?

A stream is simply a way to handle data piece by piece (chunks), instead of loading it all at once into memory.

Think of a stream like a pipe — data flows through it continuously.

👉 Instead of waiting for a 2GB file to finish loading, you start processing it as soon as the first chunk arrives.

🧩 Example:

Without streams:

import fs from 'fs';
const data = fs.readFileSync('largefile.mp4'); // loads full file into memory
console.log('File size:', data.length);


This can crash your program for large files because it loads everything at once.

With streams:

import fs from 'fs';
const stream = fs.createReadStream('largefile.mp4');
stream.on('data', (chunk) => console.log('Received chunk:', chunk.length));
stream.on('end', () => console.log('Done!'));


✅ Now it reads the file in chunks — super memory efficient.

💧 2. Types of Streams in Node.js

Node has four main types of streams:

Stream Type	Used For	Example
Readable	Read data from source	fs.createReadStream(), HTTP request body
Writable	Write data to destination	fs.createWriteStream(), HTTP response
Duplex	Both readable and writable	net.Socket()
Transform	Duplex + modifies data	zlib.createGzip() (compression)
⚙️ Example of each:
1️⃣ Readable Stream:
import fs from 'fs';
const readStream = fs.createReadStream('input.txt');
readStream.on('data', chunk => console.log('Chunk:', chunk.toString()));

2️⃣ Writable Stream:
import fs from 'fs';
const writeStream = fs.createWriteStream('output.txt');
writeStream.write('Hello Stream!');
writeStream.end();

3️⃣ Duplex Stream:
import { Duplex } from 'stream';
const duplex = new Duplex({
  read(size) {},
  write(chunk, encoding, callback) {
    console.log('Writing:', chunk.toString());
    callback();
  }
});
duplex.write('Duplex example!');

4️⃣ Transform Stream:
import { Transform } from 'stream';
const upperCase = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  }
});
process.stdin.pipe(upperCase).pipe(process.stdout);


💡 Type something — it prints it back in uppercase!

🧠 3. Readable Stream States

A readable stream goes through different states as data flows in and out.

Let’s visualize it 👇

States:

Readable not flowing (paused mode)

Stream created, not actively sending data.

You must call .read() or attach 'data' listener to start flow.

Flowing mode

Automatically reads and emits 'data' events as chunks arrive.

End / Closed

No more data. Emits 'end' then 'close'.

🔍 Example:
import fs from 'fs';
const stream = fs.createReadStream('file.txt');

// Initially paused
console.log(stream.readableFlowing); // null

stream.on('data', (chunk) => {
  console.log('Flowing:', stream.readableFlowing); // true
  console.log('Chunk:', chunk.toString());
});

stream.on('end', () => {
  console.log('End:', stream.readableFlowing); // false
});


Output:

null
Flowing: true
Chunk: Hello Stream
End: false

🚦 State Transitions:
State	How it Starts	How to Stop
Paused	Default state	.pause()
Flowing	Attach data listener or call .resume()	.pause()
End	When all data read	Auto stop
🧱 4. Internal Buffer of Readable Streams

Every readable stream in Node has an internal buffer — a temporary storage where chunks are kept before your code processes them.

Think of it like a waiting area:

[Data Source] → [Internal Buffer] → [Your Code]

🔍 Buffer Behavior:

When data arrives from disk/network, Node stores it in the buffer.

When your code is ready, it reads chunks from that buffer.

If your code is too slow, the buffer can fill up.

If buffer is full → stream pauses automatically (backpressure control).

⚙️ Check Buffer Size

Each readable stream has:

stream.readableHighWaterMark  // Max buffer size
stream.readableLength         // Current buffer usage


Example:

import fs from 'fs';
const readStream = fs.createReadStream('large.txt', { highWaterMark: 16 * 1024 }); // 16KB chunks

readStream.on('data', (chunk) => {
  console.log('Chunk size:', chunk.length);
  console.log('Buffer limit:', readStream.readableHighWaterMark);
  console.log('Buffered bytes:', readStream.readableLength);
});

🧠 Terms to Remember
Term	Meaning
HighWaterMark	Max size of internal buffer (default: 64KB for files)
Backpressure	When the writer/reader can’t process data as fast as it’s coming in
Drain	Event that signals buffer is ready to accept more data
💡 5. Example of Backpressure & Internal Buffer

Here’s how Node handles data flow smartly:

import fs from 'fs';

const readStream = fs.createReadStream('big.txt');
const writeStream = fs.createWriteStream('copy.txt');

// Pipe automatically manages backpressure
readStream.pipe(writeStream);


Without .pipe(), you’d need to manually pause/resume streams:

readStream.on('data', (chunk) => {
  const ok = writeStream.write(chunk);
  if (!ok) readStream.pause(); // stop reading if write buffer full
});

writeStream.on('drain', () => {
  readStream.resume(); // resume when writable buffer cleared
});


This is Node’s flow control system — keeps things efficient and memory-safe.


🧩 Writable Streams – What Are They?

A writable stream is used to send data to a destination — like writing to a file, sending data to an HTTP response, or writing to a socket.

Node.js provides many built-in writable streams, for example:

fs.createWriteStream() → writes to a file

process.stdout → writes to console

http.ServerResponse → sends data to client

🔁 How Writable Streams Work

When you call .write(data) on a writable stream, Node.js:

Writes data to an internal buffer (not immediately to disk/network).

When the buffer is full, it pauses writing new data until it drains.

Finally, you call .end() to signal that no more data is coming.

Example:
import fs from "fs";

const stream = fs.createWriteStream("numbers.txt");

for (let i = 1; i <= 5; i++) {
  const ok = stream.write(`Number: ${i}\n`);
  console.log(i, ok); // shows false when internal buffer is full
}

stream.end(() => console.log("File writing complete!"));


If .write() returns false, it means the internal buffer is full, and you should pause writing until the 'drain' event fires.

🧠 Internal Buffer of Writable Stream

Each writable stream has an internal buffer (default size: 16 KB for files, 16 MB for TCP sockets).

When you .write(data), it first goes into that buffer.
If data comes faster than it can be written, the buffer fills up.

That’s where backpressure comes in 👇

⚖️ Backpressure

Backpressure happens when data is being written faster than the destination can handle.

Think of it like:

You’re pouring water (data) into a bottle (destination) through a funnel (stream). If you pour too fast — it spills.

In Node.js:

.write() returns false → stop writing temporarily

Listen for 'drain' event → resume writing

Example:
import fs from "fs";

const file = fs.createWriteStream("big.txt");

let i = 0;
function write() {
  let ok = true;
  while (i < 1e6 && ok) {
    i++;
    ok = file.write(`Number: ${i}\n`);
  }

  if (i < 1e6) {
    file.once("drain", write); // resume writing later
  } else {
    file.end();
    console.log("Done!");
  }
}

write();


This example efficiently writes 1 million numbers using streams without crashing your memory.

🔄 States of Writable Streams

Writable streams have different states:

State	Description
writable.writable	true if you can still write
writable.writableEnded	true after .end() is called
writable.writableFinished	true when stream is completely done writing
writable.writableNeedDrain	true if internal buffer is full
writable.writableHighWaterMark	Maximum buffer size before backpressure triggers
🔗 Piping Streams

The .pipe() method connects a readable stream to a writable stream.
It automatically handles backpressure for you!

Example:
import fs from "fs";

const readable = fs.createReadStream("input.txt");
const writable = fs.createWriteStream("output.txt");

readable.pipe(writable);


No manual buffer handling needed — .pipe() takes care of it!

🔀 Duplex, Transform, and PassThrough Streams
Type	Description	Example
Duplex	Both readable and writable	TCP socket
Transform	Duplex stream that modifies data	gzip, zlib compression
PassThrough	Transform stream that just passes data	debugging stream pipelines
Example: Transform stream (convert data to uppercase)
import { Transform } from "stream";

const upperCase = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  },
});
process.stdin.pipe(upperCase).pipe(process.stdout);

📊 Data Streams

Data streams let you handle large datasets piece by piece instead of loading everything into memory.

Examples in Node:

File I/O (fs)

HTTP requests/responses

TCP/UDP connections

Compression (zlib)

⚙️ Writing 1 Lakh Numbers With or Without Streams
❌ Without streams:
import fs from "fs";

let data = "";
for (let i = 1; i <= 100000; i++) {
  data += `Number: ${i}\n`;
}
fs.writeFileSync("numbers.txt", data);


➡️ Loads all 100k lines in memory — slow, high RAM usage.

✅ With streams:
import fs from "fs";

const file = fs.createWriteStream("numbers_stream.txt");

for (let i = 1; i <= 100000; i++) {
  if (!file.write(`Number: ${i}\n`)) {
    file.once("drain", () => console.log("Resumed..."));
  }
}
file.end();


➡️ Writes gradually — uses minimal memory.

⚡ Why Streams Are Fast

Chunk-based processing: Data handled in pieces, not as a whole.

Low memory footprint: No need to store full data in RAM.

Asynchronous: Non-blocking I/O improves throughput.

Built-in backpressure control: Smooth flow without overloading resources.






