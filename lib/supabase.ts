import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://yleeuwxywauqqzpwnfio.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsZWV1d3h5d2F1cXF6cHduZmlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5Nzk1MTQsImV4cCI6MjA2NjU1NTUxNH0.Tt0EaWsJvcVh1YMOiuAR7dXAOwCocyo2OPqGUnGNwlE'
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})