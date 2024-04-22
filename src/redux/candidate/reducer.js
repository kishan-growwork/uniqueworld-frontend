import actions from "./actions";

export const candidateReducer = (state = [], action) => {
  switch (action.type) {
    case actions.SET_CANDIDATE:
     return {...state,...action.payload};
    case actions.SET_SELECTED_FOR_EMAIL_CANDIDATE:
      return { ...state, selectedCandidates: action.payload, isSent: false };
    case actions.IS_SENT:
      return { ...state, isSent: action.payload, isNotSent: false };
    case actions.IS_NOT_SENT:
      return { ...state, isSent: false, isNotSent: true };
    case actions.PLAN_EXPIRE:
      return { ...state, isPlanExpire: true };
    case actions.CREATE_PUBLIC_CANDIDATE_POPUP:
      return { ...state, createPublicCandidatePopup: action.payload };
    case actions.CREATE_ERROR:
      return action.payload;
    case actions.GET_CLIENT_CANDIDATE_LOADER:
      return { ...state, getClientCandidateLoader: action.payload };
    case actions.GET_BEST_MATCHES_CANDIDATE_LOADER:
      return { ...state, getBestMatchesCandidateLoader: action.payload };
    case actions.GET_SAVED_CANDIDATE_LOADER:
      return { ...state, getSavedCandidateLoader: action.payload };
    default:
      return state;
  }
};
