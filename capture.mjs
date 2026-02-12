import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = 'http://localhost:5174';

const screens = [
  { name: '01-splash', path: '/', wait: 500 },
  { name: '02-consent', path: '/onboarding/consent', wait: 500 },
  { name: '03-profile', path: '/onboarding/profile', wait: 500 },
  { name: '04-tutorial', path: '/onboarding/tutorial', wait: 500 },
  { name: '05-child-home', path: '/child', wait: 500 },
  { name: '06-category-space', path: '/child/explore/space', wait: 500 },
  { name: '07-story-detail', path: '/child/story/story-1', wait: 500 },
  { name: '08-ai-dialogue', path: '/child/dialogue/story-1', wait: 2000 },
  { name: '09-completion', path: '/child/complete/story-1', wait: 500 },
  { name: '10-stamps', path: '/child/my-space', wait: 500 },
  { name: '11-parent-dashboard', path: '/parent', wait: 500 },
  { name: '12-weekly-report', path: '/parent/report', wait: 500 },
  { name: '13-settings', path: '/parent/settings', wait: 500 },
];

async function main() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Tablet landscape viewport
  await page.setViewport({ width: 1024, height: 768 });

  for (const screen of screens) {
    console.log(`Capturing ${screen.name}...`);
    await page.goto(`${BASE}${screen.path}`, { waitUntil: 'networkidle0', timeout: 10000 }).catch(() => {});
    await new Promise(r => setTimeout(r, screen.wait));
    await page.screenshot({
      path: path.join(__dirname, `${screen.name}.png`),
      fullPage: false,
    });
    console.log(`  Done: ${screen.name}.png`);
  }

  await browser.close();
  console.log('\nAll screenshots captured!');
}

main().catch(console.error);
