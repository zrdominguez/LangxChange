import { useDispatch, useSelector } from "react-redux"
import { selectBookDetails, thunkGetBookById } from "../../redux/books"
import { useEffect } from "react"
import { useParams } from "react-router-dom"

import "./BookDetails.css"
import ReviewList from "../ReviewList"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import ReviewModal from "../ReviewModal/ReviewModal"
import { clearErrors, selectReviewsArray, thunkGetBookReviews } from "../../redux/reviews"
import { selectCurrentUser } from "../../redux/session"

function arrayToCommaSeparatedString(arr) {
  if (arr.length === 0) return "";
  if (arr.length === 1) return arr[0];
  return `${arr.slice(0, -1).join(", ")}, ${arr[arr.length - 1]}`;
}

function BookDetails(){
  const book = useSelector(selectBookDetails)
  const reviews = useSelector(selectReviewsArray)
  const dispatch = useDispatch()
  const {bookId} = useParams()
  const user = useSelector(selectCurrentUser)

  useEffect(() => {
    dispatch(thunkGetBookById(bookId))
    dispatch(thunkGetBookReviews(bookId))
  },[dispatch, bookId])

  return(
    <div className="book-details-page">
      <section className="details-section">
        <div className="book-portrait">
          <img src={book.imgUrl}/>
          <div style={{backgroundColor:"darkgray"}}>
            {user &&
              <span>
                <button>Add</button>
                <OpenModalButton
                  modalComponent={<ReviewModal bookId={bookId}/>}
                  buttonText={'Review'}
                  onModalClose={() => dispatch(clearErrors())}
                />
              </span>
            }
            <ul className="book-info-list">
              <li>{book.author}</li>
              <li>{book.publisher}</li>
              <li>{book.publishDate}</li>
              <li>
                {book.genre && arrayToCommaSeparatedString(book.genre)}
              </li>
            </ul>
          </div>
        </div>
        <div className="summary-title" style={{backgroundColor:"darkgray"}}>
          <h1>{book.name}</h1>
          <p>{book.summary}</p>
        </div>
      </section>
      <section className="review-section" style={{backgroundColor:"darkgray"}}>
        <h2>Reviews</h2>
        <ul>
          {reviews && reviews.map(review => <ReviewList key={review.id} review={review}/>)}
        </ul>
      </section>
    </div>
  )
}

export default BookDetails
