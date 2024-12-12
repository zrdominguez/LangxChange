from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Book

book_routes = Blueprint('books', __name__)

#The only Languages of books for now
LANGUAGES = {'eng':'English', 'jp':'Japanese', 'sp':'Spanish'}


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
    return book.to_dict()
  else:
    return {"message": "Book not found!"}, 404
