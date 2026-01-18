
What is IAM?

IAM = Identity and Access Management

In simple words:

IAM decides WHO can access WHAT in AWS and HOW

Without IAM:

Anyone could access anything ❌

AWS would be insecure ❌

With IAM:

Controlled access

Secure systems

Least-privilege principle ✅

The 3 Core Questions IAM Answers

1️⃣ Who are you?
2️⃣ What are you allowed to do?
3️⃣ On which AWS resources?

Core IAM Components
1️⃣ IAM User

Represents a person or application

Example:

You (developer)

Backend service

CI/CD pipeline

User gets:

Username & password (console)

Access key & secret key (API/CLI)

📌 Best practice:
Avoid using users directly in production apps.

2️⃣ IAM Group

A collection of users with same permissions

Example:

Developers

Admins

ReadOnly

Attach policy once → all users inherit permissions.

3️⃣ IAM Policy (MOST IMPORTANT)

A policy is a JSON document that defines permissions.

It answers:

Allowed or denied?

Which actions?

On which resources?

Example:

{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::my-bucket/*"
    }
  ]
}


Meaning:
✔ Allow uploading files
✔ Only in my-bucket

4️⃣ IAM Role

This is where people get confused.

A role is:

A set of permissions that can be temporarily assumed

No username
No password
No permanent keys

Used by:

EC2

Lambda

ECS

Cross-account access

📌 Example:

Lambda needs to access S3

Attach IAM Role to Lambda

Lambda assumes role automatically

🔥 This is best practice

IAM Policy Structure (Quick Breakdown)
Field	Meaning
Effect	Allow / Deny
Action	What can be done
Resource	On which resource
Condition	Optional constraints
IAM + S3 Example (Real world)
Scenario:

You want:

Public read access ❌

Only backend uploads ✅

Solution:

Backend runs on EC2/Lambda

Attach IAM Role

Role has s3:PutObject

Bucket stays private

No access keys in code 🔐

Types of Policies
1️⃣ Identity-based

Attached to:

User

Group

Role

Example:

User can read S3

2️⃣ Resource-based

Attached to:

S3 bucket

SQS queue

SNS topic

Example:

Bucket policy allowing CloudFront

IAM Security Best Practices

✔ Never use root account
✔ Enable MFA
✔ Use roles instead of access keys
✔ Follow least privilege
✔ Rotate keys
✔ Separate dev / prod

IAM in One Line (Perfect for notes)

IAM controls access to AWS resources using users, roles, and policies

