What are pure functions ?
A pure function is a function that:

1️⃣ Always returns the same output for the same input
2️⃣ Does NOT change anything outside itself

Lambda functions ?
array.slice , array.splice ?
array.slice(start, end)

👉 Creates a new array
👉 Does NOT change original array
👉 end is not included

Example
let arr = [1, 2, 3, 4, 5];

let result = arr.slice(1, 4);

console.log(result); // [2, 3, 4]
console.log(arr);    // [1, 2, 3, 4, 5]

array.splice(start, deleteCount, ...items)

👉 Changes original array
👉 Can remove, insert, or replace
👉 Returns removed elements

Remove elements
let arr = [1, 2, 3, 4, 5];

let removed = arr.splice(1, 2);

console.log(removed); // [2, 3]
console.log(arr);     // [1, 4, 5]


map() → when you want a new array

👉 Takes each element
👉 Applies logic
👉 Returns a new array


forEach() → when you want to do something

👉 Loops through elements
👉 Does not return anything
👉 Used for side effects

Higher order functions ?
Prototypes in js ?
factory functions vs constructor functions ?
how to set properties and methods in constructor function
typeof class
b) freeze  a property in javascriptf
c) Debounce and throtling

