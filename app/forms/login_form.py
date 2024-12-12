from flask_wtf import FlaskForm
from sqlalchemy import or_
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    credentials = field.data
    user = User.query.filter(or_(User.email == credentials, User.username == credentials)).first()
    if not user:
        raise ValidationError('Login failed. Please check your credentials and try again.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    credentials = form.data['credentials']
    user = User.query.filter(or_(User.email == credentials, User.username == credentials)).first()
    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        raise ValidationError('Password was incorrect.')


class LoginForm(FlaskForm):
    credentials = StringField('credentials', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(), password_matches])
