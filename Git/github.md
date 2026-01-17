📘 GitHub & Collaboration – Simple Notes
1️⃣ GitHub

What is GitHub?
GitHub is a cloud platform where Git repositories are stored so that:

Code is backed up

Multiple developers can work together

Code can be reviewed and merged

📌 Git = local
📌 GitHub = remote (online)

2️⃣ Show Remote Origin

What is remote?
A remote is a link between your local repo and GitHub repo.

Check remote URL:
git remote -v

Show only origin:
git remote show origin


Origin usually means:

The main GitHub repository

📌 origin is just a name, not a keyword.

3️⃣ Git Graph Extension

What is Git Graph?
Git Graph is a VS Code extension that shows:

Branches

Commits

Merges

Tags

How to open:
Right click → View Git Graph
OR
Ctrl + Shift + P → Git Graph: View Git Graph


📌 Helps understand branching visually (similar to GitLens graph).

4️⃣ Collaboration (How Multiple Developers Work)
Simple Team Workflow:

1️⃣ One GitHub repository
2️⃣ Each developer creates a branch
3️⃣ Work independently
4️⃣ Push branch to GitHub
5️⃣ Create Pull Request
6️⃣ Review + merge

📌 No one directly pushes to main.

5️⃣ Git Fetch

What is git fetch?
Fetch downloads latest changes from GitHub but:

Does NOT change your code

Does NOT merge anything

Command:

git fetch origin


📌 Safe command — only updates remote tracking branches.

6️⃣ Git Pull

What is git pull?
Pull = Fetch + Merge

Command:

git pull origin main


It:

Fetches changes

Merges them into current branch

📌 This can change your local code.

7️⃣ Fetch vs Pull (Very Important)
Fetch	Pull
Downloads changes	Downloads + merges
Safe	Can cause conflicts
No code change	Code changes
Used to review	Used to update

📌 Best practice:
👉 git fetch first, then decide to merge.

🔁 Simple Visualization
GitHub Repo
   ↓ fetch
Local Repo (no change)
   ↓ merge / pull
Local Code Updated

🧠 One-Line Memory Notes

GitHub = remote storage

Origin = default remote

Fetch = check updates

Pull = apply updates

Git Graph = visualize Git