import { apiAuthen } from "@/apis/authen";
import handleLogout from "@/components/common/logout";
const MenuItems = () => {
  const menuItems = [
    { id: 1, title: "Danh sách liên hệ", url: "/AD" },
    { id: 2, title: "Quản lý người dùng", url: "/ADUser" },
    { id: 3, title: "Bài đăng", url: "/ADPost" },
    { id: 4, title: "Quản lý danh mục", url: "/ADCatalog" },
  ];

  return (
    <ul className="navbar-nav">
      {menuItems.map((item) => (
        <li className="nav-item d-flex align-items-center" key={item.id}>
          <a
            className="nav-link h5"
            href={item.url}
            role="button"
            style={{ background: "white" }}
          >
            {item.title}
          </a>
        </li>
      ))}
      <li className="nav-item d-flex align-items-center">
        <button
          className="nav-link h5"
          style={{
            outline: "none",
            border: "none",
            background: "white",
          }}
          onClick={handleLogout}
        >
          Đăng xuất
        </button>
      </li>
    </ul>
  );
};

export default MenuItems;
