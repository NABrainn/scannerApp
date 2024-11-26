from flask_wtf import FlaskForm
from wtforms import BooleanField, PasswordField, StringField, validators


class LoginForm(FlaskForm):
    email = StringField('Email', [validators.Email(), validators.DataRequired()])
    password = PasswordField('Password', [validators.Length(min=8), validators.DataRequired()])
    remember = BooleanField('Remember Me')


class SignupForm(FlaskForm):
    email = StringField('Email', [validators.Email(), validators.DataRequired()])
    username = StringField('Username', [validators.Length(min=8, max=35), validators.DataRequired()])
    password = PasswordField('Password', [validators.Length(min=8), validators.DataRequired()])