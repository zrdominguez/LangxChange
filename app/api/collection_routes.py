from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Collection, db, Book, collections_books
from app.forms import CollectionForm, EditCollectionForm

collection_routes = Blueprint('collections', __name__)

def check_collection(collectionId):
  collection = Collection.query.get(collectionId)
  if not collection:
    return {'message': 'Collection could not be found!'}, 404
  return collection

def check_book(bookId):
  book = Book.query.get(bookId)
  if not book:
    return {'message': 'Book could not be found!'}, 404
  return book

#POST create a new Collection
@collection_routes.route('/new', methods=['POST'])
@login_required
def create_collection():
  form = CollectionForm()
  form["csrf_token"].data = request.cookies.get("csrf_token")
  if form.validate_on_submit():
    newCollection = Collection(
    name = form.collectionName.data,
    userId = current_user.id,
    lang = form.language.data
    )

    db.session.add(newCollection)
    db.session.commit()
    return newCollection.to_dict(), 201

  if form.errors:
    return {
      "message": "Bad Request",
      "errors": form.errors
    }, 400

#PUT update collection name
@collection_routes.route('/<int:collectionId>', methods=['PUT'])
@login_required
def update_name(collectionId):

  collection = check_collection(collectionId)
  if not isinstance(collection, Collection):
    return collection

  if collection.userId != current_user.id:
    return {'message': 'Requires proper authorization!'}, 403

  form = EditCollectionForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    collection.name = form.collectionName.data

    db.session.commit()
    return {'message': 'Collection name has been updated!'}
  if form.errors:
    return {
      'message':'Bad Request',
      'errors': form.errors
    }, 400

#DELETE delete a collection
@collection_routes.route('/<int:collectionId>', methods=['DELETE'])
@login_required
def delete_collection(collectionId):
  collection = check_collection(collectionId)

  if not isinstance(collection, Collection):
    return collection
  if collection.userId != current_user.id:
    return {'message': 'Requires proper authorization!'}, 403

  db.session.delete(collection)
  db.session.commit()
  return {'message': 'Collection was successfully deleted!'}

#POST add a book to a collection
@collection_routes.route('/<int:collectionId>/books', methods=['POST'])
@login_required
def add_book(collectionId):
  bookId = request.get_json()['bookId']

  if bookId < 0:
    return {'message': 'Not a valid book selection!'}, 401

  book = check_book(bookId)

  if not isinstance(book, Book):
    return book

  collection = check_collection(collectionId)

  if not isinstance(collection, Collection):
    return collection

  if collection.userId != current_user.id:
    return {'message': 'Requires proper authorization!'}, 403

  if collection.lang != book.lang:
    return {"message": "Book must match collection language!"}, 400

  collection_book = db.session.query(collections_books).filter_by(
    collectionId = collection.id,
    bookId = book.id
  ).first()

  if collection_book:
    return {"message": "Book is already added to collection!"}, 400
  else:

    db.session.execute(
      collections_books.insert().values(collectionId = collection.id, bookId = book.id)
    )
    db.session.commit()
    return {"message": "Book has been added to collection!"}

#GET view all books in a collection
@collection_routes.route('/<int:collectionId>/books')
@login_required
def view_books(collectionId):
  collection = check_collection(collectionId)
  if not isinstance(collection, Collection):
    return collection

  return {'collection': collection.to_dict()}

#DELETE Remove Book in collection
@collection_routes.route('/<int:collectionId>/books', methods=['DELETE'])
@login_required
def remove_book(collectionId):
  bookId = request.get_json()['bookId']
  book = check_book(bookId)

  if not isinstance(book, Book):
    return book

  collection = check_collection(collectionId)

  if not isinstance(collection, Collection):
    return collection

  collection_book = db.session.query(collections_books).filter_by(
    collectionId = collection.id,
    bookId = book.id
  ).first()

  if collection_book:
    db.session.execute(
      collections_books.delete().where(
        collections_books.c.collectionId == collection.id,
        collections_books.c.bookId == book.id
      )
    )

    db.session.commit()

    return {'message': 'Book has been removed from collection!'}
  else:
    return {'message': 'Book not found in collection!'}, 404

#GET view all of current user's collections
@collection_routes.route('/current')
@login_required
def user_collections():
  return {'collections': current_user.get_collections()}
