import { useNavigate } from 'react-router-dom';
import './BookCard.css'
import { FaStar } from "react-icons/fa";

function BookCard({book, collection}){
  const navigate = useNavigate()

  const handleNav = () => {
    navigate(`/books/${book.id}/details`)
  }

  return(
    <div className="book-card">
      <img src={`${book.imgUrl}`} onClick={handleNav}/>
      {collection && <button>X</button>}
      <ul className='book-name-author'>
        <li style={{textWrap:'wrap'}}>{`${book.name}`}</li>
        <li>{`Score: ${book.avgRating}  `}<FaStar style={{color:'gold'}}/></li>
        <li>{`${book.author}`}</li>
      </ul>
    </div>
  )
}

export default BookCard
