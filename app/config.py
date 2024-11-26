from sqlalchemy import create_engine
from flask_htmx import HTMX


class Config:
    engine = create_engine("sqlite:///scannerappdb", echo=True)


def init_db():
    pass