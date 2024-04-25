import apiCall from "../../utility/axiosInterceptor";

export const createOrderInstance = async (payload) => {
  return await apiCall.post("/create/orderInstance", payload);
};

export const capturePayment = async (payload) => {
  return await apiCall.post(`/capture`, payload);
};
export const paymentSuccessfulMail = async (payload) => {
  return await apiCall.post(`/payment/paymentMail/${payload?.id}`);
};

export const createPayment = async (payload) => {
  return await apiCall.post("/payment/create", payload);
};
