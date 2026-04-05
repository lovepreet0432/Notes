🔎 Redis Search & Indexing (RediSearch)

RediSearch is a module on top of Redis that adds:

👉 Full-text search
👉 Indexing
👉 Filtering
👉 Sorting

🤔 Why do we need Redis Search?

Normal Redis:

GET user:1

👉 You must know the exact key.

❌ Problem:

No searching like:
“find users with name containing ‘love’”
“products under ₹1000 sorted by rating”
✅ RediSearch solves this

👉 It lets you search inside values, not just keys.

🧱 How Indexing Works
Without Indexing:
Redis scans all data (slow)
With Indexing:
Redis builds a search index
Like a shortcut for finding data fast
📦 Example: User Data
{
  "id": 1,
  "name": "Lovepreet",
  "age": 25,
  "city": "Chandigarh"
}
🛠️ Step 1: Create Index
FT.CREATE userIdx ON HASH PREFIX 1 "user:" 
SCHEMA name TEXT age NUMERIC city TEXT

👉 Now Redis knows:

name → searchable text
age → numeric filter
city → searchable
🛠️ Step 2: Add Data
HSET user:1 name "Lovepreet" age 25 city "Chandigarh"
HSET user:2 name "Aman" age 22 city "Delhi"
🛠️ Step 3: Search
FT.SEARCH userIdx "@city:Chandigarh"

👉 Output: all users from Chandigarh

⚡ Advanced Queries
🔍 Text search
FT.SEARCH userIdx "Lovepreet"
🎯 Filter
FT.SEARCH userIdx "@age:[20 30]"
📊 Sort
FT.SEARCH userIdx "*" SORTBY age DESC
🧠 Real Use Cases
Product search (Amazon-like)
User search (admin panels)
Blog search
Autocomplete
🤯 What is Fuzzy Search?

👉 Fuzzy search means:
“Find results even if the query is slightly wrong”

Example

User types:

Lovepret

Correct name:

Lovepreet

👉 Fuzzy search still finds it ✅

🛠️ In RediSearch

Use ~ operator:

FT.SEARCH userIdx "Lovepret~"

👉 Redis will:

Try similar words
Return closest matches
🧠 How it works internally?

Uses:
👉 Levenshtein Distance (edit distance)

Meaning:

How many changes needed to match words

Example:

Lovepret → Lovepreet = 1 character difference
🔥 Real-world Examples
Amazon → typo-tolerant search
Google → “Did you mean?”
Netflix → movie search
⚔️ Redis Search vs MongoDB Search

Since you’re MERN dev, this matters:

MongoDB
Good for basic queries
Limited full-text search
Redis + RediSearch
Super fast (in-memory)
Better for:
autocomplete
fuzzy search
real-time filtering
💡 When to use Redis Search?

Use when:

You need fast search
Autocomplete suggestions
Typo tolerance (fuzzy search)
Real-time filtering
⚠️ When NOT to use?

Avoid if:

Huge dataset (RAM expensive)
Complex analytics queries

👉 In that case:

Use Elasticsearch instead