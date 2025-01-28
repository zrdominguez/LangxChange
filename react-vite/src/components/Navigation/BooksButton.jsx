import { useRef } from "react";
import { NavLink } from "react-router-dom";

function BooksButton({isOpen, toggleMenu, closeMenu}) {
  const ulRef = useRef(null);
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
          >English</NavLink></li>
          <li><NavLink to={'/books/sp'}
          onClick={closeMenu}
          id="spanish-link"
          >Spanish</NavLink></li>
          <li><NavLink to={'/books/jp'}
          onClick={closeMenu}
          id="japanese-link"
          >Japanese</NavLink></li>
        </ul>
      )}
    </>
  );
}

export default BooksButton;
