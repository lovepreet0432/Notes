1️⃣ AWS SDK for S3 (What & Why)

AWS SDK lets your code talk to AWS services programmatically.

For Node.js:

Old: aws-sdk (v2) ❌

New: AWS SDK v3 ✅ (modular, faster, recommended)

For S3 we use:

npm install @aws-sdk/client-s3


Why SDK?

Upload files

Create/delete buckets

Manage policies

Automation

Backend APIs

2️⃣ Create IAM User with ONLY S3 Access
Step 1: Create IAM User

IAM → Users → Create user

Access type:

✅ Programmatic access

(CLI + SDK)

Step 2: Attach Policy (S3 only)

Attach AWS Managed Policy (simple):

AmazonS3FullAccess


OR (better) create Custom Policy 👇

{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:*",
      "Resource": "*"
    }
  ]
}


✔ Only S3
❌ No EC2, IAM, Lambda access

Step 3: Save Credentials

You’ll get:

AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY


⚠️ Save once. AWS won’t show again.

3️⃣ Use IAM Credentials in AWS CLI
Configure AWS CLI
aws configure


Enter:

AWS Access Key ID:     xxxx
AWS Secret Access Key: xxxx
Default region:        ap-south-1
Default output:        json


Test:

aws s3 ls


If this works → IAM user setup is correct ✅

4️⃣ Node.js SDK Setup (S3 Client)
import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "ap-south-1",
});


Credentials are auto-picked from:

aws configure

environment variables

EC2/Lambda role

No need to hardcode keys 👍

5️⃣ CRUD Operations Using Node.js SDK (S3)
✅ Create Bucket
import { CreateBucketCommand } from "@aws-sdk/client-s3";

const command = new CreateBucketCommand({
  Bucket: "my-test-bucket-12345",
});

await s3.send(command);
console.log("Bucket created");


⚠️ Bucket names must be globally unique

✅ Get Bucket (List Buckets)
import { ListBucketsCommand } from "@aws-sdk/client-s3";

const command = new ListBucketsCommand({});
const data = await s3.send(command);

console.log(data.Buckets);

✅ Delete Bucket

Bucket must be empty first.

import { DeleteBucketCommand } from "@aws-sdk/client-s3";

const command = new DeleteBucketCommand({
  Bucket: "my-test-bucket-12345",
});

await s3.send(command);
console.log("Bucket deleted");

6️⃣ Put Public Access Block (IMPORTANT)

By default, AWS blocks public access.

putPublicAccessBlockCommand
import { PutPublicAccessBlockCommand } from "@aws-sdk/client-s3";

const command = new PutPublicAccessBlockCommand({
  Bucket: "my-test-bucket-12345",
  PublicAccessBlockConfiguration: {
    BlockPublicAcls: false,
    IgnorePublicAcls: false,
    BlockPublicPolicy: false,
    RestrictPublicBuckets: false,
  },
});

await s3.send(command);
console.log("Public access block updated");


⚠️ Required before making bucket public.

7️⃣ Update Bucket Policy (Make Objects Public)
Example: Public Read Policy
import { PutBucketPolicyCommand } from "@aws-sdk/client-s3";

const bucketPolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Principal: "*",
      Action: "s3:GetObject",
      Resource: "arn:aws:s3:::my-test-bucket-12345/*",
    },
  ],
};

const command = new PutBucketPolicyCommand({
  Bucket: "my-test-bucket-12345",
  Policy: JSON.stringify(bucketPolicy),
});

await s3.send(command);
console.log("Bucket policy updated");


Now:

https://my-test-bucket-12345.s3.amazonaws.com/file.jpg


will be publicly accessible.

8️⃣ Important Security Notes (REAL WORLD)

✔ Prefer IAM Roles over IAM Users in production
✔ Never commit .env or credentials
✔ Use least privilege policies
✔ Block public access unless needed
✔ Use CloudFront instead of public buckets