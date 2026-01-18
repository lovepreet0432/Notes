1️⃣ How policies are attached (VERY IMPORTANT)

Policies are never floating by themselves.
They are attached to something.

Where can policies be attached?
✔ Identity-based attachment

IAM User

IAM Group

IAM Role

Example:

User → Group → Policy


Best practice:

Attach policies to groups or roles, not individual users.

2️⃣ AWS Account ID vs Account Alias
AWS Account ID

12-digit unique number

Globally unique

Used internally by AWS

Example:

123456789012


Used in:

ARN

Cross-account access

Trust policies

AWS Account Alias

Human-friendly name

Maps to your account ID

Used only for login convenience

Example:

https://my-company.signin.aws.amazon.com/console


📌 Alias ≠ security feature
📌 Alias ≠ replacement for account ID

3️⃣ IAM User Groups
What is a group?

A group is a permission container for users.

Users → added to groups

Policies → attached to groups

Users inherit permissions

Example:

Developers group
  ├─ User A
  ├─ User B
  └─ Policy: S3ReadOnly


Why groups matter:
✔ Centralized permission management
✔ Easy onboarding/offboarding
✔ Cleaner IAM structure

📌 Groups cannot contain other groups.

4️⃣ Custom Policies
What are custom policies?

Policies you write yourself instead of using AWS managed ones.

Used when:

AWS policies are too broad

You want least privilege

You need resource-level control

Example: Custom S3 upload-only policy
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:AbortMultipartUpload"
      ],
      "Resource": "arn:aws:s3:::my-bucket/uploads/*"
    }
  ]
}


✔ Only upload
✔ Only specific folder
✔ No delete or read

5️⃣ Types of IAM Policies (EXAM + INTERVIEW)
1️⃣ AWS Managed Policies

Created by AWS

Easy to use

Broad permissions

Example:

AmazonS3FullAccess


⚠️ Not least-privilege

2️⃣ Customer Managed Policies

Created by you

Reusable

Version controlled

✔ Best for production

3️⃣ Inline Policies

Attached to one identity only

Cannot be reused

Deleted when identity is deleted

⚠️ Avoid unless absolutely needed

6️⃣ S3 Bucket Policy vs “Normal” IAM Policy

This is a big confusion point, so read carefully 👇

IAM Policy (Identity-based)

Attached to:

User

Group

Role

Answers:

What this identity can do

Example:

User can upload to S3

S3 Bucket Policy (Resource-based)

Attached to:

Bucket itself

Answers:

Who can access this bucket

Example:

Allow CloudFront to read
Allow another AWS account
Allow public read (if enabled)

Side-by-side Comparison
Feature	IAM Policy	S3 Bucket Policy
Attached to	User / Group / Role	S3 Bucket
Scope	Identity	Resource
Cross-account access	❌	✅
Public access	❌	✅
Service access (CF, Lambda)	❌	✅
Important Rule (AWS Evaluation Logic)

For access to work:

IAM policy ALLOW
AND
Bucket policy ALLOW


If either denies, access fails.

7️⃣ IAM Roles (MOST IMPORTANT FOR PRODUCTION)
What is an IAM Role?

A role is a temporary set of permissions that can be assumed.

No password
No access keys
Short-lived credentials

Who uses roles?

✔ EC2
✔ Lambda
✔ ECS
✔ EKS
✔ Cross-account users