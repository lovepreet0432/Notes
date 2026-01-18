1️⃣ Showing S3 Upload Progress (Node.js)

Using @aws-sdk/lib-storage

Why this exists:

PutObjectCommand does not give progress

Upload (from lib-storage) does

Install required packages
npm install @aws-sdk/client-s3 @aws-sdk/lib-storage

Setup S3 Client
import { S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: "ap-south-1",
});


Credentials are picked from:

aws configure

env vars

IAM role (EC2 / Lambda)

Upload with Progress Tracking
import fs from "fs";
import { Upload } from "@aws-sdk/lib-storage";
import { s3 } from "./s3Client.js";

const uploadFile = async () => {
  const fileStream = fs.createReadStream("video.mp4");

  const upload = new Upload({
    client: s3,
    params: {
      Bucket: "my-test-bucket",
      Key: "uploads/video.mp4",
      Body: fileStream,
      ContentType: "video/mp4",
    },
  });

  upload.on("httpUploadProgress", (progress) => {
    if (progress.total) {
      const percent = Math.round(
        (progress.loaded / progress.total) * 100
      );
      console.log(`Upload progress: ${percent}%`);
    }
  });

  await upload.done();
  console.log("Upload completed");
};

uploadFile();

What you get in progress
{
  loaded: 5242880,
  total: 10485760
}


✔ Works for large files
✔ Uses multipart upload automatically
✔ Best solution for progress tracking

Real-world usage

CLI tools

Backend uploads

Streaming uploads

Progress bar via WebSocket

2️⃣ Creating Signed URLs (GET & PUT)

Signed URLs allow temporary access to private S3 objects.

No bucket public access
No policy changes
Time-limited access

Install signer package
npm install @aws-sdk/s3-request-presigner

3️⃣ GET Signed URL (Download)
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "./s3Client.js";

export const getSignedGetUrl = async () => {
  const command = new GetObjectCommand({
    Bucket: "my-test-bucket",
    Key: "uploads/video.mp4",
  });

  const url = await getSignedUrl(s3, command, {
    expiresIn: 60 * 5, // 5 minutes
  });

  return url;
};


Frontend usage:

GET https://signed-url


✔ Secure
✔ Temporary
✔ Best for downloads

4️⃣ PUT Signed URL (Upload directly from frontend)

Used when:

You don’t want file to pass through backend

Large uploads

Reduce server load

Create PUT Signed URL
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "./s3Client.js";

export const getSignedPutUrl = async () => {
  const command = new PutObjectCommand({
    Bucket: "my-test-bucket",
    Key: "uploads/photo.jpg",
    ContentType: "image/jpeg",
  });

  const url = await getSignedUrl(s3, command, {
    expiresIn: 60 * 5, // 5 minutes
  });

  return url;
};

Frontend Upload Example (PUT)
await fetch(signedUrl, {
  method: "PUT",
  headers: {
    "Content-Type": "image/jpeg",
  },
  body: file,
});


✔ Uploads directly to S3
✔ No backend bandwidth used
✔ Scales perfectly

5️⃣ GET vs PUT Signed URL (Quick Comparison)
Type	Purpose	Used by
GET	Download file	Browser / App
PUT	Upload file	Frontend
POST	Form uploads	Browser HTML
6️⃣ Common Mistakes (Avoid These)

❌ Missing ContentType mismatch
❌ Long expiry times
❌ Making bucket public unnecessarily
❌ Hardcoding credentials
❌ Using IAM user in production instead of role

7️⃣ Real Production Flow (Recommended)
Frontend → Backend → Signed URL → S3

Upload

Frontend asks backend for PUT URL

Backend returns signed URL

Frontend uploads directly to S3

Download

Backend returns GET signed URL

Frontend downloads securely

One-Line Notes (Perfect for revision)

Upload from lib-storage enables progress tracking

Signed URLs provide temporary secure access

PUT signed URL = direct upload

GET signed URL = secure download