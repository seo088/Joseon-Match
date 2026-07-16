import json
from pathlib import Path

DATA_PATH = Path(__file__).resolve().parents[1] / "data" / "traits.json"


def load_traits() -> dict:
    return json.loads(DATA_PATH.read_text(encoding="utf-8"))


def read_traits() -> str:
    return json.dumps(load_traits(), ensure_ascii=False, indent=2)
