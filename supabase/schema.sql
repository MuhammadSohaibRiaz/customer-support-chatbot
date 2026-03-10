-- Supabase Schema for AI Customer Support Chatbot Platform

-- 1. Profiles Table (extends Supabase Auth)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  company_name TEXT NOT NULL,
  website_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. Chatbots Table (One per business)
CREATE TABLE public.chatbots (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  greeting_message TEXT DEFAULT 'Hi! How can I help you today?',
  theme_color TEXT DEFAULT '#0f172a',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.chatbots ENABLE ROW LEVEL SECURITY;

-- 3. Training Data Table (FAQ, Documents, Website)
CREATE TABLE public.training_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  chatbot_id UUID REFERENCES public.chatbots(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('faq', 'document', 'website')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.training_data ENABLE ROW LEVEL SECURITY;

-- 4. Conversations Table (Chat sessions)
CREATE TABLE public.conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  chatbot_id UUID REFERENCES public.chatbots(id) ON DELETE CASCADE NOT NULL,
  visitor_name TEXT,
  visitor_email TEXT,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'resolved', 'lead')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

-- 5. Messages Table (Individual messages in a conversation)
CREATE TABLE public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- 6. Leads Table (Captured leads)
CREATE TABLE public.leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  chatbot_id UUID REFERENCES public.chatbots(id) ON DELETE CASCADE NOT NULL,
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- ROW LEVEL SECURITY (RLS) POLICIES

-- Profiles: Users can view and update their own profile
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Chatbots: Users can CRUD their own chatbots
CREATE POLICY "Users can manage own chatbots" ON public.chatbots FOR ALL USING (auth.uid() = user_id);
-- Public can read chatbots for the widget
CREATE POLICY "Public can view chatbots" ON public.chatbots FOR SELECT USING (true);

-- Training Data: Users can CRUD own training data
CREATE POLICY "Users can manage own training data" ON public.training_data FOR ALL 
USING (
  chatbot_id IN (SELECT id FROM public.chatbots WHERE user_id = auth.uid())
);

-- Conversations: Users can CRUD own conversations
CREATE POLICY "Users can manage own conversations" ON public.conversations FOR ALL 
USING (
  chatbot_id IN (SELECT id FROM public.chatbots WHERE user_id = auth.uid())
);
-- Public can insert new conversations via widget
CREATE POLICY "Public can insert conversations" ON public.conversations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can view own conversations" ON public.conversations FOR SELECT USING (true);

-- Messages: Users can CRUD own messages
CREATE POLICY "Users can manage own messages" ON public.messages FOR ALL 
USING (
  conversation_id IN (SELECT c.id FROM public.conversations c JOIN public.chatbots cb ON c.chatbot_id = cb.id WHERE cb.user_id = auth.uid())
);
-- Public can insert messages via widget
CREATE POLICY "Public can insert messages" ON public.messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can view own messages" ON public.messages FOR SELECT USING (true);

-- Leads: Users can CRUD own leads
CREATE POLICY "Users can manage own leads" ON public.leads FOR ALL 
USING (
  chatbot_id IN (SELECT id FROM public.chatbots WHERE user_id = auth.uid())
);
-- Public can insert new leads via widget
CREATE POLICY "Public can insert leads" ON public.leads FOR INSERT WITH CHECK (true);

-- Function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, company_name)
  VALUES (new.id, split_part(new.email, '@', 1));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
