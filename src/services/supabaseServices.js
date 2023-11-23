import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createClient} from '@supabase/supabase-js';

const supabaseUrl = 'https://jfgtrjzzbddyoxyrskwd.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmZ3Ryanp6YmRkeW94eXJza3dkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA2MzQyNzYsImV4cCI6MjAxNjIxMDI3Nn0.NcQxBmOiFhmD9WVySvwi902avZtb6CSTt18py0OM9r0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
