"""
Convert every PNG/JPG/JPEG under assets/ to WebP and re-encode existing WebPs
at lossy quality 60 / max-compression method. Deletes originals after a
successful conversion. SVGs are skipped.
"""
from PIL import Image
from pathlib import Path

ROOT     = Path(__file__).parent / "assets"
QUALITY  = 60
METHOD   = 6
MAX_W    = 1200
SOURCE_EXTS = {".png", ".jpg", ".jpeg", ".webp"}

def fit(im: Image.Image) -> Image.Image:
    if im.width > MAX_W:
        ratio = MAX_W / im.width
        return im.resize((MAX_W, int(im.height * ratio)), Image.LANCZOS)
    return im

def optimise(src: Path) -> tuple[int, int, Path]:
    before = src.stat().st_size
    dst    = src.with_suffix(".webp")
    with Image.open(src) as im:
        im.load()
        im = fit(im)
        if im.mode in ("P", "LA"):
            im = im.convert("RGBA")
        im.save(dst, "WEBP", quality=QUALITY, method=METHOD)
    if dst != src:
        src.unlink()
    return before, dst.stat().st_size, dst

def main() -> None:
    total_before = total_after = 0
    for img in sorted(p for p in ROOT.rglob("*") if p.suffix.lower() in SOURCE_EXTS):
        b, a, out = optimise(img)
        total_before += b
        total_after  += a
        rel = out.relative_to(ROOT)
        print(f"{str(rel):70s} {b/1024:7.1f}KB -> {a/1024:7.1f}KB  "
              f"({(1-a/b)*100:5.1f}% smaller)")
    if total_before:
        print(f"\nTotal: {total_before/1024:.1f}KB -> {total_after/1024:.1f}KB "
              f"(saved {(total_before-total_after)/1024:.1f}KB, "
              f"{(1-total_after/total_before)*100:.1f}%)")

if __name__ == "__main__":
    main()
