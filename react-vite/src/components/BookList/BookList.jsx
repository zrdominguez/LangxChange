import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { selectBooksByLanguage, thunkGetBooksByLanguage } from "../../redux/books";
import BookCard from "../BookCard";

const allowedLang = {'eng':'English', 'jp':'Japanese', 'sp':'Spanish'}

function BookList(){
  const dispatch = useDispatch()
  const { lang } = useParams();
  const navigate = useNavigate();
  const books = useSelector(selectBooksByLanguage)

  useEffect(()=>{
    if (!(lang in allowedLang)){
      navigate("/")
    }else {
      dispatch(thunkGetBooksByLanguage(allowedLang[lang]))
    }
  },[dispatch])

  return(
    <div className='book-list-page'>
      <div className="book-list-column">
        <h2>{`${allowedLang[lang]}`}</h2>
        {books.length > 0 &&
          books.map(book =>
            <BookCard key={book.id} book={book} />
          )
        }
      </div>
      <div>
      </div>
    </div>
  )
}

export default BookList
