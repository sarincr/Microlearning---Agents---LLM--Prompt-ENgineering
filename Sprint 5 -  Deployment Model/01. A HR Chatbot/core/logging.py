from loguru import logger
import sys

logger.remove()
logger.add(sys.stdout)

def get_logger():
    return logger
