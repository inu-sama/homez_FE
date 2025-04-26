const MenuItems = () => {
  const menuItems = [
    { id: 1, title: "Quản lý người dùng", url: "/AD" },
    { id: 2, title: "Bài tin", url: "/ADPost" },
    { id: 3, title: "Quản lý danh mục", url: "/AD/Category" },
  ];

  return (
    <ul className="navbar-nav">
      {menuItems.map((item) => (
        <li className="nav-item" key={item.id}>
          <a className="nav-link h5" href={item.url} role="button">
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default MenuItems;
