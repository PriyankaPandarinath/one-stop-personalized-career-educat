from alembic.config import Config
from alembic import command
import traceback
import sys

def run_upgrade():
    try:
        alembic_cfg = Config("alembic.ini")
        command.upgrade(alembic_cfg, "head")
        print("Success")
    except Exception as e:
        print("Error during migration:")
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    run_upgrade()
