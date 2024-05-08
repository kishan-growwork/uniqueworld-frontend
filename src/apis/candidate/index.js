// import { useSelector } from "react-redux";
import apiCall from "../../utility/axiosInterceptor";

// export const getPlanId = async () => {
//   const planData = useSelector((state) => state?.auth?.user?.subscription)
//   return planData
// }

export const getCandidateAPI = async (payload) => {
  return await apiCall
    .post(
      `/candidates?page=${payload.page || 1}&perPage=${payload.perPage || 10}`,
      payload.filterData
    )
    .then((res) => {
      return res;
    });
};
export const getSavedCandidateAPI = async (payload) => {
  return await apiCall
    .post(
      `/candidate/savedcandidate?page=${payload.page || 1}&perPage=${
        payload.perPage || 10
      }`,
      payload.filterData
    )
    .then((res) => {
      return res;
    });
};
export const getClientCandidateAPI = async (payload, planId) => {
  return await apiCall
    .post(
      `/clients/candidates?planId=${planId}&page=${payload.page || 1}&perPage=${
        payload.perPage || 10
      }&isSavedCandidates=${payload?.isSavedCandidates || false}`,
      payload.filterData
    )
    .then((res) => {
      return res;
    });
};
export const getBestMatchesCandidateAPI = async (payload, planId) => {
  return await apiCall
    .post(
      `/clients/bestmatchcandidate?planId=${planId}&page=${
        payload.page || 1
      }&perPage=${payload.perPage || 10}&isSavedCandidates=${
        payload?.isSavedCandidates || false
      }`,
      payload.filterData
    )
    .then((res) => {
      return res;
    });
};
export const createCandidateAPI = async (payload) => {
  return await apiCall.post("/candidate/create", payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const createCandidateCsvAPI = async (payload) => {
  return await apiCall.post("/candidate/create/csv", payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const updateCandidateAPI = async (payload) => {
  return await apiCall.put(`/candidate/update`, payload.data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const updateCandidatePublicAPI = async (payload) => {
  return await apiCall.post(`/candidate/apply/update`, payload.data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const deleteCandidateAPI = async (payload) => {
  return await apiCall.delete(`/candidate/delete/${payload.id}`, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const getFilterCandidate = async (payload) => {
  return await apiCall
    .post(
      `/candidate/filter?page=${payload.page}&perPage=${payload.perPage}`,
      payload
    )
    .then((res) => {
      return res;
    });
};
export const candidateStatus = async (payload) => {
  return await apiCall.post(`/candidate/view/${payload.id}`, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const createCandidatePublicAPI = async (payload) => {
  return await apiCall.post("/candidate/publicCreate", payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const checkCandidatePublicAPI = async (payload) => {
  return await apiCall.post("/candidate/check", payload);
};

export const hiredCandidateforClients = async (payload) => {
  return await apiCall
    .post(
      `/candidate/hired?id=${payload?.userId}&page=${payload.page}&perPage=${payload.perPage}`
    )
    .then((res) => {
      return res;
    });
};

export const candidatesForClients = async (payload) => {
  return await apiCall
    .post(
      `/candidates/client?page=${payload.page}&perPage=${payload.perPage}`,
      payload.filterData
    )
    .then((res) => {
      return res;
    });
};

export const sendMailToCandidates = async (payload) => {
  return await apiCall.post(`/candidate/mail`, payload).then((res) => {
    return res;
  });
};
