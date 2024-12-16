from datetime import datetime
from .db import db, environment, SCHEMA, add_prefix_for_prod

collections_books = db.Table(
  'collections_books',
  db.Column('bookId', db.Integer, db.ForeignKey(add_prefix_for_prod('books.id')), primary_key=True),
  db.Column('collectionId', db.Integer, db.ForeignKey(add_prefix_for_prod('collections.id'))),
  db.Column('count', db.Integer, default=1, nullable=False),
  db.Column('createdAt', db.DateTime, default=datetime.now, nullable=False),
  db.Column('updatedAt', db.DateTime, default=datetime.now, onupdate=datetime.now,nullable=False),
)

if environment == "production":
  collections_books.schema = SCHEMA
