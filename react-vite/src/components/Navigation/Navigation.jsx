import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import BooksButton from "./BooksButton";
import SearchBar from "./SearchBar";

function Navigation() {

  return (
    <nav>
      <ul className="navbar">
        <li className="home-logo">
          <NavLink to="/"><img src= "https://zechariahdbucket.s3.us-east-2.amazonaws.com/langxchange-logo.png" alt="LangXchange Logo"/></NavLink>
        </li>

        <li>
          <span className="middle-links">
            <div><BooksButton /></div>
            <button><h3>Community</h3></button>
            <div><ProfileButton /></div>
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
