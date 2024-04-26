import { all, takeEvery, put } from "redux-saga/effects";
// import axios from "axios"
import actions from "./actions";
import {
  capturePayment,
  createOrderInstance,
  paymentstatus,
  paymentSuccessfulMail,
} from "../../apis/payment";
import { store } from "./../store";
import { toast } from "react-toastify";

async function setLoading(loading) {
  store.dispatch({
    type: actions.PAYMENT_SET_STATE,
    payload: { isLoading: loading },
  });
}

function* WATCH_CREATE_ORDER_INSTANCE(action) {
  try {
    setLoading(true);
    const { options, selectedPlan } = action.payload;
    const res = yield createOrderInstance(options);
    yield put({
      type: actions.PAYMENT_SET_STATE,
      payload: {
        order: res,
        isOrderCaptured: true,
        selectedPlan,
        isPaymentModalOpened: false,
      },
    });
    setLoading(false);
  } catch (error) {
    toast.error("Something went wrong");
    yield put({
      type: actions.PAYMENT_SET_STATE,
      payload: {
        isError: true,
        isLoading: false,
      },
    });
  }
}

function* WATCH_CAPTURE_PAYMENT(action) {
  try {
    setLoading(true);
    const res = yield capturePayment(action.payload);
    if (res) {
      yield put({
        type: actions.PAYMENT_SET_STATE,
        payload: {
          isSuccessPayment: true,
        },
      });
    } else {
      toast.info("Please Contact to our team");
    }
    setLoading(false);
  } catch (error) {
    toast.error("Something went wrong");
    yield put({
      type: actions.PAYMENT_SET_STATE,
      payload: {
        isError: true,
        isLoading: false,
      },
    });
  }
  setLoading(false);
}

export function* WATCH_PAYMENT_SUCCESSFUL_MAIL(action) {
  try {
    setLoading(true);
    const resp = yield paymentSuccessfulMail(action.payload);
    if (resp?.msg) {
      setLoading(false);
      toast.success("Your Plan Upgrade Successfully.");
    }
  } catch (err) {
    setLoading(false);
  }
}
export function* WATCH_PAYMENT_STATUS(action) {
  try {
    setLoading(true);
    const resp = yield paymentstatus(action.payload);
    if (resp) {
      yield put({
        type: actions.PAYMENT_SET_STATE,
        payload: {
          paymentstatus: resp,
        },
      });
      setLoading(false);
      // toast.success("Your Plan Upgrade Successfully.");
    }
  } catch (err) {
    setLoading(false);
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.CREATE_ORDER_INSTANCE, WATCH_CREATE_ORDER_INSTANCE),
    takeEvery(actions.CAPTURE_PAYMENT, WATCH_CAPTURE_PAYMENT),
    takeEvery(actions.PAYMENT_SUCCESSFUL_MAIL, WATCH_PAYMENT_SUCCESSFUL_MAIL),
    takeEvery(actions.PAYMENT_STATUS, WATCH_PAYMENT_STATUS),
  ]);
}
