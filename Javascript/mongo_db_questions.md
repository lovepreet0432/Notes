Alright Lovepreet, let’s set up two collections with realistic data and then I’ll ask you aggregation-based interview questions that actually require pipelines like $match, $group, $lookup, $project, $unwind, $sort, $facet, $bucket, etc.

I’ll keep the data simple but rich enough for tricky queries.
| Order ID | User ID | Status     | Amount | Order Date  | Items |
|---------:|--------:|------------|-------:|-------------|-------|
| 1 | 101 | delivered | 1200 | 2025-01-12 | Tshirt (2 × 300), Shoes (1 × 600) |
| 2 | 102 | pending   | 500  | 2025-02-02 | Cap (1 × 200), Tshirt (1 × 300) |
| 3 | 101 | delivered | 2500 | 2025-02-10 | Shoes (2 × 1200), Socks (3 × 100) |

| User ID | Name      | City        | Age |
|-------:|-----------|-------------|----:|
| 101 | Lovepreet | Mohali      | 25 |
| 102 | Arjun     | Delhi       | 28 |
| 103 | Simran    | Chandigarh  | 22 |


🗂 Collection 1: orders [ { "_id": 1, "userId": 101, "amount": 1200, "status": "delivered", "items": [ { "product": "Tshirt", "qty": 2, "price": 300 }, { "product": "Shoes", "qty": 1, "price": 600 } ], "orderDate": ISODate("2025-01-12") }, { "_id": 2, "userId": 102, "amount": 500, "status": "pending", "items": [ { "product": "Cap", "qty": 1, "price": 200 }, { "product": "Tshirt", "qty": 1, "price": 300 } ], "orderDate": ISODate("2025-02-02") }, { "_id": 3, "userId": 101, "amount": 2500, "status": "delivered", "items": [ { "product": "Shoes", "qty": 2, "price": 1200 }, { "product": "Socks", "qty": 3, "price": 100 } ], "orderDate": ISODate("2025-02-10") } ]


🗂 Collection 2: users [ { "_id": 101, "name": "Lovepreet", "city": "Mohali", "age": 25 }, { "_id": 102, "name": "Arjun", "city": "Delhi", "age": 28 }, { "_id": 103, "name": "Simran", "city": "Chandigarh", "age": 22 } ]


🔥 Now the Aggregation Query Questions (Tricky + Realistic)
1️⃣ Find total amount spent by each user.

(Use: $group)

Expected pipeline idea:

group by userId

sum amount

2️⃣ Get the number of delivered and pending orders for each user.

(Use: $group, $sum, conditional operators)

Example logic:

{ $sum: { $cond: [ { $eq: ["$status", "delivered"] }, 1, 0 ] } }

3️⃣ Which product was sold the most?

(Use: $unwind, $group, $sort)

Steps:

flatten items array

group by product

sum qty

sort desc

4️⃣ Find users who spent more than 2000 total.

(Use: $group, $match)

5️⃣ Join users with their orders and show user info along with order count.

(Use: $lookup, $project, $size)

6️⃣ List all orders with user names instead of userId.

(Use: $lookup, $unwind, $project)

7️⃣ Find top 2 users based on total money spent.

(Use: $group, $sort, $limit)

8️⃣ Find average order amount per city.

(Use: $lookup, $group)

Steps:

join orders with users

group by city

take avg of amount

9️⃣ Show monthly revenue for 2025.

(Use: $group, $project, $sort)

Extract month from orderDate:

{ $month: "$orderDate" }

🔟 Get total number of items sold across all orders.

(Use: $unwind, $group, $sum)

11️⃣ Get count of orders grouped by order status.

(Use: $group)

12️⃣ Bucket orders into price ranges.

(Use: $bucket)

Example buckets:

0–500

501–1500

1501–3000

13️⃣ Using $facet, return:

total users

total orders

top product
in one single query.

14️⃣ Calculate the total value per order using items array.

(Use: $unwind, $group, $project)

15️⃣ Find the user who ordered the highest quantity of Shoes.

(Use: $unwind, $match, $group, $sort)

📌 Want me to also give the answers with full aggregation pipelines for all 15 questions?

Just say "show answers" and I’ll write the exact pipelines.

You said:
yes
ChatGPT said:

Perfect — here you go!
These are the full aggregation pipeline answers to all 15 questions using the two collections we created.

I’ll keep the explanations short and the pipelines accurate for interview use.

🚀 1️⃣ Total amount spent by each user
db.orders.aggregate([
  { $group: { _id: "$userId", totalSpent: { $sum: "$amount" } } }
])

🚀 2️⃣ Count delivered & pending orders per user
db.orders.aggregate([
  {
    $group: {
      _id: "$userId",
      delivered: {
        $sum: { $cond: [{ $eq: ["$status", "delivered"] }, 1, 0] }
      },
      pending: {
        $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] }
      }
    }
  }
])

🚀 3️⃣ Most sold product
db.orders.aggregate([
  { $unwind: "$items" },
  {
    $group: {
      _id: "$items.product",
      totalQty: { $sum: "$items.qty" }
    }
  },
  { $sort: { totalQty: -1 } },
  { $limit: 1 }
])

🚀 4️⃣ Users who spent more than 2000
db.orders.aggregate([
  { $group: { _id: "$userId", totalSpent: { $sum: "$amount" } } },
  { $match: { totalSpent: { $gt: 2000 } } }
])

🚀 5️⃣ Join users + order count
db.users.aggregate([
  {
    $lookup: {
      from: "orders",
      localField: "_id",
      foreignField: "userId",
      as: "orders"
    }
  },
  {
    $project: {
      name: 1,
      orderCount: { $size: "$orders" }
    }
  }
])

🚀 6️⃣ Replace userId with user info
db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user"
    }
  },
  { $unwind: "$user" },
  {
    $project: {
      userId: 0,
      "user._id": 0
    }
  }
])

🚀 7️⃣ Top 2 users based on total spending
db.orders.aggregate([
  { $group: { _id: "$userId", totalSpent: { $sum: "$amount" } } },
  { $sort: { totalSpent: -1 } },
  { $limit: 2 }
])

🚀 8️⃣ Average order amount per city
db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user"
    }
  },
  { $unwind: "$user" },
  {
    $group: {
      _id: "$user.city",
      avgAmount: { $avg: "$amount" }
    }
  }
])

🚀 9️⃣ Monthly revenue for 2025
db.orders.aggregate([
  {
    $group: {
      _id: { month: { $month: "$orderDate" } },
      totalAmount: { $sum: "$amount" }
    }
  },
  { $sort: { "_id.month": 1 } }
])

🚀 🔟 Total number of items sold
db.orders.aggregate([
  { $unwind: "$items" },
  {
    $group: {
      _id: null,
      totalItems: { $sum: "$items.qty" }
    }
  }
])

🚀 11️⃣ Count orders grouped by status
db.orders.aggregate([
  { $group: { _id: "$status", count: { $sum: 1 } } }
])

🚀 12️⃣ Bucket orders into price ranges
db.orders.aggregate([
  {
    $bucket: {
      groupBy: "$amount",
      boundaries: [0, 500, 1500, 3000],
      default: "Above 3000",
      output: {
        orderCount: { $sum: 1 },
        totalAmount: { $sum: "$amount" }
      }
    }
  }
])

🚀 13️⃣ $facet → total users, total orders, top product
db.orders.aggregate([
  {
    $facet: {
      totalUsers: [
        {
          $group: {
            _id: "$userId"
          }
        },
        { $count: "count" }
      ],
      totalOrders: [
        { $count: "count" }
      ],
      topProduct: [
        { $unwind: "$items" },
        {
          $group: {
            _id: "$items.product",
            qty: { $sum: "$items.qty" }
          }
        },
        { $sort: { qty: -1 } },
        { $limit: 1 }
      ]
    }
  }
])

🚀 14️⃣ Compute total order value using items

Even if amount is present, we compute it manually.

db.orders.aggregate([
  { $unwind: "$items" },
  {
    $group: {
      _id: "$_id",
      total: { $sum: { $multiply: ["$items.qty", "$items.price"] } }
    }
  }
])

🚀 15️⃣ User who ordered highest quantity of Shoes
db.orders.aggregate([
  { $unwind: "$items" },
  { $match: { "items.product": "Shoes" } },
  {
    $group: {
      _id: "$userId",
      totalQty: { $sum: "$items.qty" }
    }
  },
  { $sort: { totalQty: -1 } },
  { $limit: 1 }
])



-------------------------------------------------------------------

I�ll create 2 collections, give sample data, then ask interview-style questions where you have to think about the query + expected result.

?? Collection 1: users
{
  _id: ObjectId,
  name: String,
  email: String,
  age: Number,
  city: String
}

Sample Data
[
  { _id: 1, name: "Aman", age: 25, city: "Mohali" },
  { _id: 2, name: "Ravi", age: 30, city: "Chandigarh" },
  { _id: 3, name: "Simran", age: 28, city: "Mohali" },
  { _id: 4, name: "Neha", age: 35, city: "Delhi" }
]

?? Collection 2: orders
{
  _id: ObjectId,
  userId: Number,
  product: String,
  amount: Number,
  status: String
}

Sample Data
[
  { _id: 101, userId: 1, product: "Laptop", amount: 80000, status: "completed" },
  { _id: 102, userId: 1, product: "Mouse", amount: 2000, status: "completed" },
  { _id: 103, userId: 2, product: "Keyboard", amount: 3000, status: "pending" },
  { _id: 104, userId: 3, product: "Monitor", amount: 15000, status: "completed" },
  { _id: 105, userId: 3, product: "Laptop", amount: 75000, status: "cancelled" }
]

?? MongoDB Interview Questions (Queries + Results)
1?? Find all users from Mohali

?? What will be the query?
?? What will be the result?

2?? Find users whose age is greater than 28
3?? Find all completed orders
4?? Find total number of orders per user

(Result should show userId + orderCount)

5?? Find total purchase amount per user

(Only include completed orders)

6?? Join users with orders and show:

user name

product

amount

(Hint: $lookup)

7?? Find users who never placed any order

(Important real interview question)

8?? Find users who placed more than 1 order
9?? Find the user who spent the maximum amount
?? Show city-wise total order amount

(Result like: Mohali ? totalAmount)

?? Interview Tip

For 5 years experience, interviewer expects:

$match

$group

$lookup

$sum

$count

$project