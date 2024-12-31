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
      window.alert(`Book has been added to collection: ${collection.name}`)
    }catch(e){
      window.alert(e.errors)
    }
  }

  console.log(errors)

  return(
    <div className="add-book">
      <img />
      <p>{collection.name}</p>
      <button
      onClick={handleAddBook}
      style={{width:'fit-content'}}
      >+</button>
    </div>
  )

}

export default AddCollectionCard
