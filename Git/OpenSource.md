📘 Open Source & Contribution – Simple Notes
1️⃣ What Is Open Source?

Open source means:

The source code is public

Anyone can view, use, modify, and contribute

Examples:

React

Node.js

Linux

VS Code

📌 Open source projects are usually hosted on GitHub.

2️⃣ Why Open Source Exists?

Open source helps:

Improve software faster

Learn from real-world code

Build community

Share knowledge

📌 Companies also use open source heavily.

3️⃣ Why Should You Contribute?

For developers:

Learn real production code

Improve Git & collaboration skills

Build GitHub profile

Impress interviewers

📌 Even small contributions matter (docs, fixes).

4️⃣ How to Contribute to Open Source (Step-by-Step)
🔹 Step 1: Find a Project

Go to GitHub

Search repos

Look for good first issue

🔹 Step 2: Fork the Repository
Git Fork

What is fork?
Fork creates a copy of someone else’s repository into your GitHub account.

📌 You cannot push directly to original repo → fork first.

🔹 Step 3: Clone Your Fork
git clone https://github.com/your-username/project-name.git

🔹 Step 4: Create a Branch
git checkout -b fix-typo

🔹 Step 5: Make Changes & Commit
git add .
git commit -m "Fix typo in README"

🔹 Step 6: Push to Your Fork
git push origin fix-typo

🔹 Step 7: Create Pull Request

Go to GitHub

Click Create Pull Request

Submit PR to original repo

🎉 Contribution done!

5️⃣ Git Fork vs Git Clone
Fork	Clone
GitHub-level	Git-level
Creates repo copy online	Copies repo locally
Used for open source	Used everywhere
6️⃣ git remote -v
❓ What does this command do?

Shows remote repositories linked to your local repo.

git remote -v

Example output:
origin  https://github.com/your-username/project.git (fetch)
origin  https://github.com/your-username/project.git (push)


📌 origin points to your fork.

7️⃣ (Important) Add Upstream Remote

To keep your fork updated with original repo:

git remote add upstream https://github.com/original-owner/project.git


Check:

git remote -v


Now you have:

origin → your fork

upstream → original repo

🔁 Sync Fork With Original Repo
git fetch upstream
git checkout main
git merge upstream/main


📌 Keeps your fork up to date.

🧠 One-Line Memory Notes

Open source = public code

Fork = copy repo to your account

Clone = copy to local

Origin = your repo

Upstream = original repo

PR = contribution request