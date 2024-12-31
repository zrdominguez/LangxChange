import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import {IoMdStarOutline, IoMdStar}  from "react-icons/io";
import { selectReviewErrors, thunkCreateReview } from "../../redux/reviews";
import { useModal } from "../../context/Modal";
import "./ReviewModal.css"

function ReviewModal({bookId}){
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [clicked, setClicked] = useState(false)
  const errors = useSelector(selectReviewErrors)
  const { closeModal } = useModal()

  const handleSubmit = async e => {
    e.preventDefault()
    try{
      await dispatch(thunkCreateReview(bookId, {review, rating}))
      closeModal()
    }catch(e){
      console.log("Caught")
    }
  }

  const handleChangeReview = e =>{
    setReview(e.target.value)
  }

  console.log(Object.values(errors))

  return(
    <div className="review-modal">
      <form className="review-form"
      onSubmit={handleSubmit}
      >
        <h1>Make a Review</h1>
        {errors.message && Object.values(errors).length == 1 && <p className="error-text">{errors.message}</p>}
        {errors.rating && <p className="error-text">{`Rating: ${errors.rating.toString()}`}</p>}
        <label id='review-label' for="review-input">Review:</label>
        <textarea id="review-input"
        type="text"
        value={review}
        onChange={handleChangeReview}
        required
        >
        </textarea>

        <div className='star-rating'>
          <label>Rating: </label>
          <div className="star-container">
            {[...Array(5)].map((el, i) => (
              <span
                key={i}
                onClick={() => {
                  setRating(i + 1)
                  setClicked(true)
                }}
                style={{ cursor: 'pointer' }}
              >
                {rating >= (i + 1) ? (
                  <IoMdStar
                  id={`full-star${i + 1}`}
                  onMouseLeave={() => {
                  if(!clicked){
                    setRating(0)
                  }
                    setClicked(false)
                  }}
                  />
                ) :
                (
                  <IoMdStarOutline
                   id={`star${i + 1}`}
                   onMouseOver={()=> setRating(i + 1)}
                   />
                )}
              </span>
            ))}
          </div>
        </div>

        <button
        type="submit"
        >Submit</button>
      </form>
    </div>
  )
}

export default ReviewModal
