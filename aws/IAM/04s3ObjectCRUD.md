AWS S3 Object Commands (Node.js SDK v3)

First, common setup 👇

import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "ap-south-1",
});

1️⃣ ListObjectsV2Command

👉 List objects (files) inside a bucket

Used for:

File listing

Pagination

Folder-like structures

Example
import { ListObjectsV2Command } from "@aws-sdk/client-s3";

const command = new ListObjectsV2Command({
  Bucket: "my-test-bucket",
  Prefix: "uploads/",      // optional (acts like folder)
  MaxKeys: 10              // optional
});

const data = await s3.send(command);

data.Contents?.forEach(obj => {
  console.log(obj.Key, obj.Size);
});


📌 Important fields:

Key → file path

Size → file size

LastModified

2️⃣ HeadObjectCommand

👉 Get object metadata without downloading the file

Used for:

Checking if file exists

Getting size, content-type

Validating permissions

Example
import { HeadObjectCommand } from "@aws-sdk/client-s3";

const command = new HeadObjectCommand({
  Bucket: "my-test-bucket",
  Key: "uploads/photo.jpg",
});

const data = await s3.send(command);

console.log("Size:", data.ContentLength);
console.log("Type:", data.ContentType);


✔ Very fast
✔ No bandwidth cost

❌ Fails if object doesn’t exist (404)

3️⃣ GetObjectCommand (Download file)

👉 Download object from S3

In Node.js, S3 returns a stream, not a buffer.

Example (Download & Save)
import { GetObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";

const command = new GetObjectCommand({
  Bucket: "my-test-bucket",
  Key: "uploads/photo.jpg",
});

const response = await s3.send(command);

// Stream to file
response.Body.pipe(fs.createWriteStream("photo.jpg"));


📌 In Express API:

You can pipe directly to res

4️⃣ PutObjectCommand (Upload file)

👉 Upload file to S3

Upload from Buffer / File
import { PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";

const fileStream = fs.createReadStream("photo.jpg");

const command = new PutObjectCommand({
  Bucket: "my-test-bucket",
  Key: "uploads/photo.jpg",
  Body: fileStream,
  ContentType: "image/jpeg",
});

await s3.send(command);
console.log("File uploaded");


📌 Common options:

ContentType

CacheControl

Metadata

ACL (avoid, use bucket policy)

5️⃣ DeleteObjectCommand

👉 Delete object from S3

Example
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

const command = new DeleteObjectCommand({
  Bucket: "my-test-bucket",
  Key: "uploads/photo.jpg",
});

await s3.send(command);
console.log("File deleted");


✔ Instant
✔ No recovery unless versioning enabled

6️⃣ getPublicUrl (VERY IMPORTANT)

S3 does not provide a command for public URL.
You construct it manually.

Public URL Format
Standard S3 URL
https://<bucket-name>.s3.<region>.amazonaws.com/<object-key>

Example
function getPublicUrl(bucket, region, key) {
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}

const url = getPublicUrl(
  "my-test-bucket",
  "ap-south-1",
  "uploads/photo.jpg"
);

console.log(url);


⚠️ This works ONLY IF:

Public access block disabled

Bucket policy allows s3:GetObject

When NOT to use Public URL

❌ Sensitive files
❌ Private documents
❌ User data

Instead use:

Signed URLs

Bonus: Signed URL (Secure Way)
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";

const command = new GetObjectCommand({
  Bucket: "my-test-bucket",
  Key: "uploads/private.pdf",
});

const signedUrl = await getSignedUrl(s3, command, {
  expiresIn: 60 * 5, // 5 minutes
});

console.log(signedUrl);


✔ Temporary
✔ Secure
✔ Production-ready