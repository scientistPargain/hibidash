# Project Architecture

This document describes the organized folder structure for the HibiDash project.

## Folder Structure

```
├── apis/              # API service layer
├── models/            # TypeScript interfaces and types
├── utils/             # Utility functions and helpers
├── components/        # React components
├── app/              # Next.js app router pages
└── lib/              # Third-party library configurations
```

## 📁 APIs Folder (`/apis`)

Contains all API service functions organized by domain.

### Files:

- **auth.api.ts** - Authentication services (login, signup, signout)
- **user.api.ts** - User settings management
- **anime.api.ts** - Anime tracker CRUD operations
- **todo.api.ts** - Todo list management
- **spending.api.ts** - Spending tracker operations
- **health.api.ts** - Health metrics tracking
- **index.ts** - Barrel export for all APIs

### Usage Example:

```typescript
import { authService, animeService } from "@/apis";

// Sign in
const { data, error } = await authService.signIn(email, password);

// Load anime list
const { data: animeList } = await animeService.getAnimeList(userId);
```

## 📁 Models Folder (`/models`)

Contains all TypeScript interfaces and type definitions.

### Files:

- **user.model.ts** - User and UserSettings interfaces
- **anime.model.ts** - AnimeEntry interface and types
- **todo.model.ts** - TodoItem interface and types
- **spending.model.ts** - SpendingEntry interface
- **health.model.ts** - HealthMetric interface
- **index.ts** - Barrel export for all models

### Usage Example:

```typescript
import { AnimeEntry, TodoItem, UserSettings } from "@/models";

const anime: AnimeEntry = {
  id: "123",
  user_id: "user_123",
  title: "My Anime",
  status: "watching",
  // ...
};
```

## 📁 Utils Folder (`/utils`)

Contains utility functions and helper methods.

### Files:

- **helpers.ts** - General utility functions (formatDate, formatCurrency, etc.)
- **validation.ts** - Input validation functions
- **toast.ts** - Toast notification helpers
- **index.ts** - Barrel export for all utilities

### Usage Example:

```typescript
import { formatCurrency, isValidEmail, showSuccess } from "@/utils";

const price = formatCurrency(49.99); // "$49.99"
const valid = isValidEmail("user@example.com"); // true
showSuccess("Operation completed!");
```

## Migration Guide

### Before (Old Structure):

```typescript
// Inline API calls in components
const { data } = await supabase.from("anime_entries").select("*");

// Inline interfaces
interface AnimeEntry {
  id: string;
  title: string;
  // ...
}
```

### After (New Structure):

```typescript
// Import from organized services
import { animeService } from "@/apis";
import { AnimeEntry } from "@/models";

// Use service methods
const { data } = await animeService.getAnimeList(userId);
```

## Benefits

✅ **Separation of Concerns** - Business logic separated from UI
✅ **Reusability** - API functions can be used across components
✅ **Type Safety** - Centralized type definitions
✅ **Maintainability** - Easy to find and update code
✅ **Testability** - Services can be easily mocked for testing
✅ **Scalability** - Clear structure for adding new features

## Next Steps

To use this new structure in your components:

1. Import types from `@/models`
2. Import API services from `@/apis`
3. Import utilities from `@/utils`
4. Remove inline API calls and interfaces
5. Replace with imported services and types
