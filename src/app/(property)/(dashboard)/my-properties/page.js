import DashboardMyProperties from "./myproperty";

// (Optional) SEO & title cho tab trình duyệt
export const metadata = {
  title: "NekoHome - Bất động sản của tôi",
  description: "Trang quản lý các bất động sản đã đăng.",
};

export default function Page() {
  return <DashboardMyProperties />;
}
