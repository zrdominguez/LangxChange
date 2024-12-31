import os
from app.models import db, environment, SCHEMA, Review
from datetime import datetime
from sqlalchemy.sql import text

def seed_reviews():
    review1 = Review(
        userId=1,
        bookId=1,
        review="An amazing book that kept me hooked and taught me grammatic structures!",
        rating=5,
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    review2 = Review(
        userId=2,
        bookId=2,
        review="The story was intriguing, but the pacing was a bit slow. So much to the point I couldnt finish it",
        rating=2,
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    review3 = Review(
        userId=3,
        bookId=3,
        review="Not my favorite, but it had some great moments where I could understand the use of particles.",
        rating=3,
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )

    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.commit()

def undo_reviews():
  if environment == "production":
    db.session.execute(f"TRUNCATE TABLE {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM reviews"))
  db.session.commit()
