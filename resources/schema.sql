CREATE TABLE IF NOT EXISTS events (
  event_id uuid PRIMARY KEY,
  tenant_id uuid NOT NULL,
  event_type text NOT NULL,
  publication_time timestamptz NOT NULL,
  payload jsonb NOT NULL
);