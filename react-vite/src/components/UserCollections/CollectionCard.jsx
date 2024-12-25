import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, selectErrors, thunkDeleteCollection, thunkUpdateCollectionName } from "../../redux/collection";

function CollectionCard({collection, setResponseMsg}){
  const [isEditing, setIsEditing] = useState(false);
  const [collectionName, setCollectionName] = useState(collection.name);
  const collectionErrors = useSelector(selectErrors);
  const [errors, setErrors] = useState({})

  const dispatch = useDispatch();

  const handleDelete = () => {
   dispatch(thunkDeleteCollection(collection.id))
   .then(res => res?.message ? setResponseMsg(res.message):null)
  }

  const toggleEdit = () => {
    setIsEditing(true);
  }

  const handleInput = e => {
    setCollectionName(e.target.value);
  }

  const handleBlur = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Skip blur logic if the related target is the Confirm button
    if (e.relatedTarget && e.relatedTarget.tagName === 'BUTTON') {
      return;
    }

    setIsEditing(false);
    dispatch(clearErrors());
    setErrors({});
    setCollectionName(collection.name);
  };

  const handleConfirm = async e => {
    e.preventDefault();
    e.stopPropagation();

    if(collection.name === collectionName) {
      setIsEditing(false)
      dispatch(clearErrors())
      return
    }

    const response = await dispatch(thunkUpdateCollectionName({...collection, name: collectionName}))
    if(!response){
      setCollectionName(collection.name)
      setErrors(collectionErrors)
    }else {
      console.log('if okisjaoifnsiapkjsfi')
      setErrors({})
      dispatch(clearErrors())
      setResponseMsg(response)
      setIsEditing(false)
    }
  }


  return(
    <div className="collection-card" style={{backgroundColor:"white"}}>
      <button onClick={handleDelete}>X</button>
      <img />
      {isEditing ?
        <div>
          <input
          type="text"
          value={collectionName}
          onChange={handleInput}
          onBlur={handleBlur}
          autoFocus
          />
          <button
          onMouseDown={handleConfirm}
          >Confirm</button>
        </div>
        :
        <>
          <button onClick={toggleEdit}>Edit</button>
          <p>{collection.name}</p>
        </>
      }
      {errors.collectionName && <p>{errors.collectionName.toString()}</p>}
      <p>{collection.lang}</p>
    </div>
  )
}

export default CollectionCard
