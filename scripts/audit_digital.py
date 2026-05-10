from playwright.sync_api import sync_playwright
import os

BASE_URL = "https://digital.meehaan.com"
OUT_DIR  = "C:/Users/DELL/OneDrive/Desktop/Meehaan/MEEHAAN/screenshots/digital_audit"

VIEWPORTS = [
    ("desktop", 1920, 1080),
    ("laptop",  1366, 768),
    ("tablet",  768,  1024),
    ("mobile",  375,  812),
]

ROUTES = [
    ("landing",   "/"),
    ("products",  "/solutions"),
    ("about",     "/about"),
    ("contact",   "/contact"),
]

def run():
    os.makedirs(OUT_DIR, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(args=["--no-sandbox"])
        for vp_name, w, h in VIEWPORTS:
            ctx = browser.new_context(
                viewport={"width": w, "height": h},
                user_agent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
            )
            page = ctx.new_page()
            for route_name, path in ROUTES:
                url = BASE_URL + path
                try:
                    page.goto(url, wait_until="networkidle", timeout=40000)
                    page.wait_for_timeout(2500)

                    atf_path = os.path.join(OUT_DIR, f"{vp_name}_{route_name}_atf.png")
                    page.screenshot(path=atf_path, full_page=False)

                    full_path = os.path.join(OUT_DIR, f"{vp_name}_{route_name}_full.png")
                    page.screenshot(path=full_path, full_page=True)

                    print(f"OK  {vp_name}/{route_name}")
                except Exception as e:
                    print(f"ERR {vp_name}/{route_name}: {e}")
            ctx.close()
        browser.close()

if __name__ == "__main__":
    run()
