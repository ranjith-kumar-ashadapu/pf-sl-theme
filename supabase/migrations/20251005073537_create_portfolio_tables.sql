/*
  # Create Portfolio Management System

  1. New Tables
    - `profile`
      - `id` (uuid, primary key)
      - `name` (text)
      - `title` (text)
      - `level` (integer)
      - `hp` (integer)
      - `max_hp` (integer)
      - `avatar` (text)
      - `about` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `skills`
      - `id` (uuid, primary key)
      - `name` (text)
      - `level` (integer)
      - `order_index` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `education`
      - `id` (uuid, primary key)
      - `degree` (text)
      - `institution` (text)
      - `years` (text)
      - `level_gain` (integer, nullable)
      - `order_index` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `experience`
      - `id` (uuid, primary key)
      - `title` (text)
      - `company` (text)
      - `period` (text)
      - `description` (text, nullable)
      - `order_index` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `tech_stack` (text array)
      - `status` (text)
      - `progress` (integer)
      - `role` (text, nullable)
      - `order_index` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `achievements`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `order_index` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `social_links`
      - `id` (uuid, primary key)
      - `linkedin` (text)
      - `github` (text)
      - `email` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users (admin) to manage all data
    - Add policies for public users to read all data
*/

-- Create profile table
CREATE TABLE IF NOT EXISTS profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  title text NOT NULL DEFAULT '',
  level integer NOT NULL DEFAULT 1,
  hp integer NOT NULL DEFAULT 1000,
  max_hp integer NOT NULL DEFAULT 1000,
  avatar text NOT NULL DEFAULT '',
  about text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  level integer NOT NULL DEFAULT 0,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create education table
CREATE TABLE IF NOT EXISTS education (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  degree text NOT NULL,
  institution text NOT NULL,
  years text NOT NULL,
  level_gain integer,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create experience table
CREATE TABLE IF NOT EXISTS experience (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  period text NOT NULL,
  description text,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  tech_stack text[] NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'Ongoing',
  progress integer NOT NULL DEFAULT 0,
  role text,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create social_links table
CREATE TABLE IF NOT EXISTS social_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  linkedin text NOT NULL DEFAULT '',
  github text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Anyone can read profile"
  ON profile FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can read skills"
  ON skills FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can read education"
  ON education FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can read experience"
  ON experience FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can read projects"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can read achievements"
  ON achievements FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can read social_links"
  ON social_links FOR SELECT
  TO anon, authenticated
  USING (true);

-- Admin write policies (authenticated users can manage)
CREATE POLICY "Authenticated users can insert profile"
  ON profile FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update profile"
  ON profile FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete profile"
  ON profile FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert skills"
  ON skills FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update skills"
  ON skills FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete skills"
  ON skills FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert education"
  ON education FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update education"
  ON education FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete education"
  ON education FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert experience"
  ON experience FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update experience"
  ON experience FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete experience"
  ON experience FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert achievements"
  ON achievements FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update achievements"
  ON achievements FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete achievements"
  ON achievements FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert social_links"
  ON social_links FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update social_links"
  ON social_links FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete social_links"
  ON social_links FOR DELETE
  TO authenticated
  USING (true);
