#!/usr/bin/env tsx
/* cSpell:words auditRefs pa11y axe */

import { execSync, spawn, ChildProcess } from 'child_process';
import fs from 'fs';

const BASE_URL = 'http://localhost:3000';

console.log('🚀 Starting Complete Local SEO & Accessibility Testing...\n');

let serverProcess: ChildProcess | null = null;

// Cleanup function
function cleanup() {
  if (serverProcess) {
    console.log('\n🧹 Stopping server...');
    serverProcess.kill('SIGTERM');
    
    // Also kill any other processes on port 3000
    try {
      execSync('pkill -f "next.*start"', { stdio: 'ignore' });
    } catch {
      // Ignore if no processes found
    }
  }
  
  // Clean up test files
  try {
    execSync('rm -f lighthouse-*.json axe-*.json pa11y-*.json', { stdio: 'ignore' });
  } catch {
    // Ignore if files don't exist
  }
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n⚠️  Received SIGINT, cleaning up...');
  cleanup();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n⚠️  Received SIGTERM, cleaning up...');
  cleanup();
  process.exit(0);
});

// Start server and wait for it to be ready
function startServer(): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log('🚀 Starting Next.js server...');
    
    serverProcess = spawn('pnpm', ['start'], {
      stdio: 'pipe',
      detached: false
    });

    let serverReady = false;

    serverProcess.stdout?.on('data', (data) => {
      const output = data.toString();
      console.log('📝 Server output:', output.trim());
      
      if (!serverReady && (output.includes('Ready') || output.includes('Local:'))) {
        console.log('✅ Server is ready!\n');
        serverReady = true;
        resolve();
      }
    });

    serverProcess.stderr?.on('data', (data) => {
      const output = data.toString();
      console.log('⚠️  Server stderr:', output.trim());
      
      if (!serverReady && output.includes('EADDRINUSE')) {
        console.log('ℹ️  Port 3000 already in use, assuming server is running\n');
        serverReady = true;
        resolve();
      }
    });

    serverProcess.on('error', (error) => {
      reject(new Error(`Failed to start server: ${error.message}`));
    });

    // Timeout after 45 seconds
    setTimeout(() => {
      if (!serverReady) {
        reject(new Error('Server failed to start within 45 seconds'));
      }
    }, 45000);
  });
}

// Check if server is responding
async function waitForServer(): Promise<void> {
  console.log('⏳ Waiting for server to respond...');
  
  for (let i = 0; i < 30; i++) {
    try {
      execSync(`curl -f ${BASE_URL} > /dev/null 2>&1`, { stdio: 'ignore' });
      console.log('✅ Server is responding!\n');
      return;
    } catch {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  throw new Error('Server is not responding after 30 seconds');
}

// Run quick SEO test
async function quickSEOTest(): Promise<boolean> {
  console.log('🔍 Running quick SEO test...');
  
  try {
    // Test homepage only for speed
    execSync(`lighthouse ${BASE_URL} \
      --only-categories=seo \
      --output=json \
      --output-path=./lighthouse-quick-seo.json \
      --chrome-flags="--headless --no-sandbox --disable-dev-shm-usage" \
      --quiet`, { stdio: 'pipe' });

    const report = JSON.parse(fs.readFileSync('./lighthouse-quick-seo.json', 'utf8'));
    const seoScore = Math.round(report.categories.seo.score * 100);
    
    console.log(`   SEO Score: ${seoScore}%`);
    
    // Test robots.txt and sitemap
    execSync(`curl -f ${BASE_URL}/robots.txt > /dev/null 2>&1`);
    execSync(`curl -f ${BASE_URL}/sitemap.xml > /dev/null 2>&1`);
    
    console.log(`   ✅ robots.txt and sitemap.xml accessible`);
    
    if (seoScore >= 90) {
      console.log(`   ✅ SEO test passed`);
      return true;
    } else {
      console.log(`   ❌ SEO score below 90%`);
      return false;
    }
    
  } catch (error) {
    console.error(`   ❌ SEO test failed: ${(error as Error).message}`);
    return false;
  }
}

// Run quick accessibility test
async function quickA11yTest(): Promise<boolean> {
  console.log('♿ Running quick accessibility test...');
  
  try {
    // Test homepage with Lighthouse
    execSync(`lighthouse ${BASE_URL} \
      --only-categories=accessibility \
      --output=json \
      --output-path=./lighthouse-quick-a11y.json \
      --chrome-flags="--headless --no-sandbox --disable-dev-shm-usage" \
      --quiet`, { stdio: 'pipe' });

    const report = JSON.parse(fs.readFileSync('./lighthouse-quick-a11y.json', 'utf8'));
    const a11yScore = Math.round(report.categories.accessibility.score * 100);
    
    console.log(`   Accessibility Score: ${a11yScore}%`);
    
    // Quick axe test
    execSync(`axe ${BASE_URL} \
      --format=json \
      --output=./axe-quick-results.json \
      --chrome-options="--headless --no-sandbox --disable-dev-shm-usage"`, 
      { stdio: 'pipe' });

    const axeResults = JSON.parse(fs.readFileSync('./axe-quick-results.json', 'utf8'));
    const violations = axeResults.violations || [];
    
    console.log(`   axe Violations: ${violations.length}`);
    
    if (a11yScore >= 95 && violations.length === 0) {
      console.log(`   ✅ Accessibility test passed`);
      return true;
    } else {
      console.log(`   ❌ Accessibility issues found`);
      if (violations.length > 0) {
        console.log(`   Top violation: ${violations[0].id}`);
      }
      return false;
    }
    
  } catch (error) {
    console.error(`   ❌ Accessibility test failed: ${(error as Error).message}`);
    return false;
  }
}

// Main execution
async function main(): Promise<void> {
  try {
    // Start server
    await startServer();
    await waitForServer();

    // Run tests
    console.log('🧪 Running tests...\n');
    const [seoPass, a11yPass] = await Promise.all([
      quickSEOTest(),
      quickA11yTest()
    ]);

    // Results
    console.log('\n📊 Test Results');
    console.log('================');
    console.log(`SEO: ${seoPass ? '✅ Passed' : '❌ Failed'}`);
    console.log(`Accessibility: ${a11yPass ? '✅ Passed' : '❌ Failed'}`);
    
    const allPassed = seoPass && a11yPass;
    console.log(`\nOverall: ${allPassed ? '✅ All tests passed!' : '❌ Some tests failed'}`);
    
    if (!allPassed) {
      console.log('\n💡 For detailed analysis, run:');
      console.log('   pnpm run test:seo      # Detailed SEO testing');
      console.log('   pnpm run test:a11y     # Detailed accessibility testing');
    }
    
    cleanup();
    
    if (!allPassed) {
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ Testing failed:', (error as Error).message);
    cleanup();
    process.exit(1);
  }
}

main();