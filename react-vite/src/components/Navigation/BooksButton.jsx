import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { thunkGetBooksByLanguage } from "../../redux/books";
import { HoverDifficulty } from "./HoverDifficutly";

function BooksButton({isOpen, toggleMenu, closeMenu}) {
  const dispatch = useDispatch();
  const ulRef = useRef(null);
  const [showHover, setShowHover] = useState(false)
  const [language, setLanguage] = useState(null)

  const handleGetBookDifficulty = async (lang, diff = null) => {
    await dispatch(thunkGetBooksByLanguage(lang, diff))
  }

  return (
    <>
      <button onClick={e => {
        e.stopPropagation();
        toggleMenu();
      }}>
        <h3>Books</h3>
      </button>
      {isOpen && (
        <ul className={"book-lang-dropdown"} ref={ulRef}>
          <li><NavLink to={'/books/eng'}
          onClick={closeMenu}
          id="english-link"
          onMouseEnter={()=> {
            setShowHover(true);
            setLanguage('eng');
          }}
            >English</NavLink></li>
          <li><NavLink to={'/books/sp'}
          onClick={closeMenu}
          id="spanish-link"
          onMouseEnter={()=> {
            setShowHover(true);
            setLanguage('sp');
          }}
          onMouseLeave={() =>setShowHover(false)}
          >Spanish</NavLink></li>
          <li><NavLink to={'/books/jp'}
          onClick={closeMenu}
          id="japanese-link"
          onMouseEnter={()=> {
            setShowHover(true);
            setLanguage('jp');
          }}
          onMouseLeave={() =>setShowHover(false)}
          >Japanese</NavLink></li>
        </ul>
      )}
    </>
  );
}

export default BooksButton;
