import { useSelector } from "react-redux"
import "./AddBook.css"
import { selectUserCollections } from "../../redux/collection"
import AddCollectionCard from "./AddCollectionCard"
function AddBookModal(){
  const collections = useSelector(selectUserCollections)
  return(
    <div>
      {collections && collections.map(collection => {
        <AddCollectionCard key={collection.id} collection={collection}/>
      })}
    </div>
  )
}

export default AddBookModal
