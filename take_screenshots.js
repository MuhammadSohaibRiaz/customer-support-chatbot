const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

const SCRIPTS_DIR = path.join(__dirname, 'screenshots');

if (!fs.existsSync(SCRIPTS_DIR)) {
    fs.mkdirSync(SCRIPTS_DIR);
}

const pagesToScreenshot = [
    { name: 'landing_desktop', path: '/', isMobile: false },
    { name: 'landing_mobile', path: '/', isMobile: true },
    { name: 'login_desktop', path: '/login', isMobile: false },
    { name: 'signup_desktop', path: '/signup', isMobile: false },
    { name: 'dashboard_overview_desktop', path: '/dashboard', isMobile: false },
    { name: 'dashboard_overview_mobile', path: '/dashboard', isMobile: true },
    { name: 'conversations_desktop', path: '/conversations', isMobile: false },
    { name: 'leads_desktop', path: '/leads', isMobile: false },
    { name: 'training_data_desktop', path: '/training', isMobile: false },
    { name: 'widget_settings_desktop', path: '/widget', isMobile: false },
    { name: 'analytics_desktop', path: '/analytics', isMobile: false },
];

async function takeScreenshots() {
    console.log('Starting screenshot generation process...');

    // Launch browser
    const browser = await puppeteer.launch({
        headless: "new"
    });

    const page = await browser.newPage();

    for (const item of pagesToScreenshot) {
        console.log(`Taking screenshot for ${item.name}...`);

        if (item.isMobile) {
            await page.setViewport({ width: 390, height: 844 }); // iPhone 12 Pro dimensions
            // Emulate mobile user agent for accurate rendering
            await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1');
        } else {
            await page.setViewport({ width: 1440, height: 900 }); // Standard desktop
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
        }

        try {
            await page.goto(`${BASE_URL}${item.path}`, {
                waitUntil: 'networkidle0', // Wait for network requests to finish settling
                timeout: 15000
            });

            // If we are on the desktop conversations page, click the first conversation item
            if (item.name === 'conversations_desktop') {
                try {
                    // Wait for the conversation list to load
                    await page.waitForSelector('ul li button, .hover\\:bg-slate-800\\/80', { timeout: 5000 });
                    // Click the first conversation in the list
                    const conversationItems = await page.$$('.hover\\:bg-slate-800\\/80');
                    if (conversationItems.length > 0) {
                        await conversationItems[0].click();
                        // wait a bit for the right pane to render
                        await new Promise(r => setTimeout(r, 500));
                    }
                } catch (e) {
                    console.log('Could not click first conversation:', e.message);
                }
            }

            // Wait specifically to ensure Recharts animations and Tailwind classes calculate
            await new Promise(r => setTimeout(r, 4500));

            const filePath = path.join(SCRIPTS_DIR, `${item.name}.png`);

            await page.screenshot({
                path: filePath,
                fullPage: true // Capture the entire scrolling page
            });
            console.log(`✅ Saved ${item.name}.png`);
        } catch (error) {
            console.error(`❌ Failed to screenshot ${item.name}: ${error.message}`);
        }
    }

    await browser.close();
    console.log('Finished capturing all screenshots. Check the /screenshots directory!');
}

takeScreenshots();
