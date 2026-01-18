What is a Stream (real meaning)

A stream is a way to process data piece-by-piece instead of loading everything into memory at once.

Instead of:

Load all data → then process


Streams do:

Read chunk → process → next chunk


Each chunk is a Buffer 👈 (connects to your previous topic)

Why Streams are needed (very important)
Without streams (bad)
const data = fs.readFileSync("big.mp4");


Problems:

Huge RAM usage

App may crash

Slow startup

Not scalable

With streams (good)
fs.createReadStream("big.mp4");


Benefits:

Constant memory usage

Faster start

Handles GB-scale files

Backpressure support

Streams mental model
Source → [Buffer] → [Buffer] → Destination


Examples:

File → HTTP response

Request → File

S3 → Client

Types of Streams (core concept)

Node.js has 4 types of streams.

1️⃣ Readable Stream

Used to read data

Examples:

fs.createReadStream()

HTTP request (req)

process.stdin

Example
const fs = require("fs");

const readStream = fs.createReadStream("file.txt");

readStream.on("data", chunk => {
  console.log(chunk); // Buffer
});

readStream.on("end", () => {
  console.log("Finished reading");
});

2️⃣ Writable Stream

Used to write data

Examples:

fs.createWriteStream()

HTTP response (res)

process.stdout

Example
const writeStream = fs.createWriteStream("out.txt");

writeStream.write("Hello ");
writeStream.write("World");
writeStream.end();

3️⃣ Duplex Stream

Readable + Writable

Examples:

TCP sockets

WebSocket

net.Socket

Think:

Chat app
You send + receive

4️⃣ Transform Stream

Duplex stream that modifies data

Examples:

zlib.createGzip()

Crypto streams

Custom transforms

Example
const { Transform } = require("stream");

const upperCase = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  }
});

Piping in Streams (very important)
What is pipe?

Pipe connects the output of one stream directly to the input of another.

It handles:

Data flow

Backpressure

Errors (mostly)

Basic pipe example
const fs = require("fs");

fs.createReadStream("input.txt")
  .pipe(fs.createWriteStream("output.txt"));


What happens:

ReadStream → Buffer → WriteStream


No manual data handling needed.

Pipe with Transform
const zlib = require("zlib");

fs.createReadStream("file.txt")
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream("file.txt.gz"));


Flow:

Read → Compress → Write

Why pipe is better than events

❌ Manual:

read.on("data", chunk => write.write(chunk));


Problems:

No backpressure handling

Error-prone

Memory risk

✅ Pipe:

Built-in backpressure

Cleaner

Safer

Backpressure (must understand)

When the writable stream is slower than the readable stream

Pipe automatically:

Pauses readable

Resumes when writable drains

Without pipe → memory explosion 💥

Real-world examples you WILL use
File upload API
req.pipe(fs.createWriteStream("upload.png"));

Streaming response
fs.createReadStream("video.mp4").pipe(res);

S3 upload (conceptually)
File Stream → S3 Upload Stream

Important stream properties

highWaterMark → chunk size

objectMode → stream objects instead of buffers

readableFlowing → flowing vs paused mode

Interview one-liner

“Streams allow Node.js to process data incrementally using buffers, reducing memory usage. There are four types: Readable, Writable, Duplex, and Transform, and piping connects streams efficiently with built-in backpressure handling.”