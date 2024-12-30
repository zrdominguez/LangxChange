import {createSelector} from 'reselect';

const LOAD_BOOKS_BY_LANGUAGE = 'books/load_books_by_language';
const LOAD_BOOK_BY_ID = 'books/load_book_by_id';
const LOAD_COLLECTION_BOOKS = 'books/load_collection_books';
const REMOVE_BOOK_FROM_COLLECTION = 'collections/remove_book_from_collection';
const BOOK_ERRORS = 'books/book_errors';
const CLEAR_ERRORS = 'books/clear_errors';

//action creators

export const loadBooksByLanguage = books => (
  {
    type: LOAD_BOOKS_BY_LANGUAGE,
    books
  }
)

export const loadBookById = book => (
  {
    type: LOAD_BOOK_BY_ID,
    book
  }
)

export const loadCollectionBooks = books => (
  {
    type: LOAD_COLLECTION_BOOKS,
    books
  }
)

export const removeBookFromCollection = bookId =>(
  {
    type: REMOVE_BOOK_FROM_COLLECTION,
    bookId
  }
)

export const bookErrors = err => (
  {
    type: BOOK_ERRORS,
    err
  }
)

export const clearErrors = () => (
  {
    type: CLEAR_ERRORS,
  }
)

//thunk action creators
export const thunkGetBooksByLanguage = lang => async dispatch => {
  try{
    const res = await fetch(`/api/books/${lang}`)

    if (res.ok) {
      const books = await res.json()
      dispatch(loadBooksByLanguage(books))
    }
    else if (res.status < 500) {
      const errorMessages = await res.json();
      console.error("Validation Errors:", errorMessages);
      throw new Error(errorMessages.message || 'Something went wrong!')
    }else {
      throw new Error('There was a Server Error!')
    }
  } catch (e) {
    console.error("Error in thunkGetBooksByLanguage:", e);
    dispatch(bookErrors(e))
  }
}

export const thunkGetCollectionBooks = collectionId => async dispatch => {
  try{
    const res = await fetch(`/api/collections/${collectionId}/books`)
    if (res.ok) {
      const books = await res.json()
      dispatch(loadCollectionBooks(books))
    }
    else if (res.status < 500) {
      const errorMessages = await res.json();
      console.error("Validation Errors:", errorMessages);
      throw new Error(errorMessages.message || 'Something went wrong!')
    }else {
      throw new Error('There was a Server Error!')
    }
  }catch(e){
    console.error("Error in thunkGetBookById:", e);
    dispatch(bookErrors(e))
  }
}

export const thunkGetBookById = bookId => async dispatch => {
  try{
    const res = await fetch(`/api/books/${bookId}`)
    if (res.ok) {
      const book = await res.json()
      dispatch(loadBookById(book))
    }
    else if (res.status < 500) {
      const errorMessages = await res.json();
      console.error("Validation Errors:", errorMessages);
      throw new Error(errorMessages.message || 'Something went wrong!')
    }else {
      throw new Error('There was a Server Error!')
    }
  }catch(e){
    console.error("Error in thunkGetBookById:", e);
    dispatch(bookErrors(e))
  }
}

export const thunkRemoveBookFromCollection = (collectionId, bookId) => async dispatch => {
  try{
    const res = await fetch(`/api/collections/${collectionId}/books`,
      {
        method:'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({bookId})
      }
    )
    if(res.ok){
      const deleteMsg = await res.json()
      dispatch(removeBookFromCollection(bookId))
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
    throw e
  }
}

//selectors
export const selectBooks = state => state.books;
export const selectBooksByLanguage = createSelector(selectBooks, books => Object.values(books.books))
export const selectBookDetails = createSelector(selectBooks, books => books.bookDetails)
export const selectBookReviews = createSelector(selectBooks, books => books.bookDetails.reviews)
export const selectCollectionBooks = createSelector(selectBooks, books => books.collectionBooks)

//reducer
const initialState = {
  books:{},
  bookDetails:{},
  collectionBooks:[],
  errors:{},
}

function booksReducer(state = initialState, action){
  switch (action.type){
    case LOAD_BOOKS_BY_LANGUAGE: {
      const { books } = action.books
      const booksObj = {}
      if (books){
        books.forEach(book => booksObj[book.id] = book)
        return{
          ...state,
          loading: false,
          books: booksObj,
        }
      }
      return state
    }
    case LOAD_BOOK_BY_ID: {
      const {book} = action
      return {
        ...state,
        bookDetails: book
      }
    }
    case LOAD_COLLECTION_BOOKS:{
      const {books} = action.books
      console.log(action.books)
      return{
        ...state,
        collectionBooks: books
      }
    }
    case REMOVE_BOOK_FROM_COLLECTION:{
      const { bookId } = action
      const copyState = {...state}
      copyState.collectionBooks = copyState.collectionBooks.filter(book => book.id != bookId)
      return copyState
    }
    default:
      return state;
  }
}

export default booksReducer
