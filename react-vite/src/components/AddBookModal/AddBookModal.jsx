import { useDispatch, useSelector } from "react-redux"
import "./AddBookModal.css"
import { selectUserCollections, thunkGetUserCollections } from "../../redux/collection"
import AddCollectionCard from "./AddCollectionCard"
import CreateCollectionModal from "../CreateCollectionModal"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import { useEffect } from "react"
import { clearBooksErrors } from "../../redux/books"
function AddBookModal({bookId}){
  const collections = useSelector(selectUserCollections)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(thunkGetUserCollections())
  },[dispatch])

  return(
    <div>
      {collections.length ? collections.map(collection =>
        <AddCollectionCard key={collection.id} collection={collection} bookId={bookId}/>
      ):
      <div id="create-collection">
        <h1 style={{color:"black"}}>No Collections</h1>
        <OpenModalButton
          buttonText="+"
          modalComponent={<CreateCollectionModal />}
          onModalClose={() => dispatch(clearBooksErrors())}
        />
      </div>
    }
    </div>
  )
}

export default AddBookModal
