from sqlalchemy import create_engine


class Config:
    SECRET_KEY = 'b69e5f14067dc6fd89dc321cdd3ed05f29f2854c9e0aa5c199b117dd511e25c0'
    TESTING = False

class ProductionConfig(Config):
    DATABASE_URI = "sqlite:///scannerappdb"

class DevelopmentConfig(Config):
    DATABASE_URI = "sqlite:///scannerappdb"
    ENGINE = create_engine(DATABASE_URI, echo=True)

class TestingConfig(Config):
    DATABASE_URI = "sqlite:///scannerappdb"

