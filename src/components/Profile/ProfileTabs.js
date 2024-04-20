// ** Reactstrap Imports
import { Nav, NavItem, NavLink } from "reactstrap";

// ** Icons Imports
import { User, Anchor, Share2 } from "react-feather";
import useBreakpoint from "../../utility/hooks/useBreakpoints";

const ProfileTabs = ({ activeTab, toggleTab, themecolor }) => {
  const { width } = useBreakpoint();
  console.info("-------------------------------");
  console.info("width => ", width);
  console.info("-------------------------------");
  return width > 625 ? (
    <Nav
      pills
      className="mb-2"
      style={{
        display: "flex",
      }}
    >
      <NavItem>
        <NavLink
          active={activeTab === "1"}
          onClick={() => toggleTab("1")}
          style={
            activeTab === "1"
              ? {
                  backgroundColor: themecolor,
                  color: "white",
                  borderColor: themecolor,
                  boxShadow: "0 4px 18px -4px" + themecolor,
                }
              : {}
          }
        >
          <User size={18} className="me-50" />
          <span className="fw-bold">Profile Details</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          active={activeTab === "2"}
          onClick={() => toggleTab("2")}
          style={
            activeTab === "2"
              ? {
                  backgroundColor: themecolor,
                  color: "white",
                  borderColor: themecolor,
                  boxShadow: "0 4px 18px -4px" + themecolor,
                }
              : {}
          }
        >
          <Anchor size={18} className="me-50" />
          <span className="fw-bold">Agency Details</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          active={activeTab === "3"}
          onClick={() => toggleTab("3")}
          style={
            activeTab === "3"
              ? {
                  backgroundColor: themecolor,
                  color: "white",
                  borderColor: themecolor,
                  boxShadow: "0 4px 18px -4px" + themecolor,
                }
              : {}
          }
        >
          <Share2 size={18} className="me-50" />
          <span className="fw-bold">WhatsApp</span>
        </NavLink>
      </NavItem>
    </Nav>
  ) : (
    <div
      style={{
        display: "flex",
        fontSize: "11px",
        justifyContent: "space-between",
        width: "75vw",
        marginBottom: "1rem",
      }}
    >
      <div
        active={activeTab === "1"}
        onClick={() => toggleTab("1")}
        style={
          activeTab === "1"
            ? {
                color: themecolor,
              }
            : {}
        }
      >
        Profile Details
      </div>
      <div
        active={activeTab === "2"}
        onClick={() => toggleTab("2")}
        style={
          activeTab === "2"
            ? {
                color: themecolor,
              }
            : {}
        }
      >
        Agency Details
      </div>
      <div
        active={activeTab === "3"}
        onClick={() => toggleTab("3")}
        style={
          activeTab === "3"
            ? {
                color: themecolor,
                textWrap: "wrap",
              }
            : {}
        }
      >
        WhatsApp
      </div>
    </div>
  );
};

export default ProfileTabs;
