-- Create user_settings table
CREATE TABLE user_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    anime_tracker_enabled BOOLEAN DEFAULT true,
    daily_inspiration_enabled BOOLEAN DEFAULT true,
    spending_tracker_enabled BOOLEAN DEFAULT true,
    todo_list_enabled BOOLEAN DEFAULT true,
    health_tracker_enabled BOOLEAN DEFAULT true,
    mini_games_enabled BOOLEAN DEFAULT true,
    layout JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Create anime_entries table
CREATE TABLE anime_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    status TEXT CHECK (status IN ('watching', 'completed', 'plan_to_watch')) DEFAULT 'plan_to_watch',
    episodes_watched INTEGER DEFAULT 0,
    total_episodes INTEGER DEFAULT 12,
    rating INTEGER CHECK (rating >= 1 AND rating <= 10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create spending_entries table
CREATE TABLE spending_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create spending_goals table
CREATE TABLE spending_goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    category TEXT NOT NULL,
    monthly_limit DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, category)
);

-- Create todo_items table
CREATE TABLE todo_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT false,
    priority TEXT CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
    due_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create health_metrics table
CREATE TABLE health_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    date DATE NOT NULL,
    steps INTEGER,
    sleep_hours DECIMAL(3,1),
    water_intake DECIMAL(3,1),
    weight DECIMAL(5,2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, date)
);

-- Enable Row Level Security (RLS)
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE anime_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE spending_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE spending_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE todo_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_metrics ENABLE ROW LEVEL SECURITY;

-- Create policies for user_settings
CREATE POLICY "Users can view their own settings" ON user_settings
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own settings" ON user_settings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own settings" ON user_settings
    FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for anime_entries
CREATE POLICY "Users can view their own anime entries" ON anime_entries
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own anime entries" ON anime_entries
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own anime entries" ON anime_entries
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own anime entries" ON anime_entries
    FOR DELETE USING (auth.uid() = user_id);

-- Create policies for spending_entries
CREATE POLICY "Users can view their own spending entries" ON spending_entries
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own spending entries" ON spending_entries
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own spending entries" ON spending_entries
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own spending entries" ON spending_entries
    FOR DELETE USING (auth.uid() = user_id);

-- Create policies for spending_goals
CREATE POLICY "Users can view their own spending goals" ON spending_goals
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own spending goals" ON spending_goals
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own spending goals" ON spending_goals
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own spending goals" ON spending_goals
    FOR DELETE USING (auth.uid() = user_id);

-- Create policies for todo_items
CREATE POLICY "Users can view their own todos" ON todo_items
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own todos" ON todo_items
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own todos" ON todo_items
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own todos" ON todo_items
    FOR DELETE USING (auth.uid() = user_id);

-- Create policies for health_metrics
CREATE POLICY "Users can view their own health metrics" ON health_metrics
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own health metrics" ON health_metrics
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own health metrics" ON health_metrics
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own health metrics" ON health_metrics
    FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_user_settings_user_id ON user_settings(user_id);
CREATE INDEX idx_anime_entries_user_id ON anime_entries(user_id);
CREATE INDEX idx_spending_entries_user_id ON spending_entries(user_id);
CREATE INDEX idx_spending_entries_date ON spending_entries(date);
CREATE INDEX idx_spending_goals_user_id ON spending_goals(user_id);
CREATE INDEX idx_todo_items_user_id ON todo_items(user_id);
CREATE INDEX idx_health_metrics_user_id ON health_metrics(user_id);
CREATE INDEX idx_health_metrics_date ON health_metrics(date);
