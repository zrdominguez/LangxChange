from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Review(db.Model):
  __tablename__ = 'reviews'

  if environment == "production":
    __table_args__ = {'schema' : SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  review = db.Column(db.String, nullable=False)
  bookId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('books.id')), nullable=False)
  userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  rating = db.Column(db.Integer, nullable=False)
  createdAt = db.Column(db.DateTime, default=datetime.now, nullable=False)
  updatedAt = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)

  def to_dict(self):
    return {
      'id': self.id,
      'review': self.review,
      'bookId': self.bookId,
      'userId': self.userId,
      'rating': self.rating,
      'createdAt': self.createdAt,
      'updatedAt': self.updatedAt
    }
