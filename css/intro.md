// Practics in Free code camp

1️⃣ What is CSS?

CSS (Cascading Style Sheets) is used to style HTML
→ colors, layout, spacing, fonts, animations, responsiveness.

HTML = structure
CSS = looks
JS = behavior

2️⃣ Ways to Implement CSS (VERY IMPORTANT)

There are 3 main ways to apply CSS.

1️⃣ Inline CSS

CSS written directly inside HTML tags.

<p style="color: red; font-size: 18px;">Hello World</p>


✅ Quick for testing
❌ Not reusable
❌ Hard to maintain
❌ Not recommended for real projects

📌 Use only for debugging

2️⃣ Internal CSS

CSS written inside a <style> tag in <head>.

<head>
  <style>
    p {
      color: blue;
      font-size: 18px;
    }
  </style>
</head>


✅ Better than inline
❌ Works only for that page
❌ Not scalable

📌 Used in small demos or single-page HTML

3️⃣ External CSS (BEST & MOST USED)

CSS written in a separate .css file.

<link rel="stylesheet" href="style.css">

p {
  color: green;
  font-size: 18px;
}


✅ Reusable
✅ Clean code
✅ Best performance
✅ Industry standard

📌 Always use external CSS in real projects

3️⃣ CSS Selectors (CORE CONCEPT)

Selectors tell CSS which HTML elements to style.

1️⃣ Universal Selector

Selects everything

* {
  margin: 0;
  padding: 0;
}


📌 Used for reset styles

2️⃣ Element / Tag Selector

Selects all tags of one type

p {
  color: red;
}

div {
  background: yellow;
}


📌 Applies to all matching elements

3️⃣ Class Selector (MOST USED 🔥)

Reusable styles

<p class="text">Hello</p>
<p class="text">World</p>

.text {
  color: blue;
  font-size: 20px;
}


📌 One class → many elements
📌 Use dot .

4️⃣ ID Selector

Used for unique elements

<div id="header"></div>

#header {
  background: black;
}


📌 Use #
📌 One ID per page
📌 Avoid overusing (bad for scaling)

5️⃣ Group Selector

Apply same style to multiple selectors

h1, h2, p {
  color: purple;
}

6️⃣ Descendant Selector

Selects elements inside another element

div p {
  color: red;
}

<div>
  <p>Selected</p>
</div>

<p>Not selected</p>


📌 Very common in layouts

7️⃣ Child Selector (>)

Selects direct children only

div > p {
  color: blue;
}


📌 Does NOT select nested elements

8️⃣ Attribute Selector

Select elements based on attributes

input[type="text"] {
  border: 1px solid red;
}


📌 Useful for forms

4️⃣ Pseudo-Classes (Pseudo Selectors)

Used to style special states of elements.

1️⃣ :hover

When mouse is over element

button:hover {
  background: green;
}


📌 Used everywhere

2️⃣ :active

When element is being clicked

button:active {
  background: red;
}

3️⃣ :focus

When input is selected

input:focus {
  border-color: blue;
}


📌 Very important for forms & accessibility

4️⃣ :first-child

Select first child

li:first-child {
  color: red;
}

5️⃣ :last-child

Select last child

li:last-child {
  color: blue;
}

6️⃣ :nth-child(n)

Select specific position

li:nth-child(2) {
  color: green;
}

li:nth-child(odd) {
  background: #eee;
}


📌 Common interview question

7️⃣ :not()

Exclude elements

button:not(.primary) {
  background: gray;
}

5️⃣ Pseudo-Elements (NOT STATES, PARTS)

Style parts of an element

1️⃣ ::before

Adds content before element

p::before {
  content: "👉 ";
}

2️⃣ ::after

Adds content after element

p::after {
  content: " ✔";
}

3️⃣ ::first-letter

Style first letter

p::first-letter {
  font-size: 30px;
}

4️⃣ ::first-line

Style first line

p::first-line {
  color: red;
}