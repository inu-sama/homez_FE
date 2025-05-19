"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import handleLogout from "@/components/common/logout";

const DboardMobileNavigation = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
          click: handleLogout,
        },
      ],
    },
  ];

  return (
    <div className="dashboard_navigationbar d-block d-lg-none">
      <div className="dropdown">
        <button
          className="dropbtn"
          onClick={() => setIsDropdownOpen((prevOpen) => !prevOpen)}>
          <i className="fa fa-bars pr10" /> Menu
        </button>
        <ul className={`dropdown-content ${isDropdownOpen ? "show" : ""}`}>
          {sidebarItems.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <p
                className={`fz15 fw400 ff-heading mt30 pl30 ${
                  sectionIndex === 0 ? "mt-0" : "mt30"
                }`}>
                {section.title}
              </p>
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="sidebar_list_item">
                  <Link
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
        </ul>
      </div>
    </div>
  );
};

export default DboardMobileNavigation;
