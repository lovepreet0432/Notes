1️⃣ Cascade (The “C” in CSS)
What is Cascade?

Cascade = how CSS decides which style to apply when multiple rules target the same element

Think of it like:

“If many people give instructions, whose instruction should I follow?”

Cascade follows 3 rules (in this order):
1️⃣ Importance
p {
  color: red !important;
}


!important wins over everything

Even overrides inline styles

❌ Bad practice
📌 Use only in rare cases (legacy code)

2️⃣ Specificity

More specific selector wins

p { color: blue; }
.text { color: red; }
#title { color: green; }

<p id="title" class="text">Hello</p>


👉 Final color = green (ID wins)

3️⃣ Source Order (Last one wins)

If specificity is same → last written rule applies

p { color: red; }
p { color: blue; }


👉 Color = blue

📌 Cascade rule summary

!important > Specificity > Source Order

2️⃣ Specificity (MOST IMPORTANT 🔥)
What is Specificity?

Specificity decides which CSS selector is stronger

Each selector has a score

Specificity Order (Weak → Strong)
Selector Type	Score
Element (p)	1
Class (.box)	10
Attribute ([type])	10
Pseudo-class (:hover)	10
ID (#main)	100
Inline style	1000
!important	💀 GOD MODE
Examples
Example 1
p { color: red; }          /* 1 */
.box { color: blue; }     /* 10 */

<p class="box">Text</p>


👉 Color = blue

Example 2
div p { color: red; }      /* 2 */
.box p { color: green; }  /* 11 */

<div class="box">
  <p>Hello</p>
</div>


👉 Color = green

Example 3 (Multiple selectors add up)
#app .box p { color: red; }


Specificity:

#app → 100

.box → 10

p → 1
➡️ Total = 111

Important Rule ❗
* { }   /* 0 specificity */


Universal selector has ZERO power

📌 Specificity cheat rule

Inline > ID > Class > Element

3️⃣ Inheritance (Automatic Style Passing)
What is Inheritance?

Some CSS properties automatically pass from parent to child

<div class="parent">
  <p>Child text</p>
</div>

.parent {
  color: red;
}


👉 <p> becomes red

Properties that ARE inherited

✔ color
✔ font-family
✔ font-size
✔ font-weight
✔ line-height
✔ visibility

Properties that are NOT inherited

❌ margin
❌ padding
❌ border
❌ background
❌ width / height

Force Inheritance
p {
  color: inherit;
}

Stop Inheritance
p {
  color: initial;
}

4️⃣ How Cascade + Specificity + Inheritance Work Together
Example
div {
  color: red;
}

p {
  color: blue;
}

<div>
  <p>Hello</p>
</div>


👉 Result = blue

Why?

p has its own rule

Direct rule beats inherited rule

Another Example
div {
  color: red;
}

<div>
  <p>Hello</p>
</div>


👉 Result = red (inherited)

5️⃣ Real-World Interview Traps ⚠️
❓ Why class overrides element selector?

➡️ Higher specificity

❓ Why CSS works sometimes and sometimes not?

➡️ Cascade + specificity conflict

❓ Why avoid ID selectors?

➡️ Too strong → hard to override → bad scalability

❓ Why avoid !important?

➡️ Breaks cascade → debugging nightmare