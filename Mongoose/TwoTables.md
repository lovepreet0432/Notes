Collection 1: users
{
  _id: ObjectId("u1"),
  name: "Aman",
  email: "aman@gmail.com",
  age: 28,
  city: "Delhi",
  isActive: true,
  createdAt: ISODate("2024-01-10")
}

Collection 2: orders
{
  _id: ObjectId("o1"),
  userId: ObjectId("u1"),
  product: "Laptop",
  price: 70000,
  quantity: 1,
  status: "delivered",
  orderDate: ISODate("2024-02-05")
}


BASIC QUESTIONS

1️⃣ Find all users
db.users.find()
2️⃣ Find users who are isActive = true
db.users.find({ isActive: true })
3️⃣ Find users from "Delhi"
db.users.find({ isActive: true })
4️⃣ Find orders with price greater than 50,000
db.orders.find({ price: { $gt: 50000 } })
5️⃣ Find orders with status "delivered"
db.orders.find({ status: "delivered" })


FILTERING & OPERATORS

6️⃣ Find users whose age is greater than 25
db.users.find({ age: { $gt: 25 } })
7️⃣ Find orders where quantity is more than 1
db.orders.find({ quantity: { $gt: 1 } })
8️⃣ Find users created after Jan 1, 2024
db.users.find({
  createdAt: { $gt: ISODate("2024-01-01") }
})

9️⃣ Find orders with price between 30k and 80k
db.orders.find({
  price: { $gte: 30000, $lte: 80000 }
})
🔟 Find users whose email ends with @gmail.com
db.users.find({
  email: { $regex: "@gmail.com$", $options: "i" }
})


🟡 SORTING & LIMITING

1️⃣1️⃣ Get latest 5 users
db.users.find().sort({ createdAt: -1 }).limit(5)
1️⃣2️⃣ Get top 3 expensive orders
db.orders.find().sort({ price: -1 }).limit(3)
1️⃣3️⃣ Sort users by age (descending)
db.users.find().sort({ age: -1 })
1️⃣4️⃣ Sort orders by orderDate (latest first)
db.orders.find().sort({ orderDate: -1 })

🟠 RELATIONSHIP QUESTIONS ($lookup)

1️⃣5️⃣ Get all orders with user details
db.orders.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user"
    }
  },
  { $unwind: "$user" }
])
1️⃣6️⃣ Get all orders placed by user "Aman"
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
  { $match: { "user.name": "Aman" } }
])

1️⃣7️⃣ Get users who have placed at least one order
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
    $match: {
      "orders.0": { $exists: true }
    }
  }
])


1️⃣8️⃣ Get users who have never placed any order
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
    $match: { orders: { $eq: [] } }
  }
])
👉 Interviewer favorite 🔥

🟠 AGGREGATION QUESTIONS

1️⃣9️⃣ Get total order amount per user
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
    $addFields: {
      totalAmount: {
        $sum: {
          $map: {
            input: "$orders",
            as: "o",
            in: { $multiply: ["$$o.price", "$$o.quantity"] }
          }
        }
      }
    }
  },
  {
    $project: {
      name: 1,
      email: 1,
      totalAmount: 1
    }
  }
])

2️⃣0️⃣ Get total number of orders per user
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
    $addFields: {
      totalOrders: { $size: "$orders" }
    }
  },
  {
    $project: {
      name: 1,
      email: 1,
      totalOrders: 1
    }
  }
])

2️⃣1️⃣ Get total revenue from all orders
2️⃣2️⃣ Get average order price
2️⃣3️⃣ Get users with total purchase > 1,00,000

🔴 ADVANCED (INTERVIEW GOLD)

2️⃣4️⃣ Get top 3 users by total spending
2️⃣5️⃣ Get monthly order count
2️⃣6️⃣ Find users who placed orders in Feb 2024 only
2️⃣7️⃣ Find users who placed both delivered and pending orders
2️⃣8️⃣ Find users with more than 2 orders

🔴 PERFORMANCE & DESIGN QUESTIONS

2️⃣9️⃣ Which fields should be indexed and why?
3️⃣0️⃣ Would you embed orders inside users or reference them?
3️⃣1️⃣ How would schema change if orders grow to millions?
3️⃣2️⃣ How to optimize $lookup performance?