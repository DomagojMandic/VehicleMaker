import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jyghtfnpotoepbhjttis.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5Z2h0Zm5wb3RvZXBiaGp0dGlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MTkyNzAsImV4cCI6MjA3NDI5NTI3MH0.u2iv7FXgVFaOhUAIUyvPeDNBQPhg2AQbsmQ1VtYtSTg';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
