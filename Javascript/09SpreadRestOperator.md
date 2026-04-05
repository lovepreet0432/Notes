1️⃣ Spread Operator (...)

Meaning:

“Take something and spread it out into individual elements”

Used when expanding values.

🔹 Spread with Arrays
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];

console.log(arr2);
// [1, 2, 3, 4, 5]


Without spread:

[arr1, 4, 5] // ❌ [[1,2,3], 4, 5]

🔹 Copy array (important!)
const original = [10, 20];
const copy = [...original];

copy.push(30);

console.log(original); // [10, 20]
console.log(copy);     // [10, 20, 30]


No reference sharing ✔️

🔹 Merge arrays
const a = [1, 2];
const b = [3, 4];

const merged = [...a, ...b];

🔹 Spread with Objects
const user = { name: "Lovepreet", role: "Dev" };

const updatedUser = {
  ...user,
  role: "Senior Dev"
};

console.log(updatedUser);


✔ Shallow copy
✔ Later keys overwrite earlier ones

🔹 Spread in function calls
function add(a, b, c) {
  return a + b + c;
}

const nums = [1, 2, 3];

add(...nums); // 6

🔹 Spread in recursion (your flatten case 💡)
result.push(...flatten(arr[i]));


Meaning:

“Push each element of the returned array one by one”

2️⃣ Rest Operator (...)

Meaning:

“Collect remaining values into a single variable”

Used when gathering values.

🔹 Rest in function parameters
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

sum(1, 2, 3, 4); // 10


Here:

numbers → [1, 2, 3, 4]

🔹 Rest with named parameters
function test(a, b, ...rest) {
  console.log(a);    // 1
  console.log(b);    // 2
  console.log(rest); // [3, 4, 5]
}

test(1, 2, 3, 4, 5);


⚠️ Rest must be last parameter

🔹 Rest in destructuring (very important)
Arrays
const [first, ...remaining] = [10, 20, 30, 40];

console.log(first);      // 10
console.log(remaining); // [20, 30, 40]

Objects
const { password, ...safeUser } = {
  name: "Amit",
  email: "a@test.com",
  password: "secret"
};

console.log(safeUser);

3️⃣ Spread vs Rest (Same syntax, different meaning)
Situation	Meaning
fn(...arr)	Spread → expand
function fn(...args)	Rest → collect
[...arr]	Spread
const [...rest] = arr	Rest