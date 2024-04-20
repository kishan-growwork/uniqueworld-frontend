import { all, takeEvery, put } from "redux-saga/effects";
import actions from "./actions";
import { getPlanList } from "../../apis/plans";
import { store } from "../store";

function setLoading(loading) {
  store.dispatch({
    type: actions.PLANS_LOADING,
    payload: loading
  })
}

function* WATCH_GET_ALL_PLANS() {
  try {
    setLoading(true)
    const res = yield getPlanList();
    yield put({
      type: actions.SET_PLAN_STATE,
      payload: {
        plans: res
      },
    });
    setLoading(false)
  } catch (error) {
    setLoading(false)

  }
}

export default function* rootSaga() {
  yield all([

    takeEvery(actions.GET_ALL_PLANS, WATCH_GET_ALL_PLANS),
  ]);
}
