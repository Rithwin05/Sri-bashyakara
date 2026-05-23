import sys
from pathlib import Path

# Add project root directory to path to ensure relative imports of 'backend' succeed
sys.path.append(str(Path(__file__).parent.parent))

from backend.server import app
