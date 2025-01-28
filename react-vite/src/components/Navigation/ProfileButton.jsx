import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink, useNavigate } from "react-router-dom";

function ProfileButton({isOpen, toggleMenu, closeMenu}) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();
  const navigate = useNavigate()

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    navigate("/")
  };

  return (
    <>
      <button onClick={e => {
        e.stopPropagation();
        toggleMenu();
      }}>
        {user ? <FaUserCircle className="profile-icon"/> : <h3>Join Now</h3>}
      </button>
      {isOpen && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
              <li>
                <NavLink id="username-link" to={`/users/${user.id}/${user.username}/collections`} onClick={closeMenu}>{user.username}</NavLink>
              </li>
              <li>
                <button id="logout-btn" onClick={logout}>Log Out</button>
              </li>
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
