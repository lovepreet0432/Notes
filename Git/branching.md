📘 GitLens & Branching – Simple Notes
1️⃣ Understanding GitLens Extension

What is GitLens?
GitLens is a VS Code extension that makes Git visual and easy to understand.

It helps you:

See who changed which line

View commit history inside files

See branch & commit graph

Understand blame, history, and changes

📌 GitLens does NOT replace Git commands — it shows Git data visually.

2️⃣ Ctrl + Shift + P → Graph (Branching View)

What does this do?
Opens the Git commit graph inside VS Code.

Steps:

Ctrl + Shift + P
→ Type: GitLens: Show Graph


What you see:

Branch lines
Commits history
Merges

Current branch highlighted

📌 This is the best way to understand branching visually.

3️⃣ Git Branching (Why We Need It)
❓ Why branching exists?

Branching allows:
Multiple developers to work without breaking main code
Safe feature development
Bug fixes without stopping main work

💡 Simple Example:
main → stable code
feature-login → new feature
bugfix-payment → fix issue


📌 Branch = separate line of development

4️⃣ Create a Branch

Command:

git branch feature-login


This:

Creates a new branch
Does NOT switch to it

📌 Branch is just a pointer to a commit.

5️⃣ Change (Switch) Branch

Command:

git checkout feature-login


OR (new way):

git switch feature-login


📌 Your working code changes to match that branch.

🔥 Create + Switch in One Command
git checkout -b feature-login


OR

git switch -c feature-login

6️⃣ Delete Branch
🧹 Delete local branch
git branch -d feature-login

❌ Force delete (not merged)
git branch -D feature-login


📌 Git prevents deleting unmerged branches unless forced.

7️⃣ Merge Branch

What is merge?
Merging means combining changes from one branch into another.

Steps to Merge:

1️⃣ Switch to target branch (usually main)

git checkout main


2️⃣ Merge feature branch

git merge feature-login


📌 Feature branch changes are now in main.

8️⃣ Types of Merge (Important for Understanding Graph)
🔹 Fast-Forward Merge

No new commits in main

Branch pointer just moves forward

🔹 Merge Commit

Both branches have changes

Git creates a merge commit

📌 GitLens graph clearly shows this difference.

9️⃣ Merge Conflict (Simple Explanation)

When does conflict happen?

Two branches modify same line of code

Git stops and asks:

“Which version should I keep ?”

After fixing:

git add .
git commit

🔁 Visual Git Flow (Easy Memory)
main
 └── feature-login
       ↓ work & commits
 ← merge back

🧠 Quick Notes for Interviews

Branch = pointer, not copy

GitLens helps visualize Git

Always merge INTO main

Create branch before coding

Delete branch after merge