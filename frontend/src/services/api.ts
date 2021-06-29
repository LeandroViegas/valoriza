import axios from "axios";
import axiosCookieJarSupport from "axios-cookiejar-support";
import tough from "tough-cookie";

axiosCookieJarSupport(axios);

const cookieJar = new tough.CookieJar();

const api = axios.create({
  baseURL: process.env.BASEURLAPI,
  jar: cookieJar,
  withCredentials: true,
});

export default api;