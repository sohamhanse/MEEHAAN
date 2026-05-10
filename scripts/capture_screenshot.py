from playwright.sync_api import sync_playwright
import sys
import os

SCREENSHOTS_DIR = "C:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/screenshots"

viewports = [
    {"name": "desktop", "width": 1920, "height": 1080},
    {"name": "laptop",  "width": 1366, "height": 768},
    {"name": "tablet",  "width": 768,  "height": 1024},
    {"name": "mobile",  "width": 375,  "height": 812},
]

pages_to_capture = [
    {"slug": "home",             "url": "https://www.meehaan.com/"},
    {"slug": "about",            "url": "https://www.meehaan.com/about"},
    {"slug": "contact",          "url": "https://www.meehaan.com/contact"},
    {"slug": "digital",          "url": "https://www.meehaan.com/solutions/digital"},
    {"slug": "digital_products", "url": "https://www.meehaan.com/solutions/digital/products"},
]

def capture_all():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        for vp in viewports:
            context = browser.new_context(
                viewport={"width": vp["width"], "height": vp["height"]},
                device_scale_factor=1,
            )
            for pg in pages_to_capture:
                page = context.new_page()
                try:
                    page.goto(pg["url"], wait_until="networkidle", timeout=30000)
                    page.wait_for_timeout(2000)

                    atf_path = os.path.join(
                        SCREENSHOTS_DIR,
                        f"{pg['slug']}_{vp['name']}_atf.png"
                    )
                    full_path = os.path.join(
                        SCREENSHOTS_DIR,
                        f"{pg['slug']}_{vp['name']}_full.png"
                    )
                    page.screenshot(path=atf_path, full_page=False)
                    page.screenshot(path=full_path, full_page=True)
                    print(f"OK  {pg['slug']} @ {vp['name']}")
                except Exception as e:
                    print(f"ERR {pg['slug']} @ {vp['name']}: {e}")
                finally:
                    page.close()
            context.close()
        browser.close()

def capture(url_base, output_dir):
    os.makedirs(output_dir, exist_ok=True)
    results = []
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for vp in viewports:
            page = browser.new_page(viewport={"width": vp["width"], "height": vp["height"]})
            for pg in pages_to_capture:
                url = pg["url"]
                try:
                    page.goto(url, wait_until="networkidle", timeout=30000)
                    page.wait_for_timeout(1500)
                    filename = f"{vp['name']}_{pg['slug']}.png"
                    out = os.path.join(output_dir, filename)
                    page.screenshot(path=out, full_page=False)
                    results.append(f"OK  {filename}")
                except Exception as e:
                    results.append(f"ERR {vp['name']}_{pg['slug']}: {e}")
        browser.close()
    for r in results:
        print(r)

if __name__ == "__main__":
    os.makedirs(SCREENSHOTS_DIR, exist_ok=True)
    capture_all()
    print("Done.")
