import axios from "axios";

const getCookie = (name) => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const instance = axios.create({
  baseURL: process.env.API_URL_PORT,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `bazen ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
// import axios from "axios";

// const instance = axios.create({
//   baseURL: process.env.API_URL_PORT,
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `bazen eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJGaXJzdE5hbWUiOiJhZG1pbiIsIkxhc3ROYW1lIjoiYWRtaW4iLCJQaG9uZU51bWJlciI6IjA5MDA5MDA5MDAiLCJpYXQiOjE3NDYwODM1NTR9.ifp8K3EWU5H8HvR8yWxkG8ckF8nBL4SRsfU9ai4qDrY`,
//   },
// });

// export default instance;
