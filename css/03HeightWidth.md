1️⃣ width & height (Common Issues)
Basic usage
.box {
  width: 300px;
  height: 150px;
}

🔴 Common width / height Problems
❓ “Why height is not working?”

Because height works only when parent has a defined height

.parent {
  height: 300px;
}

.child {
  height: 100%;
}


✔ Works
But this 👇 won’t:

.parent {
  /* no height */
}

.child {
  height: 100%;
}


📌 % height depends on parent height

❓ “Why width overflows screen?”
.box {
  width: 100vw;
  padding: 20px;
}


👉 Causes horizontal scroll
Because:

100vw = full viewport + scrollbar


✔ Fix:

.box {
  width: 100%;
  box-sizing: border-box;
}

❓ Fixed width breaks responsive layout
width: 1200px; ❌


✔ Better:

max-width: 1200px;
width: 100%;

2️⃣ max-width, min-width, max-height, min-height
Why we need them?

To control resizing without breaking layout

max-width

Element never grows beyond this

.container {
  max-width: 1200px;
  width: 100%;
}


📌 Used in almost every website layout

min-width

Element never shrinks below this

.card {
  min-width: 250px;
}


📌 Useful in cards, tables, buttons

min-height

Ensures minimum height

.section {
  min-height: 100vh;
}


📌 Used for full-screen sections

max-height

Limits growth

.list {
  max-height: 300px;
  overflow: auto;
}


📌 Dropdowns, modals

3️⃣ overflow (VERY IMPORTANT)

Controls what happens when content exceeds container

Values of overflow
Value	Meaning
visible	Default (content spills out)
hidden	Extra content hidden
scroll	Always show scrollbar
auto	Show scrollbar only if needed
Example
.box {
  width: 200px;
  height: 100px;
  overflow: auto;
}

Separate axis
overflow-x: hidden;
overflow-y: auto;


📌 Used to prevent horizontal scroll

🔥 Real Issue: Clearfix / float bug

Sometimes:

overflow: hidden;


is used to fix height collapse (legacy layouts)

4️⃣ Text Overflow & Word Breaking
Problem:

Long words / URLs break layout

<div class="box">
  superlongwordwithoutspaces123456789
</div>

1️⃣ word-break

Controls how words break

.box {
  word-break: break-all;
}

Value	Behavior
normal	Default
break-all	Break anywhere
keep-all	No breaking (Asian languages)

📌 break-all can look ugly

2️⃣ overflow-wrap (Recommended ✅)

Break long words only if needed

.box {
  overflow-wrap: break-word;
}


✔ Best for URLs, emails

3️⃣ white-space

Controls wrapping behavior

white-space: nowrap;

Value	Effect
nowrap	Single line
normal	Default
pre	Preserve spaces
pre-wrap	Wrap + preserve
4️⃣ Text Ellipsis (🔥 VERY COMMON)
.box {
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


👉 Shows ...

5️⃣ Real-World CSS Fix Patterns (SAVE THIS)
✅ Responsive container
.container {
  width: 100%;
  max-width: 1200px;
  margin: auto;
}

✅ Scrollable list
.list {
  max-height: 300px;
  overflow-y: auto;
}

✅ Prevent text breaking layout
.text {
  overflow-wrap: break-word;
}

✅ Prevent horizontal scroll
body {
  overflow-x: hidden;
}

6️⃣ One-Line Notes Summary ✍️

% height needs parent height

Prefer max-width over fixed width

overflow: auto is safest

Use overflow-wrap: break-word

100vw + padding = scrollbar issue

Ellipsis needs 3 properties