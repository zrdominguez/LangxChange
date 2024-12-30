import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { selectCollectionBooks, thunkGetCollectionBooks } from "../../redux/books";
import BookCard from "../BookCard";
import "./CollectionList.css"
import { selectCollectionById, thunkGetUserCollections } from "../../redux/collection";



function CollectionList(){
  const dispatch = useDispatch()
  const { collectionId } = useParams();
  const books = useSelector(selectCollectionBooks)
  const collection = useSelector(state => selectCollectionById(state, collectionId))

  useEffect(() =>{
    dispatch(thunkGetUserCollections())
  }, [dispatch])

  useEffect(()=>{
    dispatch(thunkGetCollectionBooks(collectionId))
  },[dispatch, collectionId])


  return(
    <div className='book-list-page'>
      <div className="book-list-column">
        <h1>{`${collection?.name}`}</h1>
        {books.length > 0 &&
          books.map(book =>
            <BookCard key={book.id} book={book} collectionId={collectionId}/>
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
export default CollectionList
