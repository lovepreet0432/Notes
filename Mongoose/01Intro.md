MongoDB is a NoSQL, document-based database.

Instead of rows & tables, it stores data as documents in JSON-like format (BSON).

Why MongoDB is Popular
✅ Flexible Schema
Easy to change structure
Good for evolving products

✅ Fast Reads/Writes
Optimized for JSON-like data
Indexing improves performance

✅ Horizontal Scalability
Sharding support
Handles big data easily

When NOT to Use MongoDB
❌ Avoid when:
Complex joins are frequent
Strong ACID transactions are critical
Highly relational data (banking systems)


CRUD Operations (Basics)
Insert
db.users.insertOne({ name: "Aman", age: 25 });

Find
db.users.find({ age: { $gt: 20 } });

Update
db.users.updateOne(
  { name: "Aman" },
  { $set: { age: 26 } }
);

Delete
db.users.deleteOne({ name: "Aman" });

Indexes (VERY IMPORTANT)
Indexes improve query performance.
db.users.createIndex({ email: 1 });


Without index → collection scan 😵
With index → fast lookup ⚡


Embedded vs Referenced Documents
Embedded (preferred)
{
  name: "Order1",
  items: [{ productId: 1, qty: 2 }]
}


✔️ Faster reads
❌ Larger documents

Referenced
{
  userId: "123",
  orderIds: ["a1", "b2"]
}


✔️ Less duplication
❌ More queries

Mongoose adds:
Schema
Validation
Middleware
Relations (populate)

