import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import BooksButton from "./BooksButton";
import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";


function Navigation() {
  const [showMenu, setShowMenu] = useState(null);

  const toggleMenu = menuName =>{
    setShowMenu(curr => curr === menuName ? null : menuName)
  }

  const closeMenu = () => setShowMenu(null);

  useEffect(() => {
    const handleOutsideClick = () => {
      closeMenu();
    };

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <nav>
      <ul className="navbar">
        <li className="home-logo">
          <NavLink to="/"><img src= "https://zechariahdbucket.s3.us-east-2.amazonaws.com/langxchange-logo.png" alt="LangXchange Logo"/></NavLink>
        </li>

        <li>
          <span className="middle-links">
            <div><BooksButton isOpen={showMenu === 'books'} toggleMenu={()=> toggleMenu("books")} closeMenu={closeMenu}/></div>
            <button><h3>Community</h3></button>
            <div><ProfileButton isOpen={showMenu === 'profile'} toggleMenu={()=> toggleMenu("profile")} closeMenu={closeMenu}/></div>
          </span>
        </li>

        <li>
          <SearchBar />
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
