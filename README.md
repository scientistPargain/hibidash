# HibiDash - Personal Dashboard Application

A customizable personal dashboard built with Next.js and Supabase that helps you track anime, get daily inspiration, monitor spending goals, manage tasks, track health metrics, and includes mini-games and productivity timers.

## Features

✨ **Feature Highlights:**

- 🎬 **Anime Tracker** - Log and track your anime watching progress
- 💡 **Daily Inspiration** - Get motivational quotes and fun facts
- 💰 **Spending Tracker** - Monitor expenses and set budget goals
- ✅ **To-Do List** - Manage tasks with priority levels
- 🏃 **Health Tracker** - Log daily health metrics (steps, sleep, water intake)
- 🎮 **Mini Games & Timer** - Pomodoro timer for productivity
- ⚙️ **Customizable Settings** - Enable/disable widgets as needed
- 🔐 **User Authentication** - Secure login with Supabase Auth
- 📱 **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

- **Frontend:** Next.js 15, React, TypeScript, Tailwind CSS
- **Backend:** Supabase (Authentication, Database, Row Level Security)
- **UI Icons:** Lucide React
- **Deployment:** Vercel (recommended)

## Setup Instructions

### 1. Clone the Repository

```bash
cd /path/to/your/projects
git clone <your-repo-url>
cd hibidash
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Go to [Supabase](https://supabase.com) and create a new project
2. Once your project is created, go to **Settings > API** and copy:

   - Project URL
   - Anon/Public Key

3. Create the database tables by running the SQL in `supabase-schema.sql`:
   - Go to your Supabase project dashboard
   - Navigate to **SQL Editor**
   - Copy and paste the contents of `supabase-schema.sql`
   - Click **Run** to execute the SQL

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory (already created, just update values):

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Replace the values with your actual Supabase credentials.

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
hibidash/
├── app/
│   ├── page.tsx              # Login/signup page
│   ├── dashboard/
│   │   └── page.tsx          # Main dashboard
│   └── settings/
│       └── page.tsx          # Settings page
├── components/
│   ├── AuthForm.tsx          # Authentication component
│   └── widgets/
│       ├── AnimeTracker.tsx
│       ├── DailyInspiration.tsx
│       ├── SpendingTracker.tsx
│       ├── TodoList.tsx
│       ├── HealthTracker.tsx
│       └── MiniGames.tsx
├── lib/
│   └── supabase.ts           # Supabase client configuration
├── types/
│   ├── database.ts           # Database types
│   └── index.ts              # Shared types
├── public/                   # Static assets
├── supabase-schema.sql       # Database schema
└── .env.local               # Environment variables
```

## Usage Guide

### Getting Started

1. **Sign Up**: Create an account with your email and password
2. **Dashboard**: After login, you'll see your personalized dashboard
3. **Customize**: Click **Settings** to enable/disable widgets
4. **Start Tracking**: Begin using each widget to track your data

### Widget Features

#### 🎬 Anime Tracker

- Add anime titles you're watching
- Mark status: Plan to Watch, Watching, Completed
- Delete entries you no longer need

#### 💡 Daily Inspiration

- Get random motivational quotes or fun facts
- Click refresh to get new content
- Perfect for daily motivation

#### 💰 Spending Tracker

- Log expenses with amount, category, and description
- View total spending at a glance
- Track spending by category

#### ✅ To-Do List

- Add tasks with priority levels (Low, Medium, High)
- Mark tasks as complete
- Delete completed or unwanted tasks

#### 🏃 Health Tracker

- Log daily steps, sleep hours, and water intake
- View progress with visual indicators
- Track trends over time

#### 🎮 Mini Games & Timer

- Use Pomodoro timer for productivity (25/5/15 min)
- Play/pause and reset functionality
- More games coming soon!

## Database Schema

The application uses the following Supabase tables:

- `user_settings` - User preferences and widget settings
- `anime_entries` - Anime tracking data
- `spending_entries` - Expense records
- `spending_goals` - Budget goals by category
- `todo_items` - Task list
- `health_metrics` - Daily health data

All tables have Row Level Security (RLS) enabled to ensure users can only access their own data.

## Future Enhancements

- 🎨 Drag-and-drop widget layout customization
- 📊 Advanced analytics and charts
- 🎲 Additional mini-games (Sudoku, Wordle)
- 🌙 Dark mode theme
- 📱 Progressive Web App (PWA) support
- 🔔 Push notifications for reminders
- 📤 Data export/import functionality
- 🤝 Social features (share achievements)

## Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Adding New Widgets

1. Create a new component in `components/widgets/`
2. Add database tables if needed in `supabase-schema.sql`
3. Update `types/database.ts` with new types
4. Add widget to `app/dashboard/page.tsx`
5. Add enable/disable toggle in `app/settings/page.tsx`
6. Add corresponding field in `user_settings` table

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables (Supabase URL and Key)
5. Deploy!

The app will be live at your Vercel URL.

## Troubleshooting

**Issue: "Invalid API key"**

- Ensure your `.env.local` file has the correct Supabase credentials
- Restart the development server after changing environment variables

**Issue: "Database error"**

- Make sure you've run the SQL schema in Supabase
- Check that Row Level Security policies are properly set up

**Issue: "Cannot read properties of null"**

- Ensure you're logged in
- Check browser console for specific errors

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open an issue on GitHub.

---

**Built with ❤️ using Next.js and Supabase**

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
