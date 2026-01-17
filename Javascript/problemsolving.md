// Reverse a String

function reverseString(str)
{
   let result='';
   let word='';
   for(i=0;i<str.length;i++)
   {
    if(str[i]!=' ')
    {
      word+=str[i];
    }else
    {
      result=" " + word + result;
      word='';
    }
   }
  result=word+result;
   console.log(result);
}

reverseString('I Love Coding');

//Reverse a String 
function reverseString(str)
{
  let result='';
  for(i=str.length-1;i>=0;i--)
  {
    result+=str[i];
  }
  console.log(result);
}
reverseString('I Love Coding');


// I Love Coding
// I evoL gnidoC

function reverse(str)
{
  let result = '';
  let word = '';
  
  for (let i = 0; i <= str.length; i++) {
   if (str[i] !== ' ') {
      word += str[i];
    }else
    {
      for (let j = word.length - 1; j >= 0; j--) {
        result += word[j];
      }
      if (i != str.length) result += ' ';
      word = '';
    }
  }
  console.log(result);
}

reverse('I Love Coding');



function isPalindrome(str) {
  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}

console.log(isPalindrome("madam"));   // true



function firstNonRepeatingChar(str) {

  let frequency={};
  for(let i=0;i<str.length;i++)
  { const ch = str[i];
    frequency[ch]=frequency[ch]?frequency[ch]+1:1;
  }
  for (let i = 0; i < str.length; i++) {
    if (freq[str[i]] === 1) {
      return str[i];
    }
  }
  return null;
}

console.log(firstNonRepeatingChar("swiss"));  

function countVowelsAndConsonants(str) {
  let vowels = 0;
  let consonants = 0;

  return { vowels, consonants };
}

console.log(countVowelsAndConsonants("I Love Coding"));


function removeDuplicates(str) {
  let seen = {};
  let result = '';

  for (let i = 0; i < str.length; i++) {
    let ch = str[i];

    if (!seen[ch]) {
      seen[ch] = true;
      result += ch;
    }
  }

  return result;
}

console.log(removeDuplicates("programming")); // progamin


function longestWord(str) {
  let longest = '';
  let current = '';

  for (let i = 0; i <= str.length; i++) {
    if (i < str.length && str[i] !== ' ') {
      current += str[i];
    } else {
      if (current.length > longest.length) {
        longest = current;
      }
      current = '';
    }
  }

  return longest;
}

console.log(longestWord("I Love Coding In JavaScript"));


function flatten(arr)
{
  let result=[];
  for(i=0;i<arr.length;i++)
  {
    if(Array.isArray(arr[i]))
    {
    result=result.concat(flatten(arr[i]));
    }else
    {
      result.push(arr[i]);
    }
  }
  return result;
}

flatten([1, [2, [3, 4], 5], 6])

// 1,2,3,5,7,11,13,17,23
function primeNo(num)
{
  if(num==1) return true;
  for(let i=2;i<=Math.sqrt(num);i++)
  {
      if(num%i===0)
      {
         return false;
      }
  }
  return true;  
}

console.log(primeNo(11));


🔹 String Reversal & Manipulation

1 Reverse a string character by character without using methods
2️ Reverse words in a sentence without using split, reverse, join
3️ Reverse each word but keep word order
👉 "I Love Coding" → "I evoL gnidoC"

4️ Check if a string is palindrome (no methods)
5️ Find the first non-repeating character in a string
6️ Count vowels & consonants in a string
7️ Find frequency of each character
8️ Remove duplicate characters from string
9️ Find longest word in a sentence
 Capitalize first letter of each word (no methods)

🔹 Loop + Condition Based

1️ Find factorial using for loop
2️ Check prime number without using array
3️ Print Fibonacci series
4️ Find sum of digits of a number
5️ Reverse a number (123 → 321)
6️ Check Armstrong number
7️ Swap two numbers without third variable
8️ Print star patterns using loops

🔹 Array Logic (No Methods / Limited Methods)

1️ Find max & min number in array (no Math.max)
2️ Find duplicate elements in array
3️ Remove duplicates without Set
4️ Count frequency of elements

5️ Find missing number in array

function missingNumber(arr,n)
{
let expectedSum=(n*(n+1))/2;
let actualSum=0;
for(let i=0;i<arr.length;i++)
{
  actualSum+=arr[i];
}
return expectedSum-actualSum;
}
console.log(missingNumber([1,2,3,5,6],6));




6️ Find second largest element
7️ Check if array is sorted
8️ Rotate array by k positions


const a=[1,2,4,5];

for(let i=0;i<a.length-1;i++)
{
if(a[i]+1!=a[i+1])
{
  console.log(a[i]+1);
}
}




?? Tricky Array & Recursion Questions
1?? Flatten array up to depth = 2
flatten([1, [2, [3, [4]]]], 2)
// Output ? [1, 2, 3, [4]]

2?? Count total elements in a nested array
count([1, [2, [3, 4], 5]])
// Output ? 5

3?? Find maximum number in nested array
max([1, [20, [3, 40], 5]])
// Output ? 40

4?? Sum of all numbers in nested array
sum([1, [2, [3, 4]], 5])
// Output ? 15

5?? Convert nested array into string (no flat)
toString([1, [2, [3, 4]], 5])
// Output ? "1,2,3,4,5"

6?? Remove duplicate values from nested array
unique([1, [2, 3], [3, [4, 2]]])
// Output ? [1,2,3,4]

7?? Check if array is deeply sorted
isSorted([1, [2, [3, 4]], 5])
// Output ? true

8?? Find first non-repeating number (nested)
firstUnique([1, [2, 3], [2, [1, 4]]])
// Output ? 3

9?? Flatten array WITHOUT recursion & WITHOUT stack

??
(Think carefully � interviewers love this)

?? Explain this output (VERY COMMON)
const arr = [1, [2, [3]]];
const result = arr + [];
console.log(result);

?? Bonus (Conceptual)

11?? Difference between:

concat vs push
flat vs recursion
call stack vs heap

JavaScript Traps Interviewers Love
1?? [] + {}
console.log([] + {});


? Output:

"[object Object]"


?? Why:

[] ? ""

{} ? "[object Object]"

"" + "[object Object]"

2?? { } + []
console.log({} + []);


? Output:

0


?? Why:

{} treated as empty block

+[] ? 0

?? Same symbols, different result ??

3?? [] == ![]
console.log([] == ![]);


? Output:

true


?? Breakdown:

![] ? false

[] == false

[] ? "" ? 0

0 == 0

4?? [1] + [2]
console.log([1] + [2]);


? Output:

"12"


?? Both arrays ? strings ? "1" + "2"

5?? true + false
console.log(true + false);


? Output:

1


?? true ? 1, false ? 0

6?? null + 1
console.log(null + 1);


? Output:

1


?? null ? 0

7?? undefined + 1
console.log(undefined + 1);


? Output:

NaN

8?? typeof NaN
console.log(typeof NaN);


? Output:

"number"


Classic ??

9?? 0.1 + 0.2 === 0.3
console.log(0.1 + 0.2 === 0.3);


? Output:

false


?? Floating point precision issue

?? [] === []
console.log([] === []);


? Output:

false


?? Different references in memory

?? GOLDEN INTERVIEW TIP

When stuck, say this:

JavaScript first performs type coercion, then evaluates the expression.

Interviewers LOVE hearing that.

?? Practice Challenge (try answering)

What�s the output?

console.log([] + []);
console.log([] + 1);
console.log([1,2] + 3);
console.log(+"10" + 1);


Say �explain answers� when ready � I�ll break them down like a pro interviewer