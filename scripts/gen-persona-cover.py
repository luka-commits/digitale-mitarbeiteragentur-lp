#!/usr/bin/env python3
"""
Generate persona cover shots via OpenAI gpt-image-1 with reference image (identity lock).

Usage:
    python3 gen-persona-cover.py \
        --prompt "Studio cover portrait, waist-up, crossed arms, …" \
        --reference-image /path/to/paula-poster.jpg \
        --output-dir /path/to/assets/personas/_cover-drafts \
        --prefix paula-cover \
        --count 2
"""

import argparse
import base64
import json
import mimetypes
import os
import sys
import urllib.request
import urllib.error
import uuid
from pathlib import Path


OPENAI_ENDPOINT = "https://api.openai.com/v1/images/edits"
MODEL = "gpt-image-2"
SIZE = "1024x1536"  # portrait 2:3 — good for waist-up cover shots
QUALITY = "high"


def load_api_key() -> str:
    key = os.environ.get("OPENAI_API_KEY")
    if key:
        return key

    cred_file = Path.home() / ".config" / "credentials.env"
    if cred_file.is_file():
        with open(cred_file, "r", encoding="utf-8") as fh:
            for line in fh:
                line = line.strip()
                if not line or line.startswith("#"):
                    continue
                if line.startswith("export "):
                    line = line[len("export "):]
                if "=" not in line:
                    continue
                k, _, v = line.partition("=")
                if k.strip() == "OPENAI_API_KEY":
                    return v.strip().strip('"').strip("'")

    sys.stderr.write("ERROR: OPENAI_API_KEY not found.\n")
    sys.exit(1)


def build_multipart(fields: list[tuple[str, str]], files: list[tuple[str, Path]]) -> tuple[bytes, str]:
    boundary = "----formboundary" + uuid.uuid4().hex
    parts = []
    for name, value in fields:
        parts.append(f"--{boundary}\r\n".encode())
        parts.append(f'Content-Disposition: form-data; name="{name}"\r\n\r\n'.encode())
        parts.append(value.encode("utf-8"))
        parts.append(b"\r\n")
    for name, path in files:
        mime, _ = mimetypes.guess_type(str(path))
        if mime is None:
            mime = "application/octet-stream"
        parts.append(f"--{boundary}\r\n".encode())
        parts.append(
            f'Content-Disposition: form-data; name="{name}"; filename="{path.name}"\r\n'.encode()
        )
        parts.append(f"Content-Type: {mime}\r\n\r\n".encode())
        parts.append(path.read_bytes())
        parts.append(b"\r\n")
    parts.append(f"--{boundary}--\r\n".encode())
    return b"".join(parts), boundary


def generate_one(api_key: str, prompt: str, refs: list[Path], output_path: Path) -> bool:
    fields = [
        ("model", MODEL),
        ("prompt", prompt),
        ("size", SIZE),
        ("quality", QUALITY),
        ("n", "1"),
    ]
    # gpt-image-1 accepts multiple reference images via image[] array.
    files = [("image[]", ref) for ref in refs]

    body, boundary = build_multipart(fields, files)

    req = urllib.request.Request(
        OPENAI_ENDPOINT,
        data=body,
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": f"multipart/form-data; boundary={boundary}",
        },
    )

    try:
        with urllib.request.urlopen(req, timeout=240) as resp:
            data = json.loads(resp.read())
    except urllib.error.HTTPError as e:
        sys.stderr.write(
            f"HTTPError {e.code} for {output_path.name}: "
            f"{e.read().decode(errors='replace')[:800]}\n"
        )
        return False
    except urllib.error.URLError as e:
        sys.stderr.write(f"URLError for {output_path.name}: {e.reason}\n")
        return False
    except json.JSONDecodeError as e:
        sys.stderr.write(f"Bad JSON for {output_path.name}: {e}\n")
        return False

    try:
        b64 = data["data"][0]["b64_json"]
    except (KeyError, IndexError, TypeError):
        sys.stderr.write(
            f"No image in response for {output_path.name}. Body: {json.dumps(data)[:500]}\n"
        )
        return False

    raw = base64.b64decode(b64)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_bytes(raw)
    return True


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--prompt", required=True)
    parser.add_argument("--reference-image", action="append", default=[])
    parser.add_argument("--output-dir", required=True)
    parser.add_argument("--prefix", required=True)
    parser.add_argument("--count", type=int, default=2)
    args = parser.parse_args()

    api_key = load_api_key()
    refs = [Path(p).expanduser().resolve() for p in args.reference_image]
    if not refs:
        sys.stderr.write("ERROR: at least one --reference-image required for gpt-image-1 edits.\n")
        return 1
    for ref in refs:
        if not ref.is_file():
            sys.stderr.write(f"ERROR: reference image missing: {ref}\n")
            return 1

    output_dir = Path(args.output_dir).expanduser().resolve()
    output_dir.mkdir(parents=True, exist_ok=True)

    saved = []
    failed = 0
    for i in range(1, args.count + 1):
        out = output_dir / f"{args.prefix}-{i:02d}.png"
        print(f"Generating {out.name}...", file=sys.stderr, flush=True)
        if generate_one(api_key, args.prompt, refs, out):
            saved.append(str(out))
        else:
            failed += 1

    for p in saved:
        print(p)

    if not saved:
        return 1
    if failed:
        sys.stderr.write(f"PARTIAL: {len(saved)}/{args.count} ok, {failed} failed.\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
