from flask import current_app
from sqlalchemy import Boolean, String
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column


class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(30))
    username: Mapped[str] = mapped_column(String(30))
    password: Mapped[str] = mapped_column(String(30))
    is_authenticated: Mapped[bool] = mapped_column(Boolean, default=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    is_anonymous: Mapped[bool] = mapped_column(Boolean, default=True)

    @staticmethod
    def get_id():
        return str(id)
    
    def get_active(self):
        return self.is_active

    def __repr__(self) -> str:
        return f'User(id={self.id}, email={self.email}, username={self.username}, password={self.password}, is_authenticated={self.is_authenticated}, is_active={self.is_active}, is_anonymous={self.is_anonymous})'

class Entity(Base):
    __tablename__ = "entities"

    id: Mapped[int] = mapped_column(primary_key = True)
    title: Mapped[str] = mapped_column(String(30))

    def __repr__(self) -> str:
        return f'Entity(id={self.id}, title={self.title})'
    
def create_all():
    Base.metadata.create_all(current_app.config['ENGINE'])

def drop_all():
    Base.metadata.drop_all(current_app.config['ENGINE'])



