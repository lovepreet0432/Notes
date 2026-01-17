1️⃣ What is aws s3api?

AWS CLI has two ways to work with S3:

🔹 aws s3

High-level

Simple commands

Human-friendly

Best for daily file operations

Example:

aws s3 cp file.txt s3://my-bucket/

🔹 aws s3api

Low-level (direct API calls)

Full control

Used for:

Policies

ACLs

Metadata

Automation scripts

Think of it like:

s3 = shortcut commands
s3api = raw power

2️⃣ Managing S3 Bucket Policy Using s3api
Why Bucket Policy Matters

Bucket policy controls:

Who can access bucket

What actions are allowed

Public vs private access

Without policy:

Bucket stays private

No public reads

No cross-account access

🔹 Create a Public Read Bucket Policy
policy.json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadAccess",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-bucket-name/*"
    }
  ]
}

Apply Policy Using s3api
aws s3api put-bucket-policy \
  --bucket my-bucket-name \
  --policy file://policy.json


Now all files are publicly readable ✅

🔹 Get Existing Bucket Policy
aws s3api get-bucket-policy --bucket my-bucket-name


Useful to:

Debug access issues

Verify policy

🔹 Delete Bucket Policy
aws s3api delete-bucket-policy --bucket my-bucket-name


Bucket becomes private again 🔒

🔹 Check Public Access Block Settings
aws s3api get-public-access-block --bucket my-bucket-name


If public access is blocked, policies won’t work.

3️⃣ Signed URL in S3 (Pre-Signed URL)
What is a Signed URL?

A pre-signed URL:

Temporarily grants access to a private S3 object

No need to:

Make bucket public

Share AWS credentials

Why Signed URLs Are Needed

Problems without signed URLs:

Private bucket → users can’t download/upload

Public bucket → security risk

Signed URL gives:

Controlled access

Time-limited permission

Secure sharing

🔹 Common Use Cases

Secure file downloads

Large file uploads

User-specific file access

Temporary access links

Example:

Download invoice

Upload profile image

🔹 Generate Pre-Signed URL (Download)
aws s3 presign s3://my-bucket-name/report.pdf --expires-in 300


Output:

https://my-bucket-name.s3.amazonaws.com/report.pdf?X-Amz-Algorithm=...


Valid for 5 minutes.

🔹 Generate Pre-Signed URL (Upload)

For upload, same command but user performs PUT request.

Example:

aws s3 presign s3://my-bucket-name/upload.png --expires-in 600


Frontend uses:

PUT <signed-url>

🔹 How Signed URL Works (Behind the Scenes)

AWS signs URL using your IAM credentials

URL contains:

Permissions

Expiry time

Signature

Anyone with the URL can access file

After expiry → URL stops working

🔹 Signed URL vs Public Bucket
Feature	Signed URL	Public Bucket
Security	High	Low
Time limit	Yes	No
Control	Fine-grained	None
Best for	User files	Static websites
🔑 One-Line Notes (Perfect for Revision)

aws s3api = low-level S3 control

Used for policies, ACLs, metadata

Bucket policy controls access

Signed URL = temporary access to private objects

Best for uploads & downloads

Avoid public buckets for user data