from flask import Blueprint, request
from app.models import Book, Review, db
from app.forms import NewReviewForm
from flask_login import current_user, login_required

book_routes = Blueprint('books', __name__)

#The only Languages of books for now
LANGUAGES = {'eng':'English', 'jp':'Japanese', 'sp':'Spanish'}

#Helper Function to see if a User already Reviewed a Book
def check_if_review_exists(book):
  reviews = [review.to_dict() for review in current_user.reviews if review.bookId == book.id]
  return len(reviews) > 0

#GET All Books by language
@book_routes.route('/<string:lang>')
def books(lang):
  if lang not in LANGUAGES:
    return {'error': f'Language "{lang}" is not supported.'}, 400
  lang = LANGUAGES[lang]
  books = Book.query.filter(Book.lang == lang).all()
  return {'books':[book.to_dict() for book in books]}

#GET Book details by id
@book_routes.route('/<int:bookId>')
def book_details(bookId):
  book = Book.query.get(bookId)
  if book:
    return book.to_dict_details()
  else:
    return {"message": "Book not found!"}, 404

#GET all reviews of a book
@book_routes.route('/<int:bookId>/reviews')
def book_reviews(bookId):
  book = Book.query.get(bookId)
  if book:
    bookReviews = book.to_dict()['reviews']
  else:
    return {"message": "book could not be found!"}, 404
  return {'reviews': bookReviews}

#POST create review for book by id
@book_routes.route('/<int:bookId>/reviews', methods=['POST'])
@login_required
def create_review(bookId):
  book = Book.query.get(bookId)
  if check_if_review_exists(book):
    return {'message': 'User already has a review for this book'}
  if book:
    form = NewReviewForm()
    form["csrf_token"].data = request.cookies.get("csrf_token")
    if form.validate_on_submit():
      newReview = Review(
        bookId = bookId,
        userId = current_user.id,
        review = form.review.data,
        rating = form.rating.data
      )

      db.session.add(newReview)
      book.calculate_avg_rating()
      db.session.commit()
      return {'review': newReview.to_dict()}, 201

    if form.errors:
      return {
        "message": "Bad Request",
        "errors": form.errors
      }, 400
  else:
    return {"message": "book could not be found!"}, 404
