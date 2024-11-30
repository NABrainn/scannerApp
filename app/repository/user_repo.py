from sqlalchemy.orm import Session

from ..models import User


class UserRepo:
    def __init__(self, session: Session):
        self.session = session

    def get_by_email(self, email: str) -> User:
        with self.session:
            return self.session.query(User).filter_by(email=email).first()
    
    def get_by_id(self, id: int) -> User:
        with self.session:
            return self.session.query(User).filter_by(id=id).first()
    
    def create(self, user: User) -> int:
        with self.session:
            self.session.add(user)
            self.session.commit()
            return user.id
