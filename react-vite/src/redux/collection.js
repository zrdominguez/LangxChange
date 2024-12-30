import {createSelector} from 'reselect';

const LOAD_USER_COLLECTIONS = 'collections/load_user_collections';
//const LOAD_COLLECTION_BY_ID = 'collections/load_collection_by_id';
const EDIT_COLLECTION_NAME = 'collections/edit_collection_name';
const CREATE_COLLECTION = 'collections/create_collection';
const DELETE_COLLECTION = 'collections/delete_collection';

const COLLECTION_ERRORS = 'collections/collection_errors';
const CLEAR_ERRORS = 'collections/clear_errors'

//action creators
export const loadUserCollections = collections => (
  {
    type: LOAD_USER_COLLECTIONS,
    collections
  }
)

export const editCollectionName = collection => (
  {
    type: EDIT_COLLECTION_NAME,
    collection
  }
)

export const createCollection = collection => (
  {
    type: CREATE_COLLECTION,
    collection
  }
)

export const deleteCollection = collectionId => (
  {
    type: DELETE_COLLECTION,
    collectionId
  }
)

export const collectionErrors = errors => (
  {
    type: COLLECTION_ERRORS,
    errors
  }
)

export const clearCollectionsErrors = () => (
  {
    type: CLEAR_ERRORS
  }
)

//thunk action creators
export const thunkGetUserCollections = () => async dispatch => {
  try{
    const res = await fetch('/api/collections/current');
    if (res.ok) {
      const collections = await res.json()
      dispatch(loadUserCollections(collections))
    }
    else if (res.status < 500) {
      const errorMessages = await res.json();
      console.error("Validation Errors:", errorMessages);
      throw new Error(errorMessages.message || 'Something went wrong!')
    }else {
      throw new Error('There was a Server Error!')
    }
  } catch (e) {
    console.error("Error in thunkGetUserCollections:", e);
    dispatch(collectionErrors(e))
  }
}

export const thunkUpdateCollectionName = collection => async dispatch => {
  try {
    const res = await fetch(`/api/collections/${collection.id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({collectionName: collection.name})
      }
    )
    if(res.ok){
      const updateMsg = await res.json()
      dispatch(editCollectionName(collection))
      dispatch(thunkGetUserCollections())
      return updateMsg
    } else if (res.status < 500){
      const errorMessages = await res.json();
      console.error("Validation Errors:", errorMessages);
      throw {
          message: errorMessages.message || 'Something went wrong!',
          errors: errorMessages.errors || 'There was an error!'
        }
    }else {
      throw new Error('There was a Server Error!')
    }
  } catch (e){
    console.error("Error in thunkUpdateCollectionName:", e);
    dispatch(collectionErrors(e))
    throw e
  }
}

export const thunkCreateCollection = collection => async dispatch =>{
  try{
    const res = await fetch(`/api/collections/new`,
      {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(collection)
      }
    )
    if(res.ok){
      const newCollection = await res.json()
      dispatch(createCollection(newCollection))
      return newCollection
    } else if (res.status < 500){
      const errorMessages = await res.json();
      console.error("Validation Errors:", errorMessages);
      throw {
        message: errorMessages.message || 'Something went wrong!',
        errors: errorMessages.errors || 'There was an error!'
      }
    } else {
      throw new Error('There was a Server Error!')
    }
  } catch(e) {
    console.error("Error in thunkCreateCollection:", e);
    await dispatch(collectionErrors(e));
    throw e;
  }
}

export const thunkDeleteCollection = collectionId => async dispatch => {
  try{
    const res = await fetch(`/api/collections/${collectionId}`,
      {
        method:'DELETE',
        headers: {'Content-Type': 'application/json'},
      }
    )
    if(res.ok){
      const deleteMsg = await res.json()
      dispatch(deleteCollection(collectionId))
      return deleteMsg
    } else if (res.status < 500){
      const errorMessages = await res.json();
      console.error("Validation Errors:", errorMessages);
      throw {
        errors: errorMessages.errors || 'There was an error!'
      }
    }else {
      throw new Error('There was a Server Error!')
    }
  } catch (e){
    console.error("Error in thunkDeleteCollection:", e);
    dispatch(collectionErrors(e))
  }
}





//selectors
export const selectCollectionsObj = state => state.collections;
export const selectUserCollections = createSelector(selectCollectionsObj, collections => Object.values(collections.userCollections))
export const selectErrors = createSelector(selectCollectionsObj, collections => collections.errors)
export const selectCollectionById = createSelector([selectCollectionsObj, (state,id) => id],
  (collection, id) => collection.userCollections[id]
)


//reducer
const initialState = {
  userCollections: {},
  errors: {},
}

function collectionsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_COLLECTIONS:{
      const collections = action.collections.collections
      const userCollections = {};
      if(collections){
        collections.forEach(collection => userCollections[collection.id] = collection)
        return{
          ...state,
          loading: false,
          userCollections,
        }
      }
      return state
    }
    case EDIT_COLLECTION_NAME:{
      const {collection} = action
      return {
        ...state,
        loading: false,
        userCollections:{
          [collection.id]: collection
        }
      }
    }
    case CREATE_COLLECTION:{
      const {collection} = action;
      return {
        ...state,
        loading: false,
        userCollections:{
          [collection.id]: collection
        }
      }
    }
    case DELETE_COLLECTION:{
      const {collectionId} = action;
      const copyState = {...state}
      delete copyState.userCollections[collectionId]
      return copyState
    }
    case COLLECTION_ERRORS:{
      const {errors} = action.errors
      return {
        ...state,
        errors: errors
      }
    }
    case CLEAR_ERRORS:{
      return {
        ...state,
        errors:{}
      }
    }

    default:
      return state;
  }
}

export default collectionsReducer
