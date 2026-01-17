📘 Git Basics – Simple Notes
1️⃣ Git Repository

What is a Git repository?
A Git repository is a folder that Git is tracking.

It contains:

Your project files

Hidden .git folder (this is Git’s brain 🧠)

📌 Without .git, Git knows nothing about your project.

2️⃣ Initialize Repository

What does it mean?
Initializing a repository means telling Git to start tracking this folder.

Command:

git init


What happens internally?

.git folder is created

Git is now active in this project

📌 You run this only once per project.

3️⃣ Untrack Files

What does untrack mean?
Untracked files are files that:

Exist in the folder

But Git is NOT tracking them yet

To untrack a file (stop tracking):

git rm --cached filename


To prevent tracking in future:

.gitignore


Example:

node_modules/
.env


📌 .gitignore works only for untracked files.

4️⃣ Staging Area

What is Staging Area?
Staging area is a temporary place where you select files for the next commit.

Think of it like:

“These are the exact changes I want to save”

Flow:

Working Directory → Staging Area → Commit


Command:

git add file.js
git add .


📌 Staging gives control over what goes into a commit.

5️⃣ Git Commit

What is a commit?
A commit is a snapshot of your code at a point in time.

It saves:

File changes

Author name & email

Commit message

Previous commit reference

Command:

git commit -m "Add login feature"


📌 Commit message should explain WHY, not just WHAT.

6️⃣ Git Config (Email and Name)

Why needed?
Git needs to know who made the commit.

Set globally (recommended):

git config --global user.name "Lovepreet"
git config --global user.email "lovepreet@gmail.com"


Check config:

git config --list


📌 This info appears in every commit you make.

7️⃣ Git Log

What is git log?
Shows commit history of the current branch.

Command:

git log


It shows:

Commit hash

Author

Date

Commit message

📌 Press q to exit log view.

8️⃣ git log --all --oneline --graph

What does this command do?
Shows all commits of all branches in a visual format.

Command:

git log --all --oneline --graph


Meaning:

--all → all branches

--oneline → one commit per line

--graph → shows branch structure

📌 Very useful to understand branching & merging.

9️⃣ Git Checkout – Go to Previous Commit

What does checkout do?
Checkout lets you move to a different commit or branch.

Go to old commit:

git checkout <commit-hash>


Example:

git checkout a1b2c3


📌 This puts you in Detached HEAD state
(you’re viewing old code, not on a branch).

🔟 git checkout master – Go to Latest Code

What does this mean?
Switch back to the main branch (latest code).

Command:

git checkout master


or

git checkout main


📌 Your code is restored to the latest version.

🔁 Simple Git Flow (One Line)
Edit files → git add → git commit → git log → checkout if needed
<!-- 
restore deleted file
git checkout <commitId> script.js
git switch
git switch -C about -->