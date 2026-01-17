🔹 PART 1: Core Git & GitHub Questions (Warm-up)
1️⃣ What is Git? How is it different from GitHub?

Answer:

Git is a distributed version control system that tracks code changes locally.

GitHub is a remote hosting platform for Git repositories with collaboration features.

Key Difference:
Git = tool
GitHub = service built on Git

2️⃣ What happens internally when you run git commit?

Answer:

Git takes a snapshot of files from staging area

Creates a commit object

Stores:

Tree object (directory structure)

Parent commit hash

Author info

Commit message

HEAD moves to new commit

📌 Important: Git does NOT store diffs — it stores snapshots.

3️⃣ Difference between git clone and git fork?

Answer:

Clone: Copies a repository locally

Fork: Creates a copy under your GitHub account

Fork is GitHub-level, clone is Git-level.

🔹 PART 2: Branching & Merging (Very Important)
4️⃣ What is HEAD in Git?

Answer:
HEAD is a pointer to the current branch or commit you’re on.

Detached HEAD means:

git checkout <commit-hash>

5️⃣ Difference between merge and rebase?
Merge	Rebase
Creates merge commit	Rewrites history
Safe for shared branches	Dangerous on shared branches
Preserves history	Linear history

📌 Rule:
👉 Rebase your local feature branch, never rebase main or develop.

6️⃣ What is a fast-forward merge?

Answer:
When the target branch has no new commits, Git just moves the pointer forward.

git merge feature-branch


No merge commit created.

🔹 PART 3: Staging, Reset, Revert (Tricky Area)
7️⃣ Difference between git reset --soft, --mixed, --hard?
Command	Commit	Staging	Working Dir
--soft	❌ removed	✅ kept	✅ kept
--mixed (default)	❌ removed	❌ removed	✅ kept
--hard	❌ removed	❌ removed	❌ removed

🔥 Interview Tip:
git reset --hard is destructive.

8️⃣ Difference between git reset and git revert?

Answer:

reset: Moves branch pointer (rewrites history)

revert: Creates a new commit to undo changes

📌 Use revert in production branches.

9️⃣ If you committed wrong code to main, what will you do?

Answer:

git revert <commit-hash>


Never reset public branches.

🔹 PART 4: GitHub & Collaboration
🔟 What is a Pull Request?

Answer:
A request to merge code from one branch to another with:

Code review

CI checks

Comments

1️⃣1️⃣ What is .gitignore and when is it not respected?

Answer:
.gitignore does NOT work for files already tracked.

Fix:

git rm --cached file.js

1️⃣2️⃣ What are protected branches?

Answer:
Branches with rules:

No direct push

PR required

Mandatory reviews

Status checks

Common for main and release.

🔹 PART 5: 🔥 TRICKY INTERVIEW QUESTIONS (4+ yrs level)
1️⃣3️⃣ Can Git track empty folders?

Answer: ❌ No
Solution: add a placeholder file like .gitkeep

1️⃣4️⃣ What is git stash actually doing?

Answer:
It:

Saves changes in a stack

Cleans working directory

Can apply later

Commands:

git stash
git stash pop
git stash apply


📌 pop removes stash, apply keeps it.

1️⃣5️⃣ How do you undo a commit but keep changes?

Answer:

git reset --soft HEAD~1

1️⃣6️⃣ Why is rebasing dangerous on shared branches?

Answer:
Rebase changes commit hashes, causing conflicts for others pulling same branch.

1️⃣7️⃣ Difference between origin/main and main?

Answer:

main → local branch

origin/main → remote tracking branch

1️⃣8️⃣ What is git cherry-pick?

Answer:
Apply a specific commit from another branch.

git cherry-pick <commit-hash>


Used in hotfixes.

🔹 PART 6: Real-World Scenario Questions (Asked a LOT)
1️⃣9️⃣ Your PR has conflicts. What do you do?

Answer:

git fetch origin
git rebase origin/main
# resolve conflicts
git push --force-with-lease

2️⃣0️⃣ Someone force-pushed and broke history. How to recover?

Answer:

git reflog
git reset --hard <old-hash>


🔥 reflog saves your life.

2️⃣1️⃣ How do you squash commits before merging?

Answer:

git rebase -i HEAD~3


Change pick → squash

2️⃣2️⃣ What happens if two developers edit same line?

Answer:
Git raises a merge conflict and asks manual resolution.

🔹 BONUS: One-Line Rapid Fire (Interview Favorite)

Git is content-addressable

Commits are immutable

Branch = pointer

Rebase = rewrite history

Merge = preserve history

Reflog = local safety net