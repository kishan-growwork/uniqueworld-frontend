import actions from "./actions"

const initialState = {
    client: null,
    error: null,
    loading: false,
    isSuccess: false,
    isOpenInterviewReqSentPopup: false
}

export const clientReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_CLIENT:
            state.client = action.payload
            return state.client
        case actions.SET_ERROR:
            state.error = action.payload
            return state.error
        case actions.CLIENT_LOADING:
            return { ...state, loading: action.payload.loading, isSuccess: false }
        case actions.CLIENT_ISSUCCESS:
            return { ...state, loading: false, isSuccess: true }
        case actions.INTERVIEW_REQUEST_POPUP:
            return { ...state, isOpenInterviewReqSentPopup: action.payload }
        default:
            return state
    }
}