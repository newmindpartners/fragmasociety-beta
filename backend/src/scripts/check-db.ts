/**
 * Quick database check script
 */
import { prisma } from '../db/prisma.js';

async function checkDatabase() {
  console.log('🔍 Checking database tables...\n');
  
  // Check users table
  try {
    const userCount = await prisma.user.count();
    console.log('✅ users table exists, count:', userCount);
    
    // List all users
    const users = await prisma.user.findMany({ take: 10 });
    if (users.length > 0) {
      console.log('   Users:');
      users.forEach(u => console.log(`   - ${u.email} (${u.id})`));
    }
  } catch (e: any) {
    console.log('❌ users table error:', e.message);
  }
  
  // Check wallets table
  try {
    const walletCount = await prisma.wallet.count();
    console.log('✅ wallets table exists, count:', walletCount);
  } catch (e: any) {
    console.log('❌ wallets table error:', e.message);
  }
  
  // Check deals table
  try {
    const dealCount = await prisma.deal.count();
    console.log('✅ deals table exists, count:', dealCount);
  } catch (e: any) {
    console.log('❌ deals table error:', e.message);
  }
  
  // Check early_access_submissions
  try {
    const eaCount = await prisma.earlyAccessSubmission.count();
    console.log('✅ early_access_submissions table exists, count:', eaCount);
  } catch (e: any) {
    console.log('❌ early_access_submissions table error:', e.message);
  }
  
  await prisma.$disconnect();
}

checkDatabase()
  .then(() => console.log('\n✨ Database check complete!'))
  .catch(e => {
    console.error('Error:', e);
    process.exit(1);
  });
