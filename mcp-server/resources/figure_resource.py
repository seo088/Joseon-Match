import json
from pathlib import Path

DATA_PATH = Path(__file__).resolve().parents[1] / "data" / "figures.json"


def load_figures() -> list[dict]:
    return json.loads(DATA_PATH.read_text(encoding="utf-8"))


def read_figures() -> str:
    return json.dumps(load_figures(), ensure_ascii=False, indent=2)
