// import axios from "axios";

// const getCookie = (name) => {
//   if (typeof document === "undefined") return null;
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(";").shift();
//   return null;
// };

// const instance = axios.create({
//   baseURL: process.env.API_URL_PORT,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// instance.interceptors.request.use(
//   (config) => {
//     const token = getCookie("token");
//     if (token) {
//       config.headers.Authorization = `bazen eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJGaXJzdE5hbWUiOiJUaGFuaCIsIkxhc3ROYW1lIjoiTmd1eeG7hW4iLCJQaG9uZU51bWJlciI6Iis4NDkxMjk5Njc2MCIsImlhdCI6MTc0NTkyMzQxMSwiZXhwIjoxNzQ2MDA5ODExfQ.4q98oUyQGIx7hS1kd7Ni-WwSlSKscz1DRNhRd9bKb1I`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default instance;
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.API_URL_PORT,
  headers: {
    "Content-Type": "application/json",
    Authorization: `bazen eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJGaXJzdE5hbWUiOiJhZG1pbiIsIkxhc3ROYW1lIjoiYWRtaW4iLCJQaG9uZU51bWJlciI6IjA5MDA5MDA5MDAiLCJpYXQiOjE3NDYwODAyMDksImV4cCI6MTc0NjE2NjYwOX0.XmeRRKQwAOzrbznFMs6pWQWXviu1Tw1xjbOvK_4p4vA`,
  },
});

export default instance;
