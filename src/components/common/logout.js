import { apiAuthen } from "@/apis/authen";

const handleLogout = async () => {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.href = "/";
};
export default handleLogout;
