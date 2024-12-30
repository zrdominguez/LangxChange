import { useDispatch, useSelector } from "react-redux"
import { selectBookErrors, thunkAddBookToCollection } from "../../redux/books"
import { useModal } from "../../context/Modal"

function AddCollectionCard({collection, bookId}){
  const dispatch = useDispatch()
  const {closeModal} = useModal()
  const errors = useSelector(selectBookErrors)

  const handleAddBook = async e => {
    e.preventDefault()
    try{
      await dispatch(thunkAddBookToCollection(collection.id, bookId))
      closeModal()
    }catch(e){
      console.log(e)
    }
  }

  console.log(errors)

  return(
    <div>
      <img />
      <p>{collection.name}</p>
      <button
      onClick={handleAddBook}
      >+</button>
    </div>
  )

}

export default AddCollectionCard
