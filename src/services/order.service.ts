import { environment } from "../constants/environment";
import { fetchAPI } from "../utils/fetch";
import { getLocalStorage } from "../utils/storage";

export const getOrders = async () => {
  let URL = `${environment.API_URL}/orders?page=1&pageSize=10`;

  const result = await fetchAPI(URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getLocalStorage("auth")}`,
    },
  }).then((data) => data);

  return result;
};
