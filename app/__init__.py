from flask import Flask
from .db_repo import query_first
from .views import view
from .models import User, init_models
from .auth import auth
from flask_login import LoginManager
from sqlalchemy import select
from .config import Config
from flask_wtf.csrf import CSRFProtect


def create_app():
    app = Flask(__name__, template_folder='../templates', static_folder='../static')
    app.config['SECRET_KEY'] = 'b69e5f14067dc6fd89dc321cdd3ed05f29f2854c9e0aa5c199b117dd511e25c0'
    app.register_blueprint(view)
    app.register_blueprint(auth)

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login_get'
    login_manager.init_app(app)

    csrf = CSRFProtect()
    csrf.init_app(app)

    init_models()


    @login_manager.user_loader
    def load_user(user_id: str) -> User:
        stmt = (
            select(User)
            .where(User.get_id() == user_id)
        )
        user = query_first(stmt)
        print(user)
        if user:
            return user[0]
        else:
            return None
    return app


if(__name__ == '__main__'):
    app = create_app()
    app.run(debug=True)
