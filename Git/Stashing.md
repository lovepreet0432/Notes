1️⃣ Resolve Conflict in Git
❓ When does conflict happen?

When:

Two branches change same file

On same line

Git cannot decide → human must decide.

🔹 What conflict looks like
<<<<<<< HEAD
your code
=======
incoming code
>>>>>>> feature-branch

🔹 Steps to resolve conflict

1️⃣ Open conflicted file
2️⃣ Choose correct code
3️⃣ Remove conflict markers
4️⃣ Save file

git add .
git commit


📌 If during rebase / revert:

git rebase --continue
git revert --continue

2️⃣ Git Stashing
❓ What is stash?

Stash temporarily saves your uncommitted changes and cleans working directory.

📌 Used when:

“I need to switch branch but my work is incomplete”

🔹 Create a stash with message
git stash -m "working on login UI"


✔ Saves changes
✔ Working directory becomes clean

🔹 List all stashes
git stash list


Example:

stash@{0}: working on login UI
stash@{1}: bug fix

🔹 Apply a stash
git stash apply stash@{1}


✔ Restores changes
✔ Stash remains in list

📌 Use pop to apply + delete.

3️⃣ Cherry Picking
❓ What is cherry-pick?

Apply one specific commit from another branch.

🔹 Command
git cherry-pick <commit-id>

🔹 Use case

Urgent bug fix from feature branch

Hotfix needed in main

📌 Only selected commit is applied, not whole branch.

4️⃣ Git Ignore
❓ What is .gitignore?

Tells Git which files/folders to ignore.

Example:

node_modules/
.env
dist/

🔹 Already tracked file?

.gitignore will NOT work.

🔹 Stop tracking a file
git rm --cached style.css


✔ File removed from Git
✔ File remains locally

Then add it to .gitignore.

5️⃣ Pull Request (PR)
❓ What is Pull Request?

A request to:

“Please review my code and merge it”

PR is created on GitHub, not Git.

🔹 PR Workflow

1️⃣ Create feature branch
2️⃣ Push branch to GitHub
3️⃣ Open Pull Request
4️⃣ Review code
5️⃣ Merge into main

📌 No direct push to main.

6️⃣ Protect the Main Branch
❓ Why protect main?

To:

Prevent accidental pushes

Enforce code review

Run CI checks

🔹 Common rules

✔ PR required
✔ At least 1 approval
✔ No force push
✔ No direct commits

📌 Industry standard practice.

7️⃣ Create Pull Request (Step-by-Step)
1️⃣ Push branch
git push origin feature-login

2️⃣ Go to GitHub

Click Compare & Pull Request

Add title & description

Create PR

3️⃣ Review → Merge

Fix comments if needed

Merge PR

Delete branch

🧠 One-Line Memory Notes

Conflict → same line edited

Stash → temporary save

Cherry-pick → one commit

.gitignore → ignore files

PR → review + merge

Protect main → safety

🔁 Simple Git Daily Flow (Real Life)
Create branch → Code → Commit → Push → PR → Review → Merge