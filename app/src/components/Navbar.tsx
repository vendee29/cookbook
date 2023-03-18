import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { TemporaryDrawer } from "./Drawer";
import chefHat from "../assets/chef-hat.svg"

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
        {state.user && <TemporaryDrawer/>}
        <Link to="/">
          <h1>CookIt</h1>
        </Link>
        <img src={chefHat} alt="logo" width={50} />
        </div>
        <nav>
          {state.user && (
            <div>
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
