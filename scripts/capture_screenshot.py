from playwright.sync_api import sync_playwright
import sys
import os

VIEWPORTS = {
    "desktop": {"width": 1920, "height": 1080},
    "laptop":  {"width": 1366, "height": 768},
    "tablet":  {"width": 768,  "height": 1024},
    "mobile":  {"width": 375,  "height": 812},
}

PAGES = [
    ("home",     "/"),
    ("digital",  "/digital"),
    ("solutions","/solutions"),
    ("about",    "/about"),
]

def capture(url_base, output_dir):
    os.makedirs(output_dir, exist_ok=True)
    results = []
    with sync_playwright() as p:
        browser = p.chromium.launch()
        for device, vp in VIEWPORTS.items():
            page = browser.new_page(viewport=vp)
            for page_name, path in PAGES:
                url = url_base.rstrip("/") + path
                try:
                    page.goto(url, wait_until="networkidle", timeout=30000)
                    page.wait_for_timeout(1500)
                    filename = f"{device}_{page_name}.png"
                    out = os.path.join(output_dir, filename)
                    page.screenshot(path=out, full_page=False)
                    results.append(f"OK  {filename}")
                except Exception as e:
                    results.append(f"ERR {device}_{page_name}: {e}")
        browser.close()
    for r in results:
        print(r)

if __name__ == "__main__":
    url_base = sys.argv[1] if len(sys.argv) > 1 else "https://www.meehaan.com"
    output_dir = sys.argv[2] if len(sys.argv) > 2 else "screenshots"
    capture(url_base, output_dir)
