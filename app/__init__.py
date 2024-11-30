from flask import Flask

from .config import DevelopmentConfig

from flask_login import LoginManager
from sqlalchemy import select
from flask_wtf.csrf import CSRFProtect
from sqlalchemy.orm import Session

def create_app():
    app = Flask(__name__, template_folder='../templates', static_folder='../static')

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login_get'
    login_manager.init_app(app)

    csrf = CSRFProtect()
    csrf.init_app(app)

    app.config.from_object(DevelopmentConfig())

    #import modules as soon as app_context is available
    with app.app_context():
        from .views import view
        from .auth import auth
        from .models import User, create_all

        app.register_blueprint(view)
        app.register_blueprint(auth)
        create_all()

    @login_manager.user_loader
    def load_user(user_id: str) -> User:
        stmt = (
            select(User)
            .where(User.get_id() == user_id)
        )
        with Session(app.config['ENGINE']) as session:
            user = session.execute(stmt).first()
        print(user)
        if user:
            return user[0]
        else:
            return None
    
    return app

if(__name__ == '__main__'):
    app = create_app()
    app.run(debug=True)

