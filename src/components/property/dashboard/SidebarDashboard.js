"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import handleLogout from "@/components/common/logout";

const SidebarDashboard = () => {
  const pathname = usePathname();

  const sidebarItems = [
    {
      title: "Quản lý bất động sản",
      items: [
        {
          href: "/my-properties",
          icon: "flaticon-home",
          text: "Bất động sản của tôi",
        },
        {
          href: "/add-property",
          icon: "flaticon-new-tab",
          text: "Thêm mới",
        },
        {
          href: "/dashboard-my-favourites",
          icon: "flaticon-like",
          text: "Yêu thích",
        },
      ],
    },
    {
      title: "Quản lý tài khoản",
      items: [
        {
          href: "/dashboard-my-profile",
          icon: "flaticon-user",
          text: "Sửa thông tin",
        },
        {
          href: "/",
          icon: "flaticon-logout",
          text: "Đăng xuất",
          click: handleLogout
        },
      ],
    },
  ];

  return (
    <div className="dashboard__sidebar d-none d-lg-block">
      <div className="dashboard_sidebar_list">
        {sidebarItems.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <p
              className={`fz15 fw400 ff-heading ${
                sectionIndex === 0 ? "mt-0" : "mt30"
              }`}>
              {section.title}
            </p>
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex} className="sidebar_list_item">
                <Link
                  onClick={item.click}
                  href={item.href}
                  className={`items-center   ${
                    pathname == item.href ? "-is-active" : ""
                  } `}>
                  <i className={`${item.icon} mr15`} />
                  {item.text}
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarDashboard;
