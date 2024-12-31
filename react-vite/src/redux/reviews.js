import { createSelector } from 'reselect'
const LOAD_BOOK_REVIEWS = 'reviews/load_book_reviews';
const CREATE_BOOK_REVIEW = `reviews/create_book_review`;
const DELETE_REVIEW = 'reviews/delete_review';
const REVIEW_ERRORS = 'reviews/review_errors';
const CLEAR_ERRORS = 'reviews/clear_errors';

//action creators

export const loadBookReviews = reviews => (
  {
    type: LOAD_BOOK_REVIEWS,
    reviews
  }
)

export const createBookReview = review => (
  {
    type: CREATE_BOOK_REVIEW,
    review
  }
)

export const deleteReview = reviewId => (
  {
    type: DELETE_REVIEW,
    reviewId
  }
)

export const reviewErrors = err => (
  {
    type: REVIEW_ERRORS,
    err
  }
)

export const clearReviewsErrors = () => (
  {
    type: CLEAR_ERRORS,
  }
)

//thunk action creators
export const thunkGetBookReviews = bookId => async dispatch => {
  try{
    const res = await fetch(`/api/books/${bookId}/reviews`)

    if (res.ok) {
      const reviews = await res.json()
      dispatch(loadBookReviews(reviews))
    }
    else if (res.status < 500) {
      const errorMessages = await res.json();
      console.error("Validation Errors:", errorMessages);
      throw errorMessages
    }else {
      throw new Error('There was a Server Error!')
    }
  } catch (e) {
    console.error("Error in thunkGetBookReviews:", e);
    dispatch(reviewErrors(e))
  }
}

export const thunkCreateReview = (bookId, review) => async dispatch =>{
  try{
    const res = await fetch(`/api/books/${bookId}/reviews`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
      }
    )
    if (res.ok) {
      const newReview = await res.json()
      await dispatch(createBookReview(newReview))
      return newReview;
    }
    else if (res.status < 500) {
      const errorMessages = await res.json();
      console.error("Validation Errors:", errorMessages);
      throw errorMessages.errors || errorMessages
    }else {
      throw new Error('There was a Server Error!')
    }
  }catch(e){
    console.error("Error in thunkCreateReview:", e);
    await dispatch(reviewErrors(e))
    throw e
  }
}

export const thunkDeleteReview = reviewId => async dispatch => {
  try{
    const res = await fetch(`/api/reviews/${reviewId}`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }
    )
    if (res.ok) {
      const deleteMsg = await res.json()
      await dispatch(deleteReview(reviewId))
      return deleteMsg;
    }
    else if (res.status < 500) {
      const errorMessages = await res.json();
      console.error("Validation Errors:", errorMessages);
      throw errorMessages.errors || errorMessages
    }else {
      throw new Error('There was a Server Error!')
    }
  }catch(e){
    console.error("Error in thunkDeleteReview:", e);
    await dispatch(reviewErrors(e))
    throw e
  }
}

//selectors
export const selectReviews = state => state.reviews;
export const selectReviewsArray = createSelector(
  selectReviews, reviews => Object.values(reviews.bookReviews)
)
export const selectReviewErrors = createSelector(
  selectReviews, reviews => reviews.errors
)

//reducer
const initialState = {
  bookReviews:{},
  userReview:{},
  errors:{}
}

function reviewsReducer(state = initialState, action){
  switch(action.type){
    case LOAD_BOOK_REVIEWS: {
      const {reviews} = action.reviews
      const bookReviews = {}
      if(reviews){
        reviews.forEach(review => bookReviews[review.id] = review)
      }
      return {
        ...state,
        bookReviews
      }
    }
    case CREATE_BOOK_REVIEW:{
      const {review} = action.review
      return {
        ...state,
        bookReviews:{
        ...state.bookReviews,
        [review.id] : review
        }
      }
    }
    case DELETE_REVIEW:{
      const {reviewId} = action
      const copyState = {...state}
      delete copyState.bookReviews[reviewId]
      return copyState
    }
    case REVIEW_ERRORS:{
      const error = action.err
      console.log(Object.values(error))
      return {
        ...state,
        errors: error
      }
    }

    case CLEAR_ERRORS:{
      return {
        ...state,
        errors:{}
      }
    }

    default:
      return state
  }
}

export default reviewsReducer
