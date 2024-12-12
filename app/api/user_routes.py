from flask import Blueprint
from flask_login import login_required, current_user
from app.models import User

user_routes = Blueprint('users', __name__)

#GET all users
#route to test all User data

@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}

#GET user by id
@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

#GET current user
@user_routes.route('/session')
@login_required
def get_current():
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errros': {'message':'Unauthorized'}}, 401
