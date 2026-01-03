# Hooks Documentation

This folder contains custom React hooks using TanStack Query (React Query) for state management and data fetching.

## 🎣 Available Hooks

### Authentication Hooks (`useAuth.ts`)

#### `useCurrentUser()`

Get the currently authenticated user.

```typescript
const { data: user, isLoading, error } = useCurrentUser();
```

#### `useSignIn()`

Sign in with email and password.

```typescript
const signIn = useSignIn();

signIn.mutate(
  {
    email: "user@example.com",
    password: "password123",
  },
  {
    onSuccess: () => router.push("/dashboard"),
    onError: (error) => showError(error.message),
  }
);
```

#### `useSignUp()`

Create a new account.

```typescript
const signUp = useSignUp();

signUp.mutate({
  email: "user@example.com",
  password: "password123",
});
```

#### `useSignOut()`

Sign out the current user.

```typescript
const signOut = useSignOut();

signOut.mutate();
```

---

### User Hooks (`useUser.ts`)

#### `useUserSettings(userId)`

Get user settings with automatic creation if they don't exist.

```typescript
const { data: settings, isLoading } = useUserSettings(userId);
```

#### `useUpdateUserSettings(userId)`

Update user settings.

```typescript
const updateSettings = useUpdateUserSettings(userId);

updateSettings.mutate({
  anime_tracker_enabled: true,
  todo_list_enabled: false,
});
```

---

### Anime Hooks (`useAnime.ts`)

#### `useAnimeList(userId)`

Get all anime entries for a user.

```typescript
const { data: animeList, isLoading } = useAnimeList(userId);
```

#### `useAddAnime(userId)`

Add a new anime entry.

```typescript
const addAnime = useAddAnime(userId);

addAnime.mutate("My Hero Academia");
```

#### `useUpdateAnimeStatus(userId)`

Update anime status.

```typescript
const updateStatus = useUpdateAnimeStatus(userId);

updateStatus.mutate({
  id: "anime_123",
  status: "watching",
});
```

#### `useDeleteAnime(userId)`

Delete an anime entry.

```typescript
const deleteAnime = useDeleteAnime(userId);

deleteAnime.mutate("anime_123");
```

---

### Todo Hooks (`useTodo.ts`)

#### `useTodoList(userId)`

Get all todo items.

```typescript
const { data: todos, isLoading } = useTodoList(userId);
```

#### `useAddTodo(userId)`

Add a new todo item.

```typescript
const addTodo = useAddTodo(userId);

addTodo.mutate({
  title: "Complete project",
  priority: "high",
});
```

#### `useToggleTodo(userId)`

Toggle todo completion status.

```typescript
const toggleTodo = useToggleTodo(userId);

toggleTodo.mutate({
  id: "todo_123",
  completed: true,
});
```

#### `useDeleteTodo(userId)`

Delete a todo item.

```typescript
const deleteTodo = useDeleteTodo(userId);

deleteTodo.mutate("todo_123");
```

---

### Spending Hooks (`useSpending.ts`)

#### `useSpendingList(userId)`

Get all spending entries.

```typescript
const { data: expenses, isLoading } = useSpendingList(userId);
```

#### `useAddSpending(userId)`

Add a spending entry.

```typescript
const addSpending = useAddSpending(userId);

addSpending.mutate({
  title: "Groceries",
  amount: 50.0,
  category: "Food",
});
```

#### `useDeleteSpending(userId)`

Delete a spending entry.

```typescript
const deleteSpending = useDeleteSpending(userId);

deleteSpending.mutate("spending_123");
```

#### `useTotalSpending(userId)`

Calculate total spending (computed value).

```typescript
const totalSpent = useTotalSpending(userId);
// Returns: number
```

---

### Health Hooks (`useHealth.ts`)

#### `useTodayHealthMetrics(userId)`

Get today's health metrics.

```typescript
const { data: metrics, isLoading } = useTodayHealthMetrics(userId);
```

#### `useUpdateHealthMetrics(userId)`

Update health metrics for today.

```typescript
const updateHealth = useUpdateHealthMetrics(userId);

updateHealth.mutate({
  metricType: "steps",
  value: 10000,
});
```

---

## 🎯 Usage Examples

### Complete Component Example

```typescript
"use client";

import { useAnimeList, useAddAnime, useDeleteAnime } from "@/hooks";
import { showSuccess, showError } from "@/utils";

export default function AnimeTracker({ userId }: { userId: string }) {
  const { data: animeList, isLoading } = useAnimeList(userId);
  const addAnime = useAddAnime(userId);
  const deleteAnime = useDeleteAnime(userId);

  const handleAdd = (title: string) => {
    addAnime.mutate(title, {
      onSuccess: () => showSuccess("Anime added!"),
      onError: (error) => showError(error.message),
    });
  };

  const handleDelete = (id: string) => {
    deleteAnime.mutate(id, {
      onSuccess: () => showSuccess("Anime deleted!"),
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {animeList?.map((anime) => (
        <div key={anime.id}>
          <h3>{anime.title}</h3>
          <button onClick={() => handleDelete(anime.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

---

## ✅ Benefits

- **Automatic Caching** - Data is cached and reused
- **Auto Refetch** - Data stays fresh automatically
- **Loading States** - Built-in loading and error states
- **Optimistic Updates** - UI updates before server confirms
- **Type Safety** - Full TypeScript support
- **Parallel Queries** - Multiple queries run simultaneously

---

## 🔧 Configuration

The QueryClient is configured in `app/providers.tsx`:

```typescript
new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
});
```

---

## 📚 Mutation Options

All mutation hooks support these callbacks:

```typescript
mutation.mutate(data, {
  onSuccess: (data) => {
    // Handle success
  },
  onError: (error) => {
    // Handle error
  },
  onSettled: () => {
    // Always runs after success or error
  },
});
```

---

## 🚀 Query Properties

All query hooks return:

- `data` - The fetched data
- `isLoading` - Initial loading state
- `isFetching` - Background fetching state
- `error` - Error object if failed
- `refetch` - Manual refetch function

---

## 💡 Tips

1. **Always pass userId** - Most hooks require userId parameter
2. **Use `enabled` option** - Hooks auto-handle undefined userId
3. **Handle loading states** - Check `isLoading` before rendering
4. **Show feedback** - Use toast notifications for mutations
5. **Leverage cache** - Data persists across component remounts
