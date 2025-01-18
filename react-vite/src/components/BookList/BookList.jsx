import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { selectBooksByLanguage, selectBooksLoading, thunkGetBooksByLanguage } from "../../redux/books";
import BookCard from "../BookCard";
import "./BookList.css"
import { Hourglass } from "react-loader-spinner";

const allowedLang = {'eng':'English', 'jp':'Japanese', 'sp':'Spanish'}

function BookList(){
  const dispatch = useDispatch()
  const { lang } = useParams();
  const navigate = useNavigate();
  const books = Object.values(useSelector(selectBooksByLanguage))
  const loadingBooks = useSelector(selectBooksLoading)

  useEffect(()=>{
    if (!(lang in allowedLang)){
      navigate("/")
    }else {
      dispatch(thunkGetBooksByLanguage(lang))
    }
  },[dispatch, lang, navigate])

  if(loadingBooks)
    return (
      <div style={{display:'flex', justifyContent:'center', marginTop:'10em', marginBottom:'10em'}}>
        <Hourglass />
      </div>
    )

  return(
    <div className='book-list-page'>
      <div className="book-list-column">
        <h1>{`${allowedLang[lang]}`}</h1>
        {books.length > 0 &&
          books.map(book =>
            <BookCard key={book.id} book={book}/>
          )
        }

      </div>
      <div className="genre-selection">
        <h3>Genre</h3>
        <ul className="genre-list">
          <li className="genre-item">Novel</li>
          <li className="genre-item">Fiction</li>
          <li className="genre-item">Science Fiction</li>
          <li className="genre-item">Romance</li>
          <li className="genre-item">Satire</li>
        </ul>
      </div>
    </div>
  )
}

export default BookList
