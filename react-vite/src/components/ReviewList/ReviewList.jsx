import "./Review.css"
import { FaUserCircle } from 'react-icons/fa';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { thunkDeleteReview } from "../../redux/reviews";
function ReviewList({review, owner}){

  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await fetch(`/api/reviews/${review.id}/users`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch user");
        }

        const usernameData = await response.json();
        setUsername(usernameData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUsername();
  }, [review]);

  if (error) {
    return <p className="error-text">Error: {error}</p>;
  }

  const handleDeleteReview = () => {
    dispatch(thunkDeleteReview(review.id))
  }

  return (
    <li className="review-items" style={{listStyle: 'none'}}>
      {owner && <button onClick={handleDeleteReview} id="review-delete">X</button>}
      <span id="username-and-profile">
        <FaUserCircle id="profile-icon"></FaUserCircle>
        <p>{username.username}</p>
      </span>
      <p>{`review: ${review.review}`}</p>
      <p style={{marginBottom:'.5em'}}>{`rating: ${review.rating}`}</p>
    </li>
  )
}

export default ReviewList
