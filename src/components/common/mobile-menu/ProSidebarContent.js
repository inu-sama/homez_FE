import mobileMenuItems from "@/data/mobileMenuItems";
import { isParentActive } from "@/utilis/isMenuActive";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useEffect, useState } from "react";

const ProSidebarContent = () => {
  const path = usePathname();
  const data = [
    {
      label: "Khám phá",
      subMenu: [
        { path: "/property-list/for-rent", label: "Thuê nhà" },
        { path: "/property-list/for-sale", label: "Mua nhà" },
      ],
    },
    {
      path: "/contact",
      label: "Liên hệ",
    },
    {
      path: "/faq",
      label: "FAQ",
    },
  ];

  return (
    <Sidebar width="100%" backgroundColor="#fff" className="my-custom-class">
      <Menu>
        {data.map((item, index) =>
          item.subMenu ? (
            <SubMenu
              key={index}
              className={isParentActive(item.subMenu, path) ? "active" : ""}
              label={item.label}
            >
              {item.subMenu &&
                item.subMenu.map((subItem, subIndex) => (
                  <MenuItem
                    key={subIndex}
                    component={
                      <Link
                        className={subItem.path == path ? "active" : ""}
                        href={subItem.path}
                      />
                    }
                  >
                    {subItem.label}
                  </MenuItem>
                ))}
            </SubMenu>
          ) : (
            <MenuItem
              key={index}
              component={
                <Link
                  className={item.path == path ? "active" : ""}
                  href={item.path}
                />
              }
            >
              {item.label}
            </MenuItem>
          )
        )}
      </Menu>
    </Sidebar>
  );
};

export default ProSidebarContent;
