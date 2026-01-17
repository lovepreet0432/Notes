1️⃣ JavaScript Data Types (Quick Refresh)
Primitive string number boolean null undefined symbol bigint

Non-Primitive (Reference)
object
array
function

👉 Key interview line:
Primitives are stored by value, objects are stored by reference.

2️⃣ Tricky Questions on Data Types
❓ Q1
typeof null

✅ Output:
"object"

🧠 Why?
This is a JavaScript bug from day one. null is primitive, but typeof says object.

❓ Q2
typeof NaN

✅ Output:
"number"

🧠 NaN = Not a Number, but still of type number.

❓ Q3
let a;
console.log(a);
console.log(typeof a);

✅ Output:
undefined
"undefined"
🧠 Variable declared but not assigned.

❓ Q4
typeof function() {}

✅ Output:
"function"


🧠 Functions are objects internally, but JS gives them a special type.

❓ Q5
typeof []

✅ Output:
"object"

🧠 Arrays are objects.
👉 Correct check:
Array.isArray([])

3️⃣ Type Coercion (🔥 Interview Favorite)

Type coercion = JS automatically converts types.

👉 Two types:
Implicit (JS does it)
Explicit (you do it)

4️⃣ Tricky Type Coercion Questions
❓ Q6
"5" + 2
✅ Output:

"52"


🧠 + prefers string concatenation.

❓ Q7
"5" - 2

✅ Output:
3

🧠 - only works with numbers → string converted to number.

❓ Q8
true + false
✅ Output:1

🧠
true → 1
false → 0

❓ Q9
null + 1
✅ Output:1


🧠 null → 0

❓ Q10
undefined + 1

✅ Output:
NaN


🧠 undefined → cannot convert to number.

❓ Q11 (Very Popular)
[] + []

✅ Output:
""


🧠

[] → ""

"" + "" → ""

❓ Q12
[] + {}


✅ Output:
"[object Object]"

🧠

[] → ""
{} → "[object Object]"

❓ Q13 (🔥 Tricky)
{} + []


✅ Output (in browser):
0


🧠 {} treated as empty block, +[] → 0

❓ Q14 (Classic)
console.log({} + []);


✅ Output:

"[object Object]"


🧠 Here {} is an object, not a block.

5️⃣ Equality Coercion (== vs ===)
❓ Q15
0 == false
✅ true

0 === false
❌ false

🧠 == does type conversion, === doesn’t.

❓ Q16
null == undefined
✅ true

null === undefined
❌ false

❓ Q17
[] == false
✅ true

🧠
[] → "" → 0
false → 0