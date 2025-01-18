import { useDispatch, useSelector } from "react-redux"
import { selectBookDetails, thunkGetBookById } from "../../redux/books"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {Hourglass} from 'react-loader-spinner';

import "./BookDetails.css"
import ReviewList from "../ReviewList"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import ReviewModal from "../ReviewModal/ReviewModal"
import { clearReviewsErrors, selectReviewsArray, selectReviewsLoading, thunkGetBookReviews } from "../../redux/reviews"
import { selectCurrentUser } from "../../redux/session"
import AddBookModal from "../AddBookModal"
import { clearCollectionsErrors } from "../../redux/collection"

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
  const loadingReviews = useSelector(selectReviewsLoading)
  const [showReview, setShowReview] = useState(true)

  useEffect(() => {
    dispatch(thunkGetBookById(bookId))
    dispatch(thunkGetBookReviews(bookId))
  },[dispatch, bookId])

  useEffect(() => {
    if(reviews && user){
      reviews.find(review => review.userId === user.id) ? setShowReview(false) : setShowReview(true)
    }
  }, [reviews, user])



  if(loadingReviews){
    return(
      <div style={{display:'flex', justifyContent:'center', marginTop:'10em', marginBottom:'10em'}}>
        {loadingReviews && <Hourglass />}
      </div>
    )
  }

  return(
    <div className="book-details-page" style={{marginBottom: '2em'}}>
      <section className="details-section">
        <div className="book-portrait">
          <img src={book.imgUrl}/>
          <div className="book-info">
            {user &&
              <span id="modal-buttons">
                <OpenModalButton
                modalComponent={<AddBookModal bookId={book.id}/>}
                buttonText={'Add to Collection'}
                onModalClose={() => dispatch(clearCollectionsErrors())}
                />
                { showReview &&
                <OpenModalButton
                  modalComponent={<ReviewModal bookId={bookId}/>}
                  buttonText={'Review'}
                  onModalClose={() => dispatch(clearReviewsErrors())}
                />
                }
              </span>
            }
            <ul className="book-info-list">
              <li>{`Author: ${book.author}`}</li>
              <li>{`Publisher: ${book.publisher}`}</li>
              <li>{`Released On: ${book.publishDate}`}</li>
              <li>
                {`Genres: ${book.genre && arrayToCommaSeparatedString(book.genre)}`}
              </li>
            </ul>
          </div>
        </div>
        <div className="summary-reviews">
          <section className="summary-section" >
            <h1>{book.name}</h1>
            <p>{book.summary}</p>
          </section>
          <section className="review-section" >
            <h2>Reviews: </h2>
            <ul id="review-list">
              {reviews && reviews.map(review => <ReviewList key={review.id} review={review}
              owner={user ? user.id == review.userId : false}/>)}
            </ul>
          </section>
        </div>
      </section>
    </div>
  )
}

export default BookDetails
