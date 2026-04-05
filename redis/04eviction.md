🧠 What are Eviction Policies in Redis?

👉 Redis stores data in RAM (limited memory)
👉 When memory is full → Redis must decide:

“Which data should I remove?”

That decision = Eviction Policy

⚠️ Why this matters (real problem)

Imagine:

You’re caching API responses
Memory gets full

❌ Without eviction:

Redis throws error → app breaks

✅ With eviction:

Redis removes old/less important data automatically
⚙️ Types of Eviction Policies

Redis has different strategies depending on your use case.

🔥 1. noeviction (default sometimes)

👉 Do nothing when memory is full

New writes → ❌ error
Old data → stays

📌 Use case:

Critical data (you don’t want auto deletion)
⏳ 2. allkeys-lru (Most popular)

👉 Remove Least Recently Used (LRU) key

Works on ALL keys (even without expiry)

📌 Example:

Key not accessed for long → removed first

👉 Perfect for:

Caching APIs
🧠 3. volatile-lru

👉 Remove LRU only among keys with expiry (TTL)

Keys without expiry → safe

📌 Use case:

Mix of permanent + cache data
🎯 4. allkeys-lfu (Smart modern choice)

👉 Remove Least Frequently Used (LFU) key

Tracks usage frequency

📌 Example:

Rarely accessed key → removed

👉 Better than LRU in many cases

📉 5. volatile-lfu

👉 LFU but only for keys with expiry

⏲️ 6. volatile-ttl

👉 Remove key with shortest remaining TTL

📌 Example:

Key expiring in 5 sec → removed first
🎲 7. random policies
allkeys-random → remove random key
volatile-random → random key with expiry

📌 Rarely used (mostly for testing)