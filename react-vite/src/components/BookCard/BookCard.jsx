import { useNavigate } from 'react-router-dom';
import './BookCard.css'
import { FaStar } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { thunkRemoveBookFromCollection } from '../../redux/books';
import { useState } from 'react';

function BookCard({book, collectionId = false}){
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showTooltip, setShowTooltip] = useState(false)

  const handleNav = () => {
    navigate(`/books/${book.id}/details`)
  }

  const handleDelete = () => {
    dispatch(thunkRemoveBookFromCollection(collectionId, book.id))
  }

  return(
    <div className="book-card">
      <div
        className="book-img-container"
        style={{ position: 'relative' }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <img src={`${book.imgUrl}`} onClick={handleNav} />
        {showTooltip && (
          <div className="tooltip">
            {book.difficulty}
          </div>
        )}
      </div>
      {collectionId && <button id='delete-button' onClick={handleDelete}>Remove</button>}
      <ul className="book-name-author">
        <li style={{ textWrap: 'wrap' }}>{`${book.name}`}</li>
        <li>{`Score: ${book.avgRating ? book.avgRating : "--"}  `}<FaStar style={{ color: 'gold' }} /></li>
        <li>{`by ${book.author}`}</li>
      </ul>
    </div>
  )
}

export default BookCard
