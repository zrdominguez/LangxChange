from .db import db, environment, SCHEMA

class Book(db.Model):
  __tablename__ = 'books'

 if environment == "production":
    __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable=False)
  lang = db.Column(db.String, nullable=False)
  summary = db.Column(db.String, nullable=False)
  author = db.Column(db.String, nullable=False)
  genre = db.Column(db.String, nullable=False)
  avgRating = db.Column(db.Decimal, nullable=True)
  imgUrl = db.Column(db.String, nullable=True)
  createdAt = db.Column(db.DateTime, default=datetime.now, nullable=False)
  updatedAt = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now, nullable=False)

  reviews = db.relationship('Review', backref='book', cascade='all, delete-orphan')
  collections = db.relationship('Collection', secondary=collections_books, back_populates='books', lazy='select')

  def to_dict(self):
    return {
      'name': self.name,
      'lang': self.lang,
      'summary': self.summary,
      'author': self.author,
      'genre': self.genre,
      'avgRating': self.avgRating,
      'imgUrl': self.imgUrl
    }
