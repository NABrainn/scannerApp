from sqlalchemy import Result, Row
from .config import Config
from sqlalchemy.orm import Session

def query_first(stmt) -> Row:
    with Session(Config.engine) as session:
        val = session.execute(stmt).first()
    return val
    
