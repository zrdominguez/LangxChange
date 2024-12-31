import { useRef, useState, useEffect } from "react"
import { useDispatch } from "react-redux";
import { clearCollectionsErrors, thunkDeleteCollection, thunkUpdateCollectionName } from "../../redux/collection";
import { NavLink } from "react-router-dom";
import { FaRegFileImage } from "react-icons/fa";

function CollectionCard({collection, setResponseMsg}){
  const [isEditing, setIsEditing] = useState(false);
  const [collectionName, setCollectionName] = useState(collection.name);
  const [errors, setErrors] = useState({})
  const myRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    function handleClickOutside(event) {
      if (myRef.current && !myRef.current.contains(event.target)) {
        setErrors({})
        dispatch(clearCollectionsErrors())
        setIsEditing(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch]);

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

  const handleEnter = async e => {
    if(e.key == "Enter"){
      try{
        if(collectionName != collection.name){
          await dispatch(thunkUpdateCollectionName({...collection, name: collectionName}));
        }
        setErrors({})
        dispatch(clearCollectionsErrors())
        setIsEditing(false)
      } catch(err){
        setCollectionName(collection.name)
        console.log(err)
        setErrors(err.errors)
      }
    }
  }


  return(
    <div className="collection-card" style={{backgroundColor:"white"}}>
      <button onClick={handleDelete} className="delete-collection">X</button>
      <NavLink to={`/collections/${collection.id}/books`} id="img-link">
        {collection.books[0] ? <img src={collection.books[0].imgUrl} />:<FaRegFileImage id="no-image-icon"></FaRegFileImage>}
      </NavLink>
      <div className="collection-info">
        {isEditing ?
          <div>
            <input
            type="text"
            ref={myRef}
            value={collectionName}
            onChange={handleInput}
            onKeyDown={handleEnter}
            autoFocus
            />
          </div>
          :
          <>
            <button onClick={toggleEdit} id="edit-button">Edit Collection Name</button>
            <p>{`Collection Name: ${collection.name}`}</p>
          </>
        }
        {errors.collectionName && <p>{errors.collectionName.toString()}</p>}
        <p>{`Language: ${collection.lang}`}</p>
      </div>
    </div>
  )
}

export default CollectionCard
