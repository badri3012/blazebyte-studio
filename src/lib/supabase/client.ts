import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Sanitize URL to prevent PGRST125 errors if /rest/v1 is accidentally appended in Vercel env
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '') || '';

  return createBrowserClient(
    supabaseUrl,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
