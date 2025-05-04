import { apiAuthen } from "@/apis/authen";

const handleLogout = async () => {
  const res = await apiAuthen.logout();
  if (res.status === 201) {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
  }
};
export default handleLogout;
