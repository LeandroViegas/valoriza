import axios from "axios";
import axiosCookieJarSupport from "axios-cookiejar-support";
import tough from "tough-cookie";

axiosCookieJarSupport(axios);

const cookieJar = new tough.CookieJar();

const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  jar: cookieJar,
  withCredentials: true,
});

export default api;