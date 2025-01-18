from .association import collections_books
from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Collection(db.Model):
  __tablename__ = 'collections'
  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)
  userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')),nullable=False)
  lang = db.Column(db.String, nullable=False)
  createdAt = db.Column(db.DateTime, default=datetime.now, nullable=False)
  updatedAt = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)

  books = db.relationship('Book', secondary=collections_books, back_populates='collections')

  def to_dict(self):
    total_count = (
      db.session.query(db.func.sum(collections_books.c.count))
      .filter(collections_books.c.collectionId == self.id)
      .scalar() or 0
    )

    return {
      'id': self.id,
      'name': self.name,
      'userId': self.userId,
      'lang': self.lang,
      'bookCount': total_count,
      'books': [book.to_dict() for book in self.books]
    }
