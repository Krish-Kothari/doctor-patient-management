#!/usr/bin/env node

/**
 * Create a new user in Supabase
 * Usage: node create-user.mjs
 */

import { createClient } from '@supabase/supabase-js';

const url = 'https://wnwnhtkorznjdogwsrgr.supabase.co';
const anonKey = 'sb_publishable_H6WqPEOpypp76WnlvBxlbw_leYnC_1l';

const supabase = createClient(url, anonKey);

const email = 'krishkothari1111@gmail.com';
const password = 'krishK1111';

console.log('🔐 Creating user account...\n');
console.log(`📧 Email: ${email}`);
console.log(`🔑 Password: ${password.replace(/./g, '*')}\n`);

try {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.log('❌ Error creating user:');
    console.log(`   ${error.message}\n`);
    process.exit(1);
  }

  if (data) {
    console.log('✅ User created successfully!\n');
    console.log('User Details:');
    console.log(`   ID: ${data.user?.id}`);
    console.log(`   Email: ${data.user?.email}`);
    console.log(`   Confirmed: ${data.user?.email_confirmed_at ? 'Yes' : 'No'}\n`);
    
    if (!data.user?.email_confirmed_at) {
      console.log('⚠️  Note: Check your email for a confirmation link.');
      console.log('   You may need to confirm your email before logging in.\n');
    }

    console.log('🎯 Next steps:');
    console.log('1. Run: npm run dev');
    console.log('2. Open: http://localhost:3000');
    console.log(`3. Login with: ${email}\n`);
  }
} catch (error) {
  console.log('❌ Failed to create user:');
  console.log(`   ${error.message}\n`);
  process.exit(1);
}
