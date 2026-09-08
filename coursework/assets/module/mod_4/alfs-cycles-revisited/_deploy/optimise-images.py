"""
Image optimiser for the mod_4 Alf's Cycles build.

What it does:
  • PNG photos (alf-cat, thumbnail, alf_doingWheelie_1)  →  WebP (massive win)
  • JPG photos                                            →  WebP
  • Existing WebPs                                        →  re-encoded at q=75
  • PNGs that are small icons/logos (logo.png)            →  left alone

Targets: ../assets/images, ../assets/icons, ../assets/svg
Quality: 80 for first-time conversions, 75 for re-encodes (visibly identical, ~30-50% smaller)
Long-edge cap: 1200 px on the long side (matches the largest visible size on the site)

Output report shows before/after sizes.
"""
import os
from PIL import Image

ROOT = os.path.join(os.path.dirname(__file__), '..', 'assets')
QUALITY_NEW = 80     # for new conversions
QUALITY_RE  = 75     # for re-encoding existing webps
MAX_W = 1200

# Files to keep untouched (e.g. favicon PNG, vector SVGs)
KEEP = {'logo.png'}

def is_image(fn):
    return os.path.splitext(fn)[1].lower() in ('.png', '.jpg', '.jpeg', '.webp')

def optimise(src_path: str):
    fn = os.path.basename(src_path)
    if fn in KEEP:
        return None, "kept (intentional)"

    try:
        im = Image.open(src_path)
    except Exception as e:
        return None, f"open failed: {e}"

    if im.format not in ('PNG', 'JPEG', 'WEBP'):
        return None, f"skipped ({im.format})"

    # Resize long edge if oversized
    if im.width > MAX_W:
        new_h = round(im.height * (MAX_W / im.width))
        im = im.resize((MAX_W, new_h), Image.LANCZOS)

    # Drop alpha for photos
    has_alpha = im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info)
    if not has_alpha:
        im = im.convert('RGB')

    out_path = os.path.splitext(src_path)[0] + '.webp'
    # Use quality 75 if re-encoding an existing webp, else 80
    q = QUALITY_RE if src_path.lower().endswith('.webp') else QUALITY_NEW
    im.save(out_path, 'WEBP', quality=q, method=6, lossless=False)
    return out_path, f"q={q}"

def main():
    total_before = 0
    total_after = 0
    rows = []
    for sub in ('images', 'icons', 'svg'):
        d = os.path.join(ROOT, sub)
        if not os.path.isdir(d):
            continue
        for fn in sorted(os.listdir(d)):
            src = os.path.join(d, fn)
            if not os.path.isfile(src) or not is_image(fn):
                continue
            before = os.path.getsize(src)
            out, note = optimise(src)
            after = os.path.getsize(out) if out else before
            total_before += before
            total_after += after
            rows.append((sub, fn, before, after, out, note))

    print(f"{'dir':<8} {'file':<78} {'before':>10} {'after':>10}  {'note':<20}")
    print('-' * 130)
    for sub, fn, b, a, out, note in rows:
        pct = 100 * (1 - a / b) if b else 0
        new_name = os.path.basename(out) if out else fn
        action = f"-> {new_name}" if out else "(no change)"
        print(f"{sub:<8} {fn:<78} {b/1024:>8.1f}K {a/1024:>8.1f}K  {note:<10} {action}")

    print('-' * 130)
    saved = total_before - total_after
    pct = 100 * saved / total_before if total_before else 0
    print(f"{'TOTAL':<8} {'':<78} {total_before/1024:>8.1f}K {total_after/1024:>8.1f}K  saved {saved/1024:.1f} KB ({pct:.1f}%)")

if __name__ == '__main__':
    main()
