import { all, takeEvery, put } from "redux-saga/effects";
import actions from "./actions";
// import { tostifySuccess } from "../../components/Tostify";
import {
  decreaseResumeDownload,
  getSubscriptionForClient,
} from "../../apis/subscription";

function* WATCH_DECREASE_RESUME_DOWNLOADING(action) {
  try {
    yield put({
      type: actions.SET_SUBSCRIPTION_LODING,
      payload: true,
    });
    const resp = yield decreaseResumeDownload(action.payload);

    if (resp?.currentPlan) {
      window.open(action.payload?.url);
      yield put({
        type: actions.SET_SUBSCRIPTION_STATE,
        payload: {
          ...resp,
          isLoading: false,
        },
      });
    } else if (resp?.isSavedCandidate) {
      window.open(action.payload?.url);
    } else if (resp?.msg) {
      yield put({
        type: actions.RESUME_COUNT_FINISH,
        payload: true,
      });
    }
  } catch (error) {}
  yield put({
    type: actions.SET_SUBSCRIPTION_LODING,
    payload: false,
  });
}

function* WATCH_GET_SUBSCRIPTION(action) {
  try {
    const { subscriptionId } = action.payload;
    const res = yield getSubscriptionForClient(subscriptionId);
    yield put({
      type: actions.SET_SUBSCRIPTION_STATE,
      payload: {
        currentSubscription: res,
        currentPlan: res?.plan,
      },
    });
  } catch (error) {}
}

export default function* rootSaga() {
  yield all([
    takeEvery(
      actions.DECREASE_RESUME_DOWNLOADING,
      WATCH_DECREASE_RESUME_DOWNLOADING
    ),
    takeEvery(actions.GET_SUBSCRIPTION, WATCH_GET_SUBSCRIPTION),
  ]);
}
