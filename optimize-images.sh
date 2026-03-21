#!/usr/bin/env bash
# optimize-images.sh — Resize & compress all portfolio images for web delivery
# Uses Python/Pillow (no ImageMagick required)
# Reusable: run again after adding new images

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
IMG_DIR="$SCRIPT_DIR/images"

python3 << 'PYEOF'
import os
import sys
from PIL import Image

IMG_DIR = os.environ.get("IMG_DIR", "images")

# Configuration per folder / role
# max_width, quality
CONFIG_DEFAULT  = (1920, 82)   # Hero / full-width
CONFIG_GALLERY  = (1600, 80)   # Gallery images
CONFIG_PORTRAIT = (1200, 82)   # Portrait photo
CONFIG_LOGO     = (200, 85)    # Logo JPGs (small)

# Map folder names to config
FOLDER_CONFIG = {
    "shared": None,  # handled individually below
}

total_before = 0
total_after  = 0
file_count   = 0

def optimize(filepath, max_width, quality):
    global total_before, total_after, file_count

    size_before = os.path.getsize(filepath)
    total_before += size_before

    img = Image.open(filepath)
    orig_format = img.format or "JPEG"

    # Handle EXIF orientation
    try:
        from PIL import ExifTags
        exif = img._getexif()
        if exif:
            for tag, val in exif.items():
                if ExifTags.TAGS.get(tag) == "Orientation":
                    if val == 3:
                        img = img.rotate(180, expand=True)
                    elif val == 6:
                        img = img.rotate(270, expand=True)
                    elif val == 8:
                        img = img.rotate(90, expand=True)
                    break
    except Exception:
        pass

    w, h = img.size
    resized = False

    if w > max_width:
        ratio = max_width / w
        new_h = int(h * ratio)
        img = img.resize((max_width, new_h), Image.LANCZOS)
        resized = True

    # For portrait (taller than wide), also cap height
    if img.size[1] > max_width:
        ratio = max_width / img.size[1]
        new_w = int(img.size[0] * ratio)
        img = img.resize((new_w, max_width), Image.LANCZOS)
        resized = True

    # Convert to RGB if necessary (e.g. RGBA PNGs)
    if img.mode in ("RGBA", "P"):
        img = img.convert("RGB")

    # Save with optimization, strip EXIF
    img.save(filepath, "JPEG", quality=quality, optimize=True, exif=b"")

    size_after = os.path.getsize(filepath)
    total_after += size_after
    file_count += 1

    pct = (1 - size_after / size_before) * 100 if size_before > 0 else 0
    tag = "RESIZED" if resized else "COMPRESSED"
    print(f"  {tag:>10}  {size_before:>10,} -> {size_after:>10,}  ({pct:+.0f}%)  {os.path.basename(filepath)}")


def process_dir(dirpath, max_width, quality):
    files = sorted(os.listdir(dirpath))
    for f in files:
        fp = os.path.join(dirpath, f)
        if not os.path.isfile(fp):
            continue
        ext = f.lower().rsplit(".", 1)[-1] if "." in f else ""
        if ext in ("jpg", "jpeg", "png"):
            optimize(fp, max_width, quality)
        elif ext == "svg":
            print(f"  {'SKIP':>10}  {os.path.getsize(fp):>10,}              (SVG)  {f}")


print("=" * 80)
print("IMAGE OPTIMIZATION REPORT")
print("=" * 80)

for entry in sorted(os.listdir(IMG_DIR)):
    dirpath = os.path.join(IMG_DIR, entry)
    if not os.path.isdir(dirpath):
        continue

    print(f"\n--- {entry}/ ---")

    if entry == "shared":
        # Handle shared files individually
        for f in sorted(os.listdir(dirpath)):
            fp = os.path.join(dirpath, f)
            if not os.path.isfile(fp):
                continue
            ext = f.lower().rsplit(".", 1)[-1] if "." in f else ""
            if ext == "svg":
                print(f"  {'SKIP':>10}  {os.path.getsize(fp):>10,}              (SVG)  {f}")
            elif "portrait" in f.lower():
                optimize(fp, 1200, 82)
            elif "logo" in f.lower() and ext in ("jpg", "jpeg", "png"):
                optimize(fp, 200, 85)
            elif ext in ("jpg", "jpeg", "png"):
                optimize(fp, 1600, 80)
    else:
        # Gallery images
        process_dir(dirpath, 1600, 80)

print("\n" + "=" * 80)
print(f"TOTAL FILES:   {file_count}")
print(f"BEFORE:        {total_before:>12,} bytes  ({total_before / 1024 / 1024:.1f} MB)")
print(f"AFTER:         {total_after:>12,} bytes  ({total_after / 1024 / 1024:.1f} MB)")
saved = total_before - total_after
print(f"SAVED:         {saved:>12,} bytes  ({saved / 1024 / 1024:.1f} MB,  {saved / total_before * 100:.0f}%)")
print("=" * 80)
PYEOF
