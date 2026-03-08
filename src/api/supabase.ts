import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://afthuwngkptytvugwwoz.supabase.co';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmdGh1d25na3B0eXR2dWd3d296Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5ODA0OTIsImV4cCI6MjA4ODU1NjQ5Mn0.zA3e9oXD2DQ48IeiN2u02Rf7FutsFrAMWQVDfPv0_5k';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
