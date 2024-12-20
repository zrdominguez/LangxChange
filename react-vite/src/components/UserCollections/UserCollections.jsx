import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { selectUserCollections, thunkGetUserCollections } from "../../redux/collection";
import CollectionCard from "./CollectionCard";

function UserCollection(){
  const dispatch = useDispatch();
  const collections = useSelector(selectUserCollections)

  useEffect(() => {
    dispatch(thunkGetUserCollections())
  },[dispatch])

  console.log(collections)

  return (
    <div className="user-collections">
      <h2 style={{color:"white"}} >My Collections</h2>
      <div className="cards-container">
        {collections.length > 0 &&
        collections.map( collection => <CollectionCard key={collection.id} collection={collection} />)
        }
      </div>
    </div>
  )
}

export default UserCollection
