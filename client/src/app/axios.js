import axios from "axios";

import config from "./config";

let axiosObject;

if (process.env.NODE_ENV === "development") {
  axiosObject = axios.create({
    baseURL: config.API_BASE_URL,
  });
} else {
  axiosObject = axios.create({
    baseURL: `${window.location.origin}/api`,
  });
}

export default axiosObject;
