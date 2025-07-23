-- Core tables for universal backend
CREATE TABLE projects (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name TEXT NOT NULL,
  api_key TEXT UNIQUE NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('demo', 'user', 'master')),
  user_lunarcrush_key TEXT,
  settings TEXT DEFAULT '{}',
  created_at INTEGER DEFAULT (unixepoch()),
  expires_at INTEGER,
  is_active INTEGER DEFAULT 1
);

CREATE TABLE api_usage (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  project_id TEXT REFERENCES projects(id),
  endpoint TEXT NOT NULL,
  method TEXT NOT NULL,
  status_code INTEGER NOT NULL,
  response_time_ms INTEGER,
  timestamp INTEGER DEFAULT (unixepoch()),
  client_ip TEXT,
  user_agent TEXT
);

-- Indexes for performance
CREATE INDEX idx_projects_api_key ON projects(api_key);
CREATE INDEX idx_projects_tier ON projects(tier);
CREATE INDEX idx_projects_active ON projects(is_active);
CREATE INDEX idx_usage_project_timestamp ON api_usage(project_id, timestamp);
CREATE INDEX idx_usage_endpoint ON api_usage(endpoint);

-- Insert demo project for testing
INSERT INTO projects (name, api_key, tier, user_lunarcrush_key, expires_at) 
VALUES (
  'Demo Project', 
  'demo_' || lower(hex(randomblob(16))), 
  'demo',
  NULL,
  unixepoch() + 604800  -- 7 days from now
);
