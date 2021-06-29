import axios from "axios";
import axiosCookieJarSupport from "axios-cookiejar-support";
import tough from "tough-cookie";

axiosCookieJarSupport(axios);

const cookieJar = new tough.CookieJar();

const api = axios.create({
  baseURL: "https://api-valoriza.vercel.app",
  jar: cookieJar,
  withCredentials: true,
});

export default api;