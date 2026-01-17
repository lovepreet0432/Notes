📘 Reverting & Undoing Changes in Git (Simple Notes)
1️⃣ Revert Changes (on Local System)
Case 1: Discard unstaged changes
git checkout -- file.js


➡️ Restores file from last commit

Case 2: Remove staged changes (keep file changes)
git reset file.js


📌 These changes are local only (not pushed).

2️⃣ Git Reset (Mixed, Soft, Hard)
What is git reset?

Moves HEAD and branch pointer backward.

🔹 git reset --soft
git reset --soft HEAD~1


✔ Commit removed
✔ Changes kept staged
✔ Working directory unchanged

📌 Used when commit message is wrong.

🔹 git reset --mixed (default)
git reset HEAD~1


✔ Commit removed
❌ Staging cleared
✔ Code kept

📌 Used when you want to restage changes.

🔹 git reset --hard
git reset --hard HEAD~1


❌ Commit removed
❌ Staging removed
❌ Code removed

⚠️ Dangerous — data loss

3️⃣ Git Reflog

What is reflog?
A local history of all HEAD movements.

Even deleted commits are saved here.

git reflog


📌 Lifesaver when code is lost.

4️⃣ git reset --hard <id> (Restore Previous Code)

If you accidentally deleted code:

git reflog
git reset --hard <commit-id>


✔ Restores code exactly as it was.

5️⃣ Git Checkout HEAD
git checkout HEAD

Moves to current commit (no change)

📌 Rarely used.

git checkout HEAD~1

Moves to previous commit

git checkout HEAD~1


📌 Detached HEAD mode
Used only to view old code, not edit.

6️⃣ If Code Is Already Pushed (Safe Way)

⚠️ Never use reset on pushed commits.

🔹 git revert <commitId>
git revert a1b2c3


✔ Creates a new commit
✔ Safely undoes changes

📌 Best for production branches.

7️⃣ Revert Multiple Commits (Without Auto Commit)
git revert --no-commit HEAD~3..


✔ Reverts last 3 commits
✔ Changes staged
✔ One final commit

git commit -m "Revert last 3 commits"

8️⃣ Abort Revert (If Conflict Happens)
git revert --abort
➡️ Cancels revert operation.
9️⃣ Continue Revert (After Fixing Conflict)

After resolving conflicts:

git add .
git revert --continue

🔥 Difference: Reset vs Revert (Important)
Reset	Revert
Rewrites history	Preserves history
Local use	Shared branches
Dangerous	Safe
No new commit	Creates new commit
🔟 Resolve Conflict in Git (Step-by-Step)
When conflict occurs:

Git marks file like this:

<<<<<<< HEAD
your code
=======
incoming code
>>>>>>> branch-name

Steps to resolve:

1️⃣ Open file
2️⃣ Decide which code to keep
3️⃣ Remove conflict markers
4️⃣ Save file

git add .
git commit


📌 For rebase or revert:

git rebase --continue
git revert --continue

🧠 Simple Conflict Strategy

Same file + same line → conflict

Git stops

Human decides

🔁 One-Line Memory Flow
Local mistake → reset
Pushed mistake → revert
Lost code → reflog
Conflict → fix + add + continue