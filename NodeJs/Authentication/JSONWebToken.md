What is a JWT token?

A JWT (JSON Web Token) is a self-contained token that proves identity + permissions between two parties.

In simple words:

JWT is a tamper-proof identity card that the server gives to a client so the client can prove who they are without the server storing session data.

Primary purpose of JWT (THIS is the key)

The main purpose of JWT is:

👉 Stateless authorization, not login.

More precisely:

Verify who is making the request

Verify what they are allowed to do

Do it without querying the database every time

JWT is designed for:

APIs

Distributed systems

Microservices

Mobile clients

Where JWT fits in the auth flow

JWT is not the login mechanism itself.

Correct flow:

Login (credentials checked)
        ↓
JWT is issued
        ↓
JWT is used for authorization on APIs


Login = identity verification
JWT = proof of identity after login

Why JWT is NOT ideal for login (browser-based apps)

JWT causes problems when you use it as a session replacement.

1️⃣ No easy logout

JWT is stateless.

Once issued:

Server cannot revoke it

Logout doesn’t really “log out” the user

Token stays valid until expiry

With sessions → delete session → user is out instantly.

2️⃣ Token theft = full access

JWT is a bearer token.

If attacker gets it:

No password needed

No OTP

No server check

Full access until expiry

This is dangerous for browser apps.

3️⃣ Hard to handle password change / account compromise

If user:

Changes password

Account is blocked

Role is downgraded

JWT already issued:
❌ Still valid
❌ Still grants access

With sessions → invalidate all sessions.

4️⃣ Security trade-offs (cookies vs storage)

localStorage → XSS risk

Cookies → CSRF risk

JWT does not remove browser security issues—it just moves them.

5️⃣ You end up rebuilding sessions anyway

To make JWT safe for login, you add:

Short-lived access tokens

Refresh tokens

Rotation

Blacklists

Revocation logic

At that point:
👉 You’ve basically rebuilt session management, but with more complexity.

So… where SHOULD JWT be used?

JWT shines when statelessness is a benefit, not a problem.

✅ Best use cases
1️⃣ API authorization
Client → API → JWT verifies user


No DB hit per request.

2️⃣ Mobile applications

No cookies

Token stored securely

No CSRF

Stateless is perfect

3️⃣ Microservices & distributed systems
Service A → JWT → Service B


One token

Many services

No shared session store

4️⃣ Third-party integrations

Public APIs

Partner systems

OAuth access tokens (JWT format)

5️⃣ Short-lived access tokens

JWT is excellent when:

Lifetime = minutes

Scope is limited

Damage is contained

JWT vs Session (one-line truth)

Sessions are better for browser login. JWT is better for API authorization.

Interview-ready summary

JWT’s primary purpose is stateless authorization. It is not ideal for browser-based login because tokens cannot be easily revoked, logout is difficult, and token theft grants full access until expiration. Session-based authentication is simpler and safer for traditional web logins, while JWT is best suited for APIs, mobile apps, and microservices.