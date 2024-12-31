from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Review, Book, User
from app.forms import EditReviewForm

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/<int:reviewId>', methods=['PUT'])
@login_required
def edit_review(reviewId):
  review = Review.query.get(reviewId)
  if review:
    if review.userId != current_user.id:
      return {'message': 'Requires proper authorization!'}, 403

    form = EditReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
      book = Book.query.get(review.bookId)
      review.review = form.review.data
      review.rating = form.rating.data

      book.calculate_avg_rating()
      db.session.commit()

      return {'review': review.to_dict()}

    if form.errors:
      return {
        "message": "Bad Request",
        "errors": form.errors
      }, 400
  else:
    return {'message': 'Review could not be found!'}, 404

@review_routes.route('/<int:reviewId>', methods=['DELETE'])
@login_required
def remove_review(reviewId):
  review = Review.query.get(reviewId)
  if review:
    if review.userId != current_user.id:
      return {'message': 'Requires proper authorization!'}, 403
    db.session.delete(review)
    db.session.commit()
    return {'message': 'Review was successfully deleted!'}
  else:
    return {'message': 'Review could not be found!'}, 404


@review_routes.route('/<int:reviewId>/users')
def get_review_user(reviewId):
  review = Review.query.get(reviewId)

  if not review:
    return {"error": "Review not found"}, 404

  user = User.query.get(review.userId)

  if not user:
    return {"error": "User not found"}, 404

  user = user.to_dict()

  return {'username': user['username']}
