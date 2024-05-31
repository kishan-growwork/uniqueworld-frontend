import { all, takeEvery, put, select } from "redux-saga/effects";
import actions from "./actions";
import {
  candidateStatus,
  checkCandidatePublicAPI,
  createCandidateAPI,
  createCandidateCsvAPI,
  createCandidatePublicAPI,
  deleteCandidateAPI,
  getBestMatchesCandidateAPI,
  // getAllCandidate,
  getCandidateAPI,
  getClientCandidateAPI,
  getFilterCandidate,
  getSavedCandidateAPI,
  hiredCandidateforClients,
  sendMailToCandidates,
  updateCandidateAPI,
  updateCandidatePublicAPI,
} from "../../apis/candidate";
import { tostifyError, tostifySuccess } from "../../components/Tostify";
import { candidateAPI } from "../../apis/dashBoard";
import { store } from "../store";

export function* WATCH_GET_CANDIDATE(action) {
  const resp = yield getCandidateAPI(action.payload);
  yield put({
    type: actions.SET_CANDIDATE,
    payload: resp,
  });
}
export function* WATCH_GET_SAVED_CANDIDATE(action) {
  try {
    yield put({
      type: actions.GET_SAVED_CANDIDATE_LOADER,
      payload: true,
    });
    const resp = yield getSavedCandidateAPI(action.payload);
    yield put({
      type: actions.SET_CANDIDATE,
      payload: resp,
    });
    if (resp) {
      yield put({
        type: actions.GET_SAVED_CANDIDATE_LOADER,
        payload: false,
      });
    } else {
      yield put({
        type: actions.GET_SAVED_CANDIDATE_LOADER,
        payload: false,
      });
    }
  } catch (error) {
    yield put({
      type: actions.GET_SAVED_CANDIDATE_LOADER,
      payload: false,
    });
  }
}

export function* WATCH_GET_CLIENT_CANDIDATE(action) {
  try {
    yield put({
      type: actions.GET_CLIENT_CANDIDATE_LOADER,
      payload: true,
    });
    const planId = store.getState()?.subscription?.currentPlan?.id;
    const { agencyDetail } = yield select((state) => state?.agency);
    action.payload.filterData.dataMergePermission =
      agencyDetail?.permission?.dataMerge;
    const resp = yield getClientCandidateAPI(action.payload, planId);

    if (resp) {
      yield put({
        type: actions.GET_CLIENT_CANDIDATE_LOADER,
        payload: false,
      });
    }

    if (resp.msg) {
      yield put({
        type: actions.PLAN_EXPIRE,
        payload: resp,
      });
    }
    yield put({
      type: actions.SET_CANDIDATE,
      payload: resp,
    });
  } catch (err) {
    yield put({
      type: actions.GET_CLIENT_CANDIDATE_LOADER,
      payload: false,
    });
  }
  yield put({
    type: actions.GET_CLIENT_CANDIDATE_LOADER,
    payload: false,
  });
}

export function* WATCH_GET_BEST_MATCHES_CANDIDATE(action) {
  try {
    yield put({
      type: actions.GET_BEST_MATCHES_CANDIDATE_LOADER,
      payload: true,
    });
    const planId = store.getState()?.subscription?.currentPlan?.id;
    const { agencyDetail } = yield select((state) => state?.agency);
    action.payload.filterData.dataMergePermission =
      agencyDetail?.permission?.dataMerge;
    const resp = yield getBestMatchesCandidateAPI(action.payload, planId);

    if (resp) {
      // yield put({
      //   type: actions.SET_CANDIDATE,
      //   payload: {
      //     bestMatchesCandidates: resp
      //   },
      // });
      yield put({
        type: actions.GET_BEST_MATCHES_CANDIDATE_LOADER,
        payload: false,
      });
    }
    if (resp.msg) {
      yield put({
        type: actions.PLAN_EXPIRE,
        payload: resp,
      });
    }
    yield put({
      type: actions.SET_CANDIDATE,
      payload: {
        bestMatchesCandidates: resp,
      },
    });
  } catch (err) {
    yield put({
      type: actions.GET_BEST_MATCHES_CANDIDATE_LOADER,
      payload: false,
    });
  }
  yield put({
    type: actions.GET_BEST_MATCHES_CANDIDATE_LOADER,
    payload: false,
  });
}

export function* WATCH_CREATE_CANDIDATE(action) {
  const data = yield createCandidateAPI(action.payload.data);

  if (data?.error) {
    tostifyError(data?.error);
    action?.payload?.setLoading(false);
  }
  if (data.constraint) {
    yield put({
      type: actions.CREATE_ERROR,
      payload: data.constraint,
    });
  }
  if (data?.id) {
    tostifySuccess("Data Posted Successfully");

    const resp = yield getCandidateAPI({
      page: action.payload?.page,
      perPage: action.payload?.perPage,
      filterData: [],
    });
    yield put({
      type: actions.SET_CANDIDATE,
      payload: resp,
    });
  }
}

export function* WATCH_CREATE_CANDIDATE_CSV(action) {
  const data = yield createCandidateCsvAPI(action.payload.data);
  if (data?.id || data.msg === "success") {
    tostifySuccess("Data Posted Successfully");
    const resp = yield getCandidateAPI({
      page: 1,
      perPage: 10,
      filterData: [],
    });
    yield put({
      type: actions.SET_CANDIDATE,
      payload: resp,
    });
  }
}

export function* WATCH_UPDATE_CANDIDATE(action) {
  const data = yield updateCandidateAPI(action.payload);
  if (data?.error) {
    tostifyError(data?.error);
  }
  if (data.constraint) {
    yield put({
      type: actions.CREATE_ERROR,
      payload: data.constraint,
    });
  }
  if (data.msg) {
    tostifySuccess("Data Update Successfully");
    const resp = yield getCandidateAPI({
      page: action.payload?.page,
      perPage: action.payload?.perPage,
      filterData: [],
    });
    yield put({
      type: actions.SET_CANDIDATE,
      payload: resp,
    });
    candidateAPI();
  }
}

export function* WATCH_DELETE_CANDIDATE(action) {
  const candidateResults = yield select((state) => state?.candidate);
  const resp = yield deleteCandidateAPI(action.payload);

  if (resp?.msg == "success") {
    console.log("working with the technologies");
    const data = candidateResults?.results.filter(
      (item) => item.id !== action.payload?.id
    );
    yield put({
      type: actions.SET_CANDIDATE,
      payload: {
        results: data,
      },
    });
    yield put({
      type: actions.LOADING,
      payload: false,
    });
  } else {
    yield put({
      type: actions.LOADING,
      payload: false,
    });
  }
  yield put({
    type: actions.LOADING,
    payload: false,
  });
}

export function* WATCH_FILTER_CANDIDATE(action) {
  const resp = yield getFilterCandidate(action.payload);
  yield put({
    type: actions.SET_CANDIDATE,
    payload: resp,
  });
}
export function* WATCH_CANDIDATE_STATUS(action) {
  const candidateResults = yield select((state) => state?.candidate);
  const resp = yield candidateStatus(action.payload);
  if (resp) {
    const index = candidateResults?.results?.findIndex(
      (item) => item.id === action.payload?.id
    );
    if (index !== -1) {
      candidateResults.results[index].status = "view";
    }
    yield put({
      type: actions.SET_CANDIDATE,
      payload: candidateResults,
    });
  }
}
export function* UPDATE_CANDIDATE_PUBLIC(action) {
  const data = yield updateCandidatePublicAPI(action.payload);
  if (data?.error) {
    tostifyError(data?.error);
  }
  if (data.constraint) {
    yield put({
      type: actions.CREATE_ERROR,
      payload: data.constraint,
    });
  }
  if (data.msg) {
    yield put({
      type: actions.CREATE_PUBLIC_CANDIDATE_POPUP,
      payload: true,
    });
  }
}
export function* WATCH_PUBLIC_CREATE_CANDIDATE(action) {
  const data = yield createCandidatePublicAPI(action.payload.data);
  if (data.id) {
    yield put({
      type: actions.SET_CANDIDATE,
      payload: data,
    });
    yield put({
      type: actions.CREATE_PUBLIC_CANDIDATE_POPUP,
      payload: true,
    });
  } else {
    if (data.constraint === "candidates_email_unique") {
      yield put({
        type: actions.SET_CANDIDATE,
        payload: data,
      });
    } else if (data.constraint === "candidates_mobile_unique") {
      yield put({
        type: actions.SET_CANDIDATE,
        payload: data,
      });
    }
  }
}
export function* WATCH_CHECK_CANDIDATE(action) {
  const data = yield checkCandidatePublicAPI(action.payload);
  if (data) {
    yield put({
      type: actions.SET_CANDIDATE,
      payload: data,
    });
  }
}
export function* WATCH_HIRED_CANDIDATE(action) {
  const data = yield hiredCandidateforClients(action.payload);
  if (data) {
    yield put({
      type: actions.SET_CANDIDATE,
      payload: data,
    });
  }
}
export function* WATCH_SEND_MAIL_TO_SELECTED_CANDIDATES(action) {
  const data = yield sendMailToCandidates(action.payload);
  if (data.msg === "Emails sent") {
    yield put({
      type: actions.IS_SENT,
      payload: true,
    });
  } else {
    yield put({
      type: actions.IS_NOT_SENT,
    });
  }
}
export default function* rootSaga() {
  yield all([
    takeEvery(actions.CREATE_CANDIDATE, WATCH_CREATE_CANDIDATE),
    takeEvery(actions.GET_SAVED_CANDIDATE, WATCH_GET_SAVED_CANDIDATE),
    takeEvery(actions.CREATE_CANDIDATE_CSV, WATCH_CREATE_CANDIDATE_CSV),
    takeEvery(actions.GET_CANDIDATE, WATCH_GET_CANDIDATE),
    takeEvery(actions.GET_CLIENT_CANDIDATE, WATCH_GET_CLIENT_CANDIDATE),
    takeEvery(
      actions.GET_BEST_MATCHES_CANDIDATE,
      WATCH_GET_BEST_MATCHES_CANDIDATE
    ),
    takeEvery(actions.UPDATE_CANDIDATE, WATCH_UPDATE_CANDIDATE),
    takeEvery(actions.UPDATE_CANDIDATE_PUBLIC, UPDATE_CANDIDATE_PUBLIC),
    takeEvery(actions.DELETE_CANDIDATE, WATCH_DELETE_CANDIDATE),
    takeEvery(actions.FILTER_CANDIDATE, WATCH_FILTER_CANDIDATE),
    takeEvery(actions.HIRED_CANDIDATE, WATCH_HIRED_CANDIDATE),
    takeEvery(actions.CANDIDATE_STATUS, WATCH_CANDIDATE_STATUS),
    takeEvery(actions.CREATE_PUBLIC_CANDIDATE, WATCH_PUBLIC_CREATE_CANDIDATE),
    takeEvery(actions.CHECK_CANDIDATE, WATCH_CHECK_CANDIDATE),
    takeEvery(
      actions.SEND_MAIL_TO_SELECTED_CANDIDATES,
      WATCH_SEND_MAIL_TO_SELECTED_CANDIDATES
    ),
  ]);
}
