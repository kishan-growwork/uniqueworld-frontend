// ** React Imports
import { Fragment, useState } from "react";

// ** Dropdowns Imports
import UserDropdown from "./UserDropdown";

// ** Third Party Components
import { Sun, Moon, Star } from "react-feather";

// ** Reactstrap Imports
import { NavItem, NavLink } from "reactstrap";
import { useSelector } from "react-redux";
import Rating from "react-rating";

const NavbarUser = (props) => {
  // ** Props
  const { skin, setSkin } = props;
  const [themeColorHover, setThemeColorHover] = useState(false);
  const name = useSelector((state) => state?.auth?.user?.name);
  const themeColor = useSelector(
    (state) => state?.agency?.agencyDetail?.themecolor
  );
  const hoverStyle = {
    color: themeColorHover ? themeColor : "#6e6b7b",
  };

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === "dark") {
      return (
        <Sun
          style={hoverStyle}
          className="ficon"
          onClick={() => setSkin("light")}
        />
      );
    } else {
      return (
        <Moon
          style={hoverStyle}
          className="ficon"
          onClick={() => setSkin("dark")}
        />
      );
    }
  };

  return (
    <>
      <Fragment>
        <div className="bookmark-wrapper d-flex align-items-center">
          <NavItem
            onMouseEnter={() => setThemeColorHover(true)}
            onMouseLeave={() => setThemeColorHover(false)}
            className="d-flex d-lg-block"
          >
            <NavLink className="nav-link-style">
              <ThemeToggler />
            </NavLink>
          </NavItem>
        </div>
        <ul className="nav navbar-nav align-items-center ms-auto">
          <h4 className="welcome " style={{ color: themeColor }}>
            Welcome back,
          </h4>{" "}
          <h3 className="welcome " style={{ color: themeColor }}>
            <strong>{name}</strong>
          </h3>
          <UserDropdown />
        </ul>
      </Fragment>
    </>
  );
};
export default NavbarUser;
