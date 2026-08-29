import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xsytiwshdqafsixptiqo.supabase.co'
const supabaseAnonKey = 'sb_publishable_Jz-Pmd4Bqmc11Z4ilBuVRQ_qMUJKGdb'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testSupabase() {
  console.log('--- SUPABASE INTEGRATION TEST ---')
  
  // Test 1: Insert a lead (Simulating a public user submitting the Order Project form)
  console.log('\nTesting: Public User INSERT to leads...')
  const mockLead = {
    full_name: 'Test Lead',
    email: 'test@example.com',
    business_name: 'Test Business',
    requirements: 'Need marketing help',
    status: 'New'
  }
  
  const { data: insertData, error: insertError } = await supabase
    .from('leads')
    .insert([mockLead])
    .select()

  if (insertError) {
    console.error('FAIL: Could not insert lead.', insertError.message)
  } else {
    console.log('PASS: Successfully inserted lead!', insertData)
  }

  // Test 2: Public user trying to SELECT leads (Should return empty due to RLS)
  console.log('\nTesting: Public User SELECT from leads (RLS check)...')
  const { data: selectData, error: selectError } = await supabase
    .from('leads')
    .select('*')

  if (selectError) {
    console.error('ERROR during select:', selectError.message)
  } else {
    if (selectData && selectData.length === 0) {
      console.log('PASS: RLS successfully blocked public SELECT (returned 0 rows).')
    } else {
      console.warn('WARNING: Public user was able to read leads! RLS might be misconfigured.', selectData)
    }
  }
}

testSupabase()
