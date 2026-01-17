Think of Aggregation Pipeline like a data processing pipeline:

📦 Data comes in → 🔧 processed step-by-step → 📊 final result

MongoDB Aggregation Pipeline Stages (Names Only)

$match
$project
$addFields - addFields is a MongoDB aggregation stage that allows you to add new fields or modify existing fields in documents as they pass through the pipeline.

$set  -  is used to add or modify fields in documents during an aggregation.
$unset  - Remove fields
$group
$unwind  - Explode array into documents
$sort
$limit
$skip
$count
$lookup
$graphLookup  -  recursive relationships
$facet   -  Run multiple pipelines in parallel
$bucket  - We use $bucket to group data into predefined numeric ranges for analysis and reporting.
$bucketAuto
$sample
$replaceRoot
$replaceWith
$sortByCount
$setWindowFields
$unionWith
$densify
$fill
$documents
Each stage has one clear job. You chain them in the order you need.


Accumulators inside $group:
$sum
$avg
$min
$max
$push
$addToSet
$first
$last


🔹 $match – Filter data early
When to use

When you want to filter documents

Same as find() but inside aggregation

ALWAYS try to use $match as early as possible

Why

Reduces documents early → better performance

Allows index usage

Use cases

Filter by status, userId, date range

Apply conditions before grouping

{
  $match: { status: "ACTIVE", age: { $gte: 18 } }
}


👉 Rule of thumb
If you would normally use find(), use $match.

🔹 $group – Create summaries / totals
When to use

When you need aggregation results

Totals, counts, averages, min/max

Group data by some key

Why

This is how MongoDB does analytics

Common use cases

Total orders per user

Total revenue per day

Count products per category

{
  $group: {
    _id: "$userId",
    totalOrders: { $sum: 1 },
    totalAmount: { $sum: "$amount" }
  }
}


👉 Important

$group changes the shape of data

After $group, original fields are gone unless included

🔹 $project – Shape the output
When to use

When you want to select, rename, or calculate fields

Hide unnecessary fields

Create computed fields

Why

Clean response

Smaller payload

API-friendly output

Use cases

Rename fields

Hide _id

Create fullName, totalPrice, etc.

{
  $project: {
    _id: 0,
    name: 1,
    total: 1,
    tax: { $multiply: ["$total", 0.18] }
  }
}


👉 Think of it as

MongoDB version of select + computed columns

🔹 $sort – Order the results
When to use

When results must be ordered

Leaderboards, latest items, highest values

Why

DB-side sorting is faster than JS sorting

Use cases

Latest orders

Top-selling products

Highest salary employees

{
  $sort: { createdAt: -1 }
}


👉 Interview tip
Sorting after $group is VERY common.

🔹 $limit – Restrict result size
When to use

When you only need top N results

Dashboards

Performance optimization

Why

Prevents returning unnecessary data

Use cases

Top 5 users

Latest 10 orders

Trending products

{
  $limit: 5
}


👉 Usually used after $sort

🔹 $lookup – Join collections
When to use

When data is in multiple collections

MongoDB version of SQL JOIN

Why

To avoid extra queries in backend

Get related data in one response

Use cases

Orders → Users

Products → Categories

Posts → Comments

{
  $lookup: {
    from: "users",
    localField: "userId",
    foreignField: "_id",
    as: "user"
  }
}


👉 Important

Result is always an array

Can impact performance on large collections

🔹 $unwind – Flatten arrays
When to use

When you want to work with array elements individually

Often used after $lookup

Why

$lookup returns arrays

$group works better on flat documents

Use cases

One user per order instead of array

Count items inside arrays

{
  $unwind: "$user"
}


👉 Without $unwind, $group may behave unexpectedly.

🔥 Common Real-World Pipeline Example

“Get top 5 users by total order amount”

[
  { $match: { status: "COMPLETED" } },
  {
    $group: {
      _id: "$userId",
      totalSpent: { $sum: "$amount" }
    }
  },
  { $sort: { totalSpent: -1 } },
  { $limit: 5 },
  {
    $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "_id",
      as: "user"
    }
  },
  { $unwind: "$user" },
  {
    $project: {
      _id: 0,
      name: "$user.name",
      totalSpent: 1
    }
  }
]

🧠 Easy Memory Trick
Stage	Think of it as
$match	WHERE
$group	GROUP BY
$project	SELECT
$sort	ORDER BY
$limit	LIMIT
$lookup	JOIN
$unwind	FLATTEN


$facet – Multiple queries in ONE pipeline
What it does

$facet lets you run multiple aggregation pipelines in parallel on the same input data.

👉 One DB call → multiple results

When to use $facet

Use it when you need different views of the same data at the same time.

Real-world use cases

Dashboard APIs

Pagination + total count

Filters + stats together

Charts + lists in one response

Example: Pagination + total count

Instead of two DB queries, use $facet.

{
  $facet: {
    data: [
      { $sort: { createdAt: -1 } },
      { $skip: 0 },
      { $limit: 10 }
    ],
    totalCount: [
      { $count: "count" }
    ]
  }
}


📦 Output

{
  "data": [ ...10 documents ],
  "totalCount": [{ "count": 120 }]
}


👉 Super useful for APIs:

{
  data,
  totalPages,
  currentPage
}

Dashboard example
{
  $facet: {
    totalUsers: [{ $count: "count" }],
    activeUsers: [{ $match: { status: "ACTIVE" } }, { $count: "count" }],
    premiumUsers: [{ $match: { plan: "PREMIUM" } }, { $count: "count" }]
  }
}


👉 One query → full dashboard stats 🚀

When NOT to use $facet

When simple find() is enough

On very large datasets without proper $match

If you don’t need multiple results together

🔹 $bucket – Group data into ranges
What it does

$bucket groups documents into predefined ranges.

👉 Think histograms.

When to use $bucket

Use it when data needs to be grouped into fixed intervals.

Real-world use cases

Age groups

Price ranges

Rating buckets

Salary slabs

Example: Age Groups
{
  $bucket: {
    groupBy: "$age",
    boundaries: [0, 18, 30, 45, 60],
    default: "60+",
    output: {
      count: { $sum: 1 }
    }
  }
}


📦 Output

[
  { "_id": 0, "count": 12 },
  { "_id": 18, "count": 40 },
  { "_id": 30, "count": 25 },
  { "_id": 45, "count": 10 },
  { "_id": "60+", "count": 5 }
]

Price range example
{
  $bucket: {
    groupBy: "$price",
    boundaries: [0, 500, 1000, 5000],
    default: "5000+",
    output: {
      products: { $sum: 1 }
    }
  }
}


👉 Perfect for filters on e-commerce sites.

🔥 $bucket vs $group
Feature	$bucket	$group
Grouping type	Fixed ranges	Any key
Best for	Histograms	Totals & stats
Boundaries	Required	Not needed
Flexibility	Medium	High