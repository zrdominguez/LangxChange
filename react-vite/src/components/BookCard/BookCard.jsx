import { useNavigate } from 'react-router-dom';
import './BookCard.css'
import { FaStar } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { thunkRemoveBookFromCollection } from '../../redux/books';

function BookCard({book, collectionId = false}){
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleNav = () => {
    navigate(`/books/${book.id}/details`)
  }

  const handleDelete = () => {
    dispatch(thunkRemoveBookFromCollection(collectionId, book.id))
  }

  return(
    <div className="book-card">
      <img src={`${book.imgUrl}`} onClick={handleNav}/>
      {collectionId && <button onClick={handleDelete}>X</button>}
      <ul className='book-name-author'>
        <li style={{textWrap:'wrap'}}>{`${book.name}`}</li>
        <li>{`Score: ${book.avgRating}  `}<FaStar style={{color:'gold'}}/></li>
        <li>{`${book.author}`}</li>
      </ul>
    </div>
  )
}

export default BookCard
