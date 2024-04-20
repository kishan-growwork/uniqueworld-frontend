import apiCall from "../../utility/axiosInterceptor";

export const getClientAPI = async (payload) => {
  // return await apiCall.get('/clietns', payload)
  return await apiCall
    .post(
      `/clients?page=${payload.page}&perPage=${payload.perPage}`,
      payload.filterData
    )
    .then((res) => {
      return res;
    });
};

export const getClientId = async (id) => {
  // return await apiCall.get('/clietns', payload)
  return await apiCall.get(`/client?id=${id}`).then((res) => {
    return res;
  });
};
export const getAllClientsAPI = async () => {
  // return await apiCall.get('/clietns', payload)
  return await apiCall.get(`/clients/all`).then((res) => {
    return res;
  });
};
export const createClientAPI = async (payload) => {
  return await apiCall.post("/clients/create", payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const updateClientAPI = async (payload) => {
  return await apiCall.put(`/clients/update/${payload.id}`, payload.data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const deleteClientAPI = async (payload) => {
  return await apiCall.delete(`/clients/delete/${payload.id}`, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const getFilterClient = async (payload) => {
  return await apiCall.post("/clients/filter", payload).then((res) => {
    return res;
  });
};

export const approveClient = async (data) => {
  return await apiCall.put(`/clients/action/approved`, data).then((res) => {
    return res;
  });
};

export const declinedClient = async (data) => {
  return await apiCall.put(`/clients/action/declined`, data).then((res) => {
    return res;
  });
};

export const whatsappNotificationStatus = async (data) => {
  return await apiCall.put(`/clients/whatsappNotification`, data).then((res) => {
    return res;
  });
};
export const mailNotificationStatus = async (data) => {
  return await apiCall.put(`/clients/mailNotification`, data).then((res) => {
    return res;
  });
};

export const publicClient = async (data) => {
  return await apiCall.post(`/clients/public`, data).then((res) => {
    return res;
  });
};

export const interviewRequest = async (data) => {
  return await apiCall
    .post(
      `/clients/interview/request?clientId=${data?.client}&candidateId=${data?.candidate}`
    )
    .then((res) => {
      return res;
    });
};
