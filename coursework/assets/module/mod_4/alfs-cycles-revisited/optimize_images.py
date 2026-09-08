"""
One-shot image optimiser for alfs-cycles-revisited/assets/images.
Re-encodes every WebP to the smallest acceptable lossy size while keeping
visual quality acceptable for web use. Overwrites in place.
"""
from PIL import Image
from pathlib import Path

IMG_DIR = Path(__file__).parent / "assets" / "images"
QUALITY = 60      # lossy WebP quality (0-100); 60 is the sweet spot for photos
METHOD  = 6       # 0=fast, 6=best/slowest compression
MAX_W   = 1200    # downsize anything wider than this — UI never shows above ~600px @2x

def optimise(path: Path) -> tuple[int, int]:
    before = path.stat().st_size
    with Image.open(path) as im:
        im.load()
        if im.width > MAX_W:
            ratio = MAX_W / im.width
            im = im.resize((MAX_W, int(im.height * ratio)), Image.LANCZOS)
        im.save(path, "WEBP", quality=QUALITY, method=METHOD)
    return before, path.stat().st_size

def main() -> None:
    total_before = total_after = 0
    for img in sorted(IMG_DIR.glob("*.webp")):
        b, a = optimise(img)
        total_before += b
        total_after  += a
        print(f"{img.name:70s} {b/1024:7.1f}KB -> {a/1024:7.1f}KB  "
              f"({(1-a/b)*100:5.1f}% smaller)")
    print(f"\nTotal: {total_before/1024:.1f}KB -> {total_after/1024:.1f}KB "
          f"(saved {(total_before-total_after)/1024:.1f}KB, "
          f"{(1-total_after/total_before)*100:.1f}%)")

if __name__ == "__main__":
    main()
