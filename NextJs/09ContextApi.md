Using Context API in Next.js

Best for:

Theme

Auth user

Language

Small / medium state

1️⃣ Create Context (Client Component)
// context/AuthContext.tsx
"use client";

import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

2️⃣ Wrap your app (layout.tsx)
// app/layout.tsx
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

3️⃣ Use it anywhere
"use client";
import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const { user, setUser } = useAuth();

  return (
    <button onClick={() => setUser({ name: "Lovepreet" })}>
      Login
    </button>
  );
}