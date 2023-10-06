import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sxnmelktycywskodrejx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4bm1lbGt0eWN5d3Nrb2RyZWp4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NDI3MzAwMCwiZXhwIjoyMDA5ODQ5MDAwfQ.ddvsW752qcakxFPES09vvHchebt3Q1RV2uztgCex36g";

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
