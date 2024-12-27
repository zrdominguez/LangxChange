import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { clearErrors, selectUserCollections, thunkGetUserCollections} from "../../redux/collection";
import './UserCollection.css';
import CollectionCard from "./CollectionCard";
import CreateCollectionModal from "../CreateCollectionModal";
import OpenModalButton from "../OpenModalButton/OpenModalButton";

function UserCollection(){
  const dispatch = useDispatch();
  const collections = useSelector(selectUserCollections)
  const [responseMsg, setResponseMsg] = useState({})

  useEffect(() => {
    dispatch(thunkGetUserCollections())
  },[dispatch, collections.length])

  return (
    <div className="user-collections">
      <h2 style={{color:"white"}} >My Collections</h2>
      <div className="res-msg" onClick={()=>setResponseMsg({})}>
        {responseMsg?.message &&
        <p>{responseMsg.message}</p>
        }
      </div>
      <div className="cards-container">
        {collections.length > 0 &&
        collections.map( collection =>
        <CollectionCard key={collection.id}
        collection={collection} setResponseMsg={setResponseMsg}/>)
        }
        <div id="create-collection">
          <OpenModalButton
            buttonText="+"
            modalComponent={<CreateCollectionModal />}
            onModalClose={() => dispatch(clearErrors())}
          />
        </div>
      </div>
    </div>
  )
}

export default UserCollection
