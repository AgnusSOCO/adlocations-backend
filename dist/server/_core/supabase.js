import { createClient } from '@supabase/supabase-js';
import { ENV } from './env.js';
if (!ENV.supabaseUrl || !ENV.supabaseServiceRoleKey) {
    throw new Error('Missing Supabase environment variables. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
}
export const supabaseAdmin = createClient(ENV.supabaseUrl, ENV.supabaseServiceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});
export const supabase = createClient(ENV.supabaseUrl, ENV.supabaseAnonKey || ENV.supabaseServiceRoleKey);
//# sourceMappingURL=supabase.js.map