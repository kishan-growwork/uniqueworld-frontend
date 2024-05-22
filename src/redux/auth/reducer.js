import actions from "./actions";

const initialState = {
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  modal: true,
  isLoading: false,
  isOpenInactivePopup: false,
  isExpire: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_STATE:
      return { ...state, ...action.payload };
    case actions.SET_AUTH_LOADING:
      return { ...state, isLoading: action.payload };
    case actions.IS_EXPIRE:
      return { ...state, isExpire: action.payload };
    default:
      return state;
  }
};
