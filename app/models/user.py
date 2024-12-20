from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profileImageUrl = db.Column(db.String(255), nullable=True)
    createdAt = db.Column(db.DateTime, default=datetime.now, nullable=False)
    updatedAt = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)

    reviews = db.relationship('Review', backref='user', cascade='all, delete-orphan')
    collections = db.relationship('Collection', backref='user', cascade='all, delete-orphan')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def get_collections(self):
        if self.collections:
            return [collection.to_dict() for collection in self.collections]
        return None

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
