import apiCall from "../../utility/axiosInterceptor";

export const getHotVacancy = async (payload) => {
  console.info("--------------------");
  console.info("payload => ", payload);
  console.info("--------------------");
  return await apiCall.post(
    `jobOpening/hotvacancy?page=${payload?.page}&perPage=${payload?.perPage}`,
    payload?.filterData
  );
};
