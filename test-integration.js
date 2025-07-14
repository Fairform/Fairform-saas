// Create a test file: test-integration.js
// Run with: node test-integration.js

const axios = require('axios');

const testBackendIntegration = async () => {
  const baseUrl = 'http://localhost:3000';
  
  console.log('🧪 Testing Fairform Backend Integration...\n');

  // Test 1: Check if API endpoints are responding
  try {
    console.log('1️⃣ Testing API endpoints...');
    
    // Test generate endpoint (should return method not allowed for GET)
    const generateTest = await axios.get(`${baseUrl}/api/generate`).catch(err => err.response);
    console.log(`   /api/generate: ${generateTest.status === 405 ? '✅ PASS' : '❌ FAIL'}`);
    
    // Test user history endpoint (should return unauthorized without token)
    const historyTest = await axios.get(`${baseUrl}/api/user/history`).catch(err => err.response);
    console.log(`   /api/user/history: ${historyTest.status === 401 ? '✅ PASS' : '❌ FAIL'}`);
    
    // Test Stripe webhook endpoint
    const webhookTest = await axios.get(`${baseUrl}/api/stripe/webhook`).catch(err => err.response);
    console.log(`   /api/stripe/webhook: ${webhookTest.status === 405 ? '✅ PASS' : '❌ FAIL'}`);
    
  } catch (error) {
    console.log('❌ API endpoint test failed:', error.message);
  }

  // Test 2: Environment variables check
  console.log('\n2️⃣ Environment Variables Check:');
  const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'STRIPE_SECRET_KEY',
    'POCKETBOOK_LLM_API_URL'
  ];
  
  requiredEnvVars.forEach(envVar => {
    const isSet = process.env[envVar] ? '✅' : '❌';
    console.log(`   ${envVar}: ${isSet}`);
  });

  // Test 3: Module imports
  console.log('\n3️⃣ Testing module imports...');
  try {
    require('./lib/supabase');
    console.log('   ✅ Supabase client import successful');
    
    require('./utils/industrySchemas');
    console.log('   ✅ Industry schemas import successful');
    
    require('./schemas/generateSchema');
    console.log('   ✅ Validation schemas import successful');
    
  } catch (error) {
    console.log('   ❌ Module import failed:', error.message);
  }

  console.log('\n🎉 Integration test complete!');
  console.log('\n📋 Next Steps:');
  console.log('   1. Set up your Supabase database using the SQL provided');
  console.log('   2. Configure your environment variables');
  console.log('   3. Test document generation with a real Stripe session');
  console.log('   4. Update your frontend to call these new API endpoints');
};

// Usage instructions for your frontend integration
const frontendIntegrationExample = `
// Example: How to call the generate API from your existing frontend

const generateDocuments = async (formData) => {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        stripeSessionId: 'cs_test_...',  // From Stripe checkout
        businessName: formData.businessName,
        abn: formData.abn,
        logoUrl: formData.logoUrl,
        selectedIndustry: formData.industry,
        compliancePackType: 'pro',
        userId: user.id,  // From Supabase auth
        format: 'pdf',    // or 'docx'
        email: user.email
      })
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('Documents generated:', result.documents);
      // Show success message and download links
    } else {
      console.error('Generation failed:', result.error);
    }
  } catch (error) {
    console.error('API call failed:', error);
  }
};

// Example: Get user document history
const getUserHistory = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  
  const response = await fetch('/api/user/history', {
    headers: {
      'Authorization': \`Bearer \${session?.access_token}\`
    }
  });
  
  const history = await response.json();
  return history.documents;
};
`;

if (require.main === module) {
  testBackendIntegration();
}

module.exports = { testBackendIntegration, frontendIntegrationExample };