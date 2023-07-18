import { createClient } from "@refinedev/supabase";

// const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_KEY } = process.env;

export const supabaseClient = createClient(
  "https://ispkmneeyrolkbhatdes.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzcGttbmVleXJvbGtiaGF0ZGVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc3OTgzNzAsImV4cCI6MjAwMzM3NDM3MH0.dA9nZ-4sRvtSLVu2ElptA6sW3yO0zR8CEscxwYSLjds",
  {
    db: {
      schema: "public",
    },
    auth: {
      persistSession: true,
    },
  }
);
