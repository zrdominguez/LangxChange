function ReviewList({review}){
  return (
    <li className="review-items">
      <img />
      <p>{review.review}</p>
      <p>{review.rating}</p>
    </li>
  )
}

export default ReviewList
