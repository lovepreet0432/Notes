1️⃣ Make S3 Bucket / Route Public (Serve Static Files)
Problem ❌

By default:

S3 buckets are private

Public users cannot access files

But for:

Static websites

Images

JS/CSS

You need public read access.

✅ How S3 Public Access Works

Two things are required:

Disable Block Public Access

Add Bucket Policy (public read)

Step 1: Disable Block Public Access

In AWS Console:

Go to S3 → Bucket → Permissions

Block Public Access → Edit

Uncheck:

Block all public access

Save

This allows public policies.

Step 2: Add Bucket Policy (Public Read)

Bucket Policy example:

{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicRead",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-bucket-name/*"
    }
  ]
}


Now:

https://my-bucket-name.s3.amazonaws.com/image.png


is publicly accessible ✅

2️⃣ What is AWS CLI?

AWS CLI is:

A command-line tool to manage AWS services from terminal

Instead of clicking in console, you run commands.

Why needed:

Faster

Scriptable

Used in real projects & CI/CD

3️⃣ Install & Configure AWS CLI
Install

Windows: AWS CLI MSI installer

Mac/Linux: brew install awscli or package manager

Check:

aws --version

Configure AWS CLI
aws configure


It will ask:

AWS Access Key ID
AWS Secret Access Key
Default region (e.g. ap-south-1)
Output format (json)


These keys come from IAM user.

4️⃣ Create S3 Bucket (CLI)
Command:
aws s3 mb s3://my-bucket-name --region ap-south-1


Notes:

Bucket name must be globally unique

Region is important

Example:

aws s3 mb s3://lovepreet-static-site --region ap-south-1

5️⃣ Delete S3 Bucket
❗ Bucket must be empty first
Remove all files:
aws s3 rm s3://my-bucket-name --recursive

Delete bucket:
aws s3 rb s3://my-bucket-name


OR one command:

aws s3 rb s3://my-bucket-name --force

6️⃣ Upload File to S3
Upload single file
aws s3 cp index.html s3://my-bucket-name/index.html

Upload folder
aws s3 cp ./build s3://my-bucket-name/ --recursive


Used a lot for:

React build

Static sites

7️⃣ Download File from S3
Download single file
aws s3 cp s3://my-bucket-name/index.html index.html

Download entire bucket
aws s3 cp s3://my-bucket-name ./downloads --recursive

8️⃣ List Files in a Bucket
List all files
aws s3 ls s3://my-bucket-name

List folders with details
aws s3 ls s3://my-bucket-name --recursive


Example output:

2026-01-17 10:20:11   1024 index.html
2026-01-17 10:20:15   2048 app.js

9️⃣ Serve Static Website from S3 (Quick Concept)

Once files are uploaded:

Enable Static Website Hosting

Set:

Index document: index.html

Website URL:

http://my-bucket-name.s3-website-ap-south-1.amazonaws.com