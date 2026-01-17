1️⃣ What is Redux?

Redux is a predictable state management library for JavaScript apps.

👉 It stores the entire app state in a single global store.

Core Redux principles

Single source of truth (one store)
State is read-only
Changes happen via pure reducers

Traditional Redux flow
UI → dispatch(action) → reducer → store → UI

2️⃣ Problems with Classic Redux 😵

Too much boilerplate
Separate:
actions
reducers
constants
Hard for beginners

That’s why Redux Toolkit (RTK) exists.

3️⃣ What is Redux Toolkit?

Redux Toolkit is the official, recommended way to use Redux.

It:
Reduces boilerplate
Uses Immer (mutations are safe)
Comes with async support
Better defaults

👉 Today, when you say “Redux”, interviewers expect Redux Toolkit.

4️⃣ Core RTK concepts
1️⃣ configureStore

Creates the store with good defaults.

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    user: userReducer
  }
});

2️⃣ createSlice

Combines:
state
reducers
actions

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { data: null },
  reducers: {
    setUser(state, action) {
      state.data = action.payload;
    },
    logout(state) {
      state.data = null;
    }
  }
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;

5️⃣ How Async Operations Work in Redux

Redux itself is synchronous.

👉 Async logic is handled using middleware.

6️⃣ Async in Redux Toolkit – createAsyncThunk (MOST IMPORTANT 🔥)
What is createAsyncThunk?

A helper that:
Handles async logic
Dispatches lifecycle actions automatically

Lifecycle:

pending → fulfilled → rejected

Example: API call
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// async action
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId, thunkAPI) => {
    const res = await fetch(`/api/users/${userId}`);
    return res.json();
  }
);

Handle async states in slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

7️⃣ Using async thunk in component
import { useDispatch, useSelector } from "react-redux";

function Profile() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchUser(1));
  }, []);

  if (loading) return <p>Loading...</p>;
  return <h1>{data.name}</h1>;
}

8️⃣ Why createAsyncThunk is great

No manual action types
Auto error handling
Clean async lifecycle

Easy testing

9️⃣ Async alternatives in Redux
1️⃣ Redux Thunk (classic)

Functions instead of objects

Manual handling

2️⃣ Redux Saga

Generator-based

Complex but powerful

Overkill for most apps

3️⃣ RTK Query 🔥🔥

Best for API data
Auto caching, refetching
Replaces most async thunks