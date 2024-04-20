// ** React Imports
import { Link } from "react-router-dom";
import { useState } from "react";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
// import { isUserLoggedIn } from '@utils'

// ** Third Party Components
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power,
} from "react-feather";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import defaultImg from "../../../../assets/images/user-circle.svg";

// ** Default Avatar Image
// import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../../redux/auth/actions";
// import { persistor } from "../../../../redux/store";
// import { getUserAPI } from "../../../../apis/user/index"

const UserDropdown = () => {
  // ** State
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const slug = localStorage.getItem("slug");
  const user = useSelector((state) => state.auth.user);
  const themeColor = useSelector(
    (state) => state?.agency?.agencyDetail?.themecolor
  );
  const [hoverIndex, setHoverIndex] = useState(0);

  const logouthandler = async () => {
    dispatch({
      type: actions.SIGN_OUT,
    });
    setUserData(null);
  };

  const profileStyle = {
    backgroundColor: hoverIndex == 1 && `${themeColor}30`,
    color: hoverIndex == 1 && themeColor,
  };

  const logoutStyle = {
    backgroundColor: hoverIndex == 2 && `${themeColor}30`,
    color: hoverIndex == 2 && themeColor,
  };

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            img={
              user?.image?.length === 0 ||
                user?.image === "{}" ||
                user?.image === "" ||
                user?.image === null ||
                user?.image === undefined
                ? defaultImg
                : user?.image
            }
            imgHeight="40"
            imgWidth="40"
            status="online"
          />

          <span
            className="user-status"
            style={{ marginTop: "6px", textAlign: "center" }}
          >
            {(userData && userData?.role) || user?.role?.name}
          </span>
        </div>
      </DropdownToggle>
      <DropdownMenu end>
        {/* {user?.role?.name !== "Client" ? <DropdownItem tag={Link} to='/profile'>
          <User size={18} className='me-50' />
          <span className='align-middle'>Profile</span>
        </DropdownItem> : null} */}

        <DropdownItem
          style={profileStyle}
          onMouseEnter={() => setHoverIndex(1)}
          onMouseLeave={() => setHoverIndex(0)}
          tag={Link}
          to={user?.role?.name == "SuperAdmin" ? '/superadmin/profile' : `/${slug}/profile`}
        >
          <User size={18} className="me-50" />
          <span className="align-middle">Profile</span>
        </DropdownItem>

        {/* {user?.role?.name == "Client" && 
        // user?.email == "gunjan@growworkinfotech.com" && 
        (
          <DropdownItem tag={Link} to="/pricing">
            <CreditCard size={14} className="me-75" />
            <span className="align-middle">Pricing</span>
          </DropdownItem>
        )} */}
        <DropdownItem
          style={logoutStyle}
          onMouseEnter={() => setHoverIndex(2)}
          onMouseLeave={() => setHoverIndex(0)}
          tag={Link}
          to={user?.role?.name == "SuperAdmin" ? '/superadmin/login' : `/login`}
          onClick={() => logouthandler()}
        >
          <Power size={14} className="me-75" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
// // ** React Imports
// import { Link } from "react-router-dom";
// import { useState } from "react";

// // ** Custom Components
// import Avatar from "@components/avatar";

// // ** Utils
// // import { isUserLoggedIn } from '@utils'

// // ** Third Party Components
// import {
//   User,
//   Mail,
//   CheckSquare,
//   MessageSquare,
//   Settings,
//   CreditCard,
//   HelpCircle,
//   Power,
// } from "react-feather";

// // ** Reactstrap Imports
// import {
//   UncontrolledDropdown,
//   DropdownMenu,
//   DropdownToggle,
//   DropdownItem,
// } from "reactstrap";
// import defaultImg from "../../../../assets/images/user-circle.svg";

// // ** Default Avatar Image
// // import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'
// import { useDispatch, useSelector } from "react-redux";
// import actions from "../../../../redux/auth/actions";
// import { persistor } from "../../../../redux/store";
// // import { getUserAPI } from "../../../../apis/user/index"

// const UserDropdown = () => {
//   // ** State
//   const [userData, setUserData] = useState(null);
//   const dispatch = useDispatch();
//   const slug = localStorage.getItem("slug");
//   const user = useSelector((state) => state.auth.user);

//   const logouthandler = async () => {
//     window.localStorage.clear();
//     await persistor.flush();
//     dispatch({
//       type: actions.SIGN_OUT,
//     });
//     setUserData(null);
//   };
//   return (
//     <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
//       <DropdownToggle
//         href="/"
//         tag="a"
//         className="nav-link dropdown-user-link"
//         onClick={(e) => e.preventDefault()}
//       >
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Avatar
//             img={
//               user?.image?.length === 0 ||
//               user?.image === "{}" ||
//               user?.image === "" ||
//               user?.image === null ||
//               user?.image === undefined
//                 ? defaultImg
//                 : user?.image
//             }
//             imgHeight="40"
//             imgWidth="40"
//             status="online"
//           />

//           <span
//             className="user-status"
//             style={{ marginTop: "6px", textAlign: "center" }}
//           >
//             {(userData && userData?.role) || user?.role?.name}
//           </span>
//         </div>
//       </DropdownToggle>
//       <DropdownMenu end>
//         {/* {user?.role?.name !== "Client" ? <DropdownItem tag={Link} to='/profile'>
//           <User size={18} className='me-50' />
//           <span className='align-middle'>Profile</span>
//         </DropdownItem> : null} */}

//         <DropdownItem tag={Link} to={`/${slug}/profile`}>
//           <User size={18} className="me-50" />
//           <span className="align-middle">Profile</span>
//         </DropdownItem>

//         {/* {user?.role?.name == "Client" &&
//         // user?.email == "gunjan@growworkinfotech.com" &&
//         (
//           <DropdownItem tag={Link} to="/pricing">
//             <CreditCard size={14} className="me-75" />
//             <span className="align-middle">Pricing</span>
//           </DropdownItem>
//         )} */}
//         <DropdownItem tag={Link} to="/login" onClick={() => logouthandler()}>
//           <Power size={14} className="me-75" />
//           <span className="align-middle">Logout</span>
//         </DropdownItem>
//       </DropdownMenu>
//     </UncontrolledDropdown>
//   );
// };

// export default UserDropdown;
