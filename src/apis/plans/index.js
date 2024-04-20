import apiCall from "../../utility/axiosInterceptor";

export const getPlanList = async () => {
    return await apiCall.get(`/plans`).then((res) => {
        return res;
    });
};
