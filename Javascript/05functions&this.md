
this depends on how a function is called
Arrow functions don’t have their own this
new binds this to a new object
call/apply/bind manually set this
Losing reference = losing this


1️⃣ What is this in JavaScript?
👉 this = the object that is calling the function
    Not where it’s written, but how it’s called.

2️⃣ Normal Function & this
🔹 Case 1: Normal function (global scope)
    function show() {
      console.log(this);
    }
    show();

    ✅ Output:

    Browser: window
    Strict mode: undefined

🧠 Normal functions depend on call-site.

3️⃣ Method Call (object.function())
    const obj = {
      name: "JS",
      show() {
        console.log(this.name);
      }
    };
    obj.show();

    ✅ Output:
    JS
    🧠 this → object before the dot (obj)

4️⃣ Tricky: Method extracted
    const obj = {
      name: "JS",
      show() {
        console.log(this.name);
      }
    };

    const fn = obj.show;
    fn();

    ✅ Output:
    undefined

    🧠 Call-site is now plain function, not obj.

5️⃣ this inside setTimeout (🔥 Very Common)
    const obj = {
      name: "JS",
      show() {
        setTimeout(function () {
          console.log(this.name);
        }, 0);
      }
    };
    obj.show();

    ✅ Output:

    undefined
    🧠 Normal function inside setTimeout → this = window

✔ Fix 1: Store this
    const obj = {
      name: "JS",
      show() {
        const self = this;
        setTimeout(function () {
          console.log(self.name);
        }, 0);
      }
    };

✔ Fix 2: Arrow function (recommended)
    setTimeout(() => {
      console.log(this.name);
    }, 0);

6️⃣ Arrow Function vs Normal Function (Important)
Feature	Normal  Function	  Arrow Function
Has own this   	✅ Yes	      ❌ No
this depends on call	✅ Yes	❌ No
Can be constructor	✅ Yes	❌ No
arguments object	✅ Yes	❌ No

👉 Arrow function inherits this from parent scope.

7️⃣ Tricky Question: Arrow as method ❌
  const obj = {
    name: "JS",
    show:() => {
      console.log(this.name);
    }
  };
  obj.show();

  ✅ Output:
  undefined

🧠 Arrow function doesn’t bind this to obj.

📌 Interview line:
Never use arrow functions as object methods when you need this.

8️⃣ Nested Objects (Tricky)
const obj = {
  name: "JS",
  child: {
    name: "React",
    show() {
      console.log(this.name);
    }
  }
};
obj.child.show();

✅ Output:
React

🧠 this = object before the dot (child)

9️⃣ this with Constructor Function
  function User(name) {
    this.name = name;
  }

  const u1 = new User("JS");
  console.log(u1.name);

  ✅ Output:
  JS

🧠 new creates a new object and binds this to it.

🔥 Tricky Constructor Case
function User(name) {
  this.name = name;
  return { name: "Override" };
}

const u = new User("JS");
console.log(u.name);

✅ Output:
Override


🧠 Returning an object overrides this.

10️⃣ call, apply, bind

function show(city) {
  console.log(this.name, city);
}

const user = { name: "JS" };

show.call(user, "Delhi");
show.apply(user, ["Delhi"]);

const boundFn = show.bind(user);
boundFn("Delhi");

11️⃣ Super Tricky Output Questions 🔥
❓ Q1
const obj = {
  name: "JS",
  show() {
    return function () {
      console.log(this.name);
    };
  }
};

obj.show()();

✅ Output:
undefined

❓ Q2 (Fix it mentally)
const obj = {
  name: "JS",
  show() {
    return () => {
      console.log(this.name);
    };
  }
};

obj.show()();

✅ Output:
JS

❓ Q3
console.log(this === window);

✅ Browser:
true

❌ Node:
false

