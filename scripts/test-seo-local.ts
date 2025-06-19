#!/usr/bin/env tsx
/* cSpell:words auditRefs */

import { execSync, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

interface LighthouseReport {
  categories: {
    seo: { score: number };
  };
  audits: Record<string, {
    id: string;
    title: string;
    score: number | null;
    displayValue?: string;
    explanation?: string;
  }>;
}

const BASE_URL = 'http://localhost:3000';
const PAGES_TO_TEST = [
  { name: 'Homepage', url: '' },
  { name: 'About', url: '/about' },
  { name: 'Blog Post', url: '/blog/my-first-peek-into-deep-learning' }
];

console.log('🔍 Starting Local SEO Testing...\n');

// Check if server is running
function isServerRunning(): boolean {
  try {
    execSync(`curl -f ${BASE_URL} > /dev/null 2>&1`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

// Start the Next.js server
function startServer(): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log('🚀 Starting Next.js server...');
    
    const server = spawn('pnpm', ['start'], {
      stdio: 'pipe',
      detached: false
    });

    server.stdout?.on('data', (data) => {
      const output = data.toString();
      if (output.includes('Ready') || output.includes('Local:')) {
        console.log('✅ Server is ready!\n');
        resolve();
      }
    });

    server.stderr?.on('data', (data) => {
      const output = data.toString();
      if (output.includes('EADDRINUSE')) {
        console.log('ℹ️  Server already running on port 3000\n');
        resolve();
      }
    });

    // Timeout after 30 seconds
    setTimeout(() => {
      reject(new Error('Server failed to start within 30 seconds'));
    }, 30000);
  });
}

// Run Lighthouse SEO audit
async function runLighthouseSEO(pageName: string, url: string): Promise<number> {
  const fullUrl = `${BASE_URL}${url}`;
  const outputPath = `./lighthouse-${pageName.toLowerCase().replace(' ', '-')}-seo.json`;
  
  try {
    console.log(`🔍 Testing ${pageName}: ${fullUrl}`);
    
    execSync(`lighthouse "${fullUrl}" \
      --only-categories=seo \
      --output=json \
      --output-path="${outputPath}" \
      --chrome-flags="--headless --no-sandbox --disable-dev-shm-usage" \
      --quiet`, { stdio: 'pipe' });

    const report: LighthouseReport = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
    const seoScore = Math.round(report.categories.seo.score * 100);
    
    console.log(`   SEO Score: ${seoScore}%`);
    
    if (seoScore < 90) {
      console.log(`   ❌ Score below 90% threshold`);
      
      // Show failed audits
      const failedAudits = Object.values(report.audits)
        .filter(audit => audit.score !== null && audit.score < 1)
        .slice(0, 5); // Show top 5 issues
      
      if (failedAudits.length > 0) {
        console.log(`   Issues found:`);
        failedAudits.forEach(audit => {
          console.log(`     - ${audit.title}`);
        });
      }
    } else {
      console.log(`   ✅ Good SEO score`);
    }
    
    return seoScore;
  } catch (error) {
    console.error(`   ❌ Failed to test ${pageName}:`, (error as Error).message);
    return 0;
  }
}

// Test essential SEO endpoints
function testSEOEndpoints(): boolean {
  console.log('🔍 Testing SEO endpoints...');
  
  const endpoints = [
    { name: 'robots.txt', url: '/robots.txt' },
    { name: 'sitemap.xml', url: '/sitemap.xml' },
    { name: 'manifest', url: '/manifest.webmanifest' }
  ];
  
  let allPassed = true;
  
  endpoints.forEach(({ name, url }) => {
    try {
      execSync(`curl -f "${BASE_URL}${url}" > /dev/null 2>&1`, { stdio: 'ignore' });
      console.log(`   ✅ ${name} accessible`);
    } catch {
      console.log(`   ❌ ${name} not accessible`);
      allPassed = false;
    }
  });
  
  return allPassed;
}

// Get blog post URL from index
function getBlogPostUrl(): string {
  try {
    const blogIndexPath = path.join(process.cwd(), 'content', 'blog-index.json');
    if (fs.existsSync(blogIndexPath)) {
      const blogIndex = JSON.parse(fs.readFileSync(blogIndexPath, 'utf8'));
      if (blogIndex.length > 0) {
        return `/blog/${blogIndex[0].slug}`;
      }
    }
  } catch (error) {
    console.warn('Could not read blog index, using default URL');
  }
  return '/blog/my-first-peek-into-deep-learning';
}

// Main execution
async function main(): Promise<void> {
  try {
    // Update blog post URL
    PAGES_TO_TEST[2].url = getBlogPostUrl();
    
    // Check if server is running, start if needed
    if (!isServerRunning()) {
      await startServer();
      // Give server time to fully start
      await new Promise(resolve => setTimeout(resolve, 3000));
    } else {
      console.log('ℹ️  Server already running\n');
    }

    // Test SEO endpoints
    const endpointsOk = testSEOEndpoints();
    console.log('');

    // Run Lighthouse tests
    const scores: number[] = [];
    for (const page of PAGES_TO_TEST) {
      const score = await runLighthouseSEO(page.name, page.url);
      scores.push(score);
      console.log('');
    }

    // Summary
    console.log('📊 SEO Test Summary');
    console.log('==================');
    
    PAGES_TO_TEST.forEach((page, index) => {
      const score = scores[index];
      const status = score >= 90 ? '✅' : '❌';
      console.log(`${status} ${page.name}: ${score}%`);
    });
    
    const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const allPassed = scores.every(score => score >= 90) && endpointsOk;
    
    console.log(`\nAverage SEO Score: ${avgScore}%`);
    console.log(`Endpoints: ${endpointsOk ? '✅ All accessible' : '❌ Some failed'}`);
    console.log(`\nOverall: ${allPassed ? '✅ All tests passed!' : '❌ Some tests failed'}`);
    
    // Cleanup
    console.log('\n🧹 Cleaning up...');
    try {
      execSync('rm lighthouse-*-seo.json', { stdio: 'ignore' });
    } catch {
      // Files may not exist
    }
    
    if (!allPassed) {
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ SEO testing failed:', (error as Error).message);
    process.exit(1);
  }
}

main();