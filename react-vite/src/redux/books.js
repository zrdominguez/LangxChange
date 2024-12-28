import {createSelector} from 'reselect';

const LOAD_BOOKS_BY_LANGUAGE = 'books/load_books_by_language';
const LOAD_BOOK_BY_ID = 'books/load_book_by_id';
const CREATE_BOOK_REVIEW = `books/create_book_review`;
const BOOK_ERRORS = 'books/collection_errors';
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

//selectors
export const selectBooks = state => state.books;
export const selectBooksByLanguage = createSelector(selectBooks, books => Object.values(books.books))
export const selectBookById = createSelector(selectBooks, books => books.bookDetails)

//reducer
const initialState = {
  books:{},
  bookDetails:{},
  errors:{},
  loading: false
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
    default:
      return state;
  }
}

export default booksReducer
