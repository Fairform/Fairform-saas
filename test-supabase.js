const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function testSupabase() {
  console.log('🔍 Testing Supabase connection...\n');
  
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  // Test 1: Environment variables
  console.log('1️⃣ Environment Variables:');
  console.log('   URL:', url ? '✅ Set' : '❌ Missing');
  console.log('   Key:', key ? '✅ Set' : '❌ Missing');
  console.log('   URL format:', url?.includes('gogxrrgfuxphobxjtpjj') ? '✅ Correct' : '❌ Wrong');
  
  if (!url || !key) {
    console.log('\n❌ Environment variables not set properly');
    return;
  }
  
  // Test 2: Client creation
  console.log('\n2️⃣ Client Creation:');
  try {
    const supabase = createClient(url, key);
    console.log('   ✅ Supabase client created');
    
    // Test 3: Connection
    console.log('\n3️⃣ Connection Test:');
    const { error } = await supabase.auth.getSession();
    if (error) {
      console.log('   ❌ Connection error:', error.message);
    } else {
      console.log('   ✅ Connected successfully');
    }
    
    // Test 4: Database access
    console.log('\n4️⃣ Database Test:');
    try {
      const { data, error: dbError } = await supabase
        .from('user_documents')
        .select('count')
        .limit(1);
      
      if (dbError) {
        if (dbError.message.includes('relation "user_documents" does not exist')) {
          console.log('   ⚠️  Tables not created yet - run the database setup SQL');
        } else {
          console.log('   ❌ Database error:', dbError.message);
        }
      } else {
        console.log('   ✅ Database tables accessible');
      }
    } catch (err) {
      console.log('   ❌ Database test failed:', err.message);
    }
    
    // Test 5: Auth test
    console.log('\n5️⃣ Auth Test:');
    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: 'test@example.com',
        password: 'testpassword123'
      });
      
      if (authError) {
        if (authError.message.includes('User already registered')) {
          console.log('   ✅ Auth working (user exists)');
        } else {
          console.log('   ⚠️  Auth issue:', authError.message);
        }
      } else {
        console.log('   ✅ Auth working (test user created)');
      }
    } catch (err) {
      console.log('   ❌ Auth test failed:', err.message);
    }
    
  } catch (error) {
    console.log('   ❌ Client creation failed:', error.message);
  }
  
  console.log('\n🎯 SUMMARY:');
  console.log('===========');
  console.log('If you see mostly ✅ above, your Supabase is ready!');
  console.log('If you see ❌ or ⚠️, check the setup instructions.');
}

testSupabase().catch(console.error);
