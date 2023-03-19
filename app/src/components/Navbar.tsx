import { Link } from "react-router-dom";

import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { TemporaryDrawer } from "./Drawer";

import chefHatIcon from "../assets/chef-hat.svg";

export const Navbar = () => {
  const { logout } = useLogout();
  const { state } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <div className="navbar-left">
          <TemporaryDrawer disabled={Boolean(!state.user)}/>
          <Link to="/">
            <h1>CookIt</h1>
          </Link>
          <img src={chefHatIcon} alt="logo" width={50} />
        </div>
        <nav>
          {state.user && (
            <div className="navbar-right">
              <span>{state.user?.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!state.user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
