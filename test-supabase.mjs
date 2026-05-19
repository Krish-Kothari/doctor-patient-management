#!/usr/bin/env node

/**
 * Supabase Connection Test Script
 * Run this to verify your Supabase credentials are correct
 * 
 * Usage: node test-supabase.mjs
 */

import * as fs from 'fs';
import * as path from 'path';

console.log('🔍 Supabase Connection Test\n');

// Step 1: Check .env.local exists
console.log('1️⃣  Checking .env.local file...');
const envPath = path.join(process.cwd(), '.env.local');

if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local not found!');
  console.log('   Create it by running: cp .env.local.example .env.local\n');
  process.exit(1);
}
console.log('✅ .env.local found\n');

// Step 2: Load environment variables
console.log('2️⃣  Loading environment variables...');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const [key, ...valueParts] = trimmed.split('=');
    envVars[key.trim()] = valueParts.join('=').trim();
  }
});

const url = envVars['NEXT_PUBLIC_SUPABASE_URL'];
const anonKey = envVars['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

console.log(`✅ Loaded variables:`);
console.log(`   URL: ${url ? '✓' : '✗'}`);
console.log(`   Anon Key: ${anonKey ? '✓ (length: ' + anonKey.length + ')' : '✗'}\n`);

// Step 3: Validate format
console.log('3️⃣  Validating format...');

if (!url || url === 'https://your-project.supabase.co') {
  console.log('❌ NEXT_PUBLIC_SUPABASE_URL is missing or not configured');
  console.log('   Update .env.local with your actual Supabase URL\n');
  process.exit(1);
}

if (!anonKey || anonKey === 'your-anon-key-here') {
  console.log('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is missing or not configured');
  console.log('   Update .env.local with your actual Anon Key\n');
  process.exit(1);
}

if (!url.startsWith('https://') || !url.includes('supabase.co')) {
  console.log('❌ NEXT_PUBLIC_SUPABASE_URL format is invalid');
  console.log('   Should be: https://project-id.supabase.co\n');
  process.exit(1);
}

console.log('✅ Format validation passed\n');

// Step 4: Test connection
console.log('4️⃣  Testing connection to Supabase...');

try {
  const response = await fetch(`${url}/rest/v1/`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${anonKey}`,
      'Content-Type': 'application/json',
      'apikey': anonKey
    }
  });

  if (response.ok) {
    console.log('✅ Successfully connected to Supabase!\n');
  } else {
    console.log(`❌ Supabase responded with status ${response.status}`);
    console.log('   This might indicate invalid credentials.\n');
    process.exit(1);
  }
} catch (error) {
  console.log('❌ Failed to connect to Supabase');
  console.log(`   Error: ${error.message}\n`);
  process.exit(1);
}

// Step 5: Display summary
console.log('═══════════════════════════════════════');
console.log('✅ All checks passed!');
console.log('═══════════════════════════════════════\n');

console.log('Your Supabase configuration is ready to use.');
console.log('Run "npm run dev" to start the development server.\n');

console.log('Next steps:');
console.log('1. Run: npm run dev');
console.log('2. Open: http://localhost:3000');
console.log('3. Check browser console for any errors\n');
