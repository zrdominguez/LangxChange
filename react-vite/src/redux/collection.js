import {createSelector} from 'reselect';

const LOAD_USER_COLLECTIONS = 'collections/load_user_collections';
const LOAD_COLLECTION_BY_ID = 'collections/load_collection_by_id';
const EDIT_COLLECTION_NAME = 'collections/edit_collection_name';
const CREATE_COLLECTION = 'collections/create_collection';
const DELETE_COLLECTION = 'collections/delete_collection';
const REMOVE_BOOK_FROM_COLLECTION = 'collections/remove_book_from_collection';
const ADD_BOOK_TO_COLLECTION = 'collections/add_books_to_collection';

//action creators
export const loadUserCollections = collections => (
  {
    type: LOAD_USER_COLLECTIONS,
    collections
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
    }
  } catch (e) {
    console.error("Error in thunkGetUserCollections:", e);
    return { server: "Something went wrong. Please try again" }
  }
}


//selectors
export const selectCollectionsObj = state => state.collections;
export const selectUserCollections = createSelector(selectCollectionsObj, collections => Object.values(collections.userCollections))


//reducer
const initialState = {
  userCollections: {},
  errors: {},
  loading: false
}

function collectionsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_COLLECTIONS:{
      const collections = action.collections.collections
      const userCollections = {};
      collections.forEach(collection => userCollections[collection.id] = collection)
      return{
        ...state,
        loading: false,
        userCollections,
      }
    }
    default:
      return state;
  }
}

export default collectionsReducer
