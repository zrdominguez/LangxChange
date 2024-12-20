import { useState, useEffect, useRef } from "react";

function BooksButton() {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);



  return (
    <>
      <button onClick={toggleMenu}>
        <h3>Books</h3>
      </button>
      {showMenu && (
        <ul className={"book-lang-dropdown"} ref={ulRef}>
            <li>English</li>
            <li>Spanish</li>
            <li>Japanese</li>
        </ul>
      )}
    </>
  );
}

export default BooksButton;
