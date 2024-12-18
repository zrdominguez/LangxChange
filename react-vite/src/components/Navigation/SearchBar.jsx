import { FaSearch } from "react-icons/fa";

function SearchBar(){
  return (
    <div className="search-wrapper">
      <FaSearch id="search-icon"/>
      <input placeholder="Type to search..."/>
    </div>
  )
}

export default SearchBar
