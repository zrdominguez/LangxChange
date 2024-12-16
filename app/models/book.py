from .association import collections_books
from .db import db, environment, SCHEMA
from datetime import datetime

class Book(db.Model):
  __tablename__ = 'books'

  if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)
  lang = db.Column(db.String, nullable=False)
  summary = db.Column(db.String, nullable=False)
  publisher = db.Column(db.String, nullable=False)
  publishDate = db.Column(db.DateTime, nullable=False)
  author = db.Column(db.String, nullable=False)
  genre = db.Column(db.JSON, nullable=False)
  avgRating = db.Column(db.Numeric, nullable=True)
  difficulty = db.Column(db.String, nullable=False)
  imgUrl = db.Column(db.String, nullable=True)
  difficulty = db.Column(db.String, nullable=False)
  createdAt = db.Column(db.DateTime, default=datetime.now, nullable=False)
  updatedAt = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)

  reviews = db.relationship('Review', backref='book', cascade='all, delete-orphan')
  collections = db.relationship('Collection', secondary=collections_books, back_populates='books', lazy='select')

  def to_dict(self):
    return {
      'name': self.name,
      'lang': self.lang,
      'summary': self.summary,
      'publisher': self.publisher,
      'publishDate': self.publishDate,
      'author': self.author,
      'genre': self.genre,
      'avgRating': str(round(self.avgRating,2)),
      'imgUrl': self.imgUrl,
      'difficulty': self.difficulty,
      'reviews': [review.to_dict() for review in self.reviews]
    }
