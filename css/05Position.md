position decides how an element is placed in the page and which reference point it uses when you move it using:

top
right
bottom
left
z-index

By default, every element is static (normal document flow).

1️⃣ position: static (default)

This is the normal flow
top / left / right / bottom do NOT work
You rarely write this explicitly

.box {
  position: static;
}

2️⃣ position: relative

Element stays in normal flow
You can move it relative to itself
Space it originally occupied is preserved

.box {
  position: relative;
  top: 20px;
  left: 30px;
}

3️⃣ position: absolute

Removed from normal document flow
Positioned relative to nearest positioned parent
If no parent has position, it uses <body>

.child {
  position: absolute;
  top: 10px;
  right: 10px;
}

📌 Key rule:
Absolute element looks for the nearest parent that is NOT static

4️⃣ position: fixed

Removed from normal flow
Positioned relative to viewport
Does NOT move when scrolling


Position	Relative To	            In Flow?
static	    normal flow	               ✅
relative	itself	                   ✅
absolute	nearest positioned parent	❌
fixed	    viewport	              ❌
sticky	      scroll container        ✅