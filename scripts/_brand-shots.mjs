import { chromium } from 'playwright-core';
const OUT = process.argv[2];
const nav = await chromium.launch({ channel: 'msedge', headless: true });

// Home: BrandStrip
{
  const page = await nav.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  await page.locator('[data-strip]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const box = await page.locator('[data-strip]').boundingBox();
  await page.screenshot({ path: `${OUT}/strip-page1.png`, clip: box });
  // scroll to next page in the strip
  await page.evaluate(() => {
    const track = document.getElementById('strip-track');
    track.scrollTo({ left: track.clientWidth, behavior: 'instant' });
  });
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/strip-page2.png`, clip: box });
  await page.close();
}

// Home: BrandStrip mobile 390
{
  const page = await nav.newPage({ viewport: { width: 390, height: 700 }, deviceScaleFactor: 2 });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
  await page.locator('[data-strip]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const box = await page.locator('[data-strip]').boundingBox();
  await page.screenshot({ path: `${OUT}/strip-mobile.png`, clip: box });
  await page.close();
}

// /marcas mosaic desktop
{
  const page = await nav.newPage({ viewport: { width: 1440, height: 1200 } });
  await page.goto('http://localhost:4321/marcas', { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${OUT}/mosaic-desktop.png`, fullPage: true });
  await page.close();
}

// /marcas mosaic mobile 390
{
  const page = await nav.newPage({ viewport: { width: 390, height: 900 }, deviceScaleFactor: 2 });
  await page.goto('http://localhost:4321/marcas', { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${OUT}/mosaic-mobile.png`, fullPage: true });
  await page.close();
}

// lineas-de-negocio: 05 y 06
{
  const page = await nav.newPage({ viewport: { width: 1440, height: 2000 } });
  await page.goto('http://localhost:4321/lineas-de-negocio', { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${OUT}/lineas-full.png`, fullPage: true });
  await page.close();
}

await nav.close();
