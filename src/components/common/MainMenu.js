import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MainMenu = () => {
  const pathname = usePathname();

  const handleActive = (link) => {
    if (link == pathname) {
      return "menuActive";
    }
  };
  
  return (
    <ul className="ace-responsive-menu">
      <li className="visible_list dropitem">
        <a className="list-item" href="#">
          <span className={"/property-list".split("/")[1] == pathname.split("/")[1] ? "menuActive title" : "title"}>
            Khám phá
          </span>
          <span className="arrow"></span>
        </a>
        {/* Level Two*/}
        <ul className="sub-menu">
          <li>
            <Link className={`${handleActive("/property-list/for-rent")}`} href={"/property-list/for-rent"}>
              Thuê nhà
            </Link>
          </li>
          <li>
            <Link className={`${handleActive("/property-list/for-sale")}`} href={"/property-list/for-sale"}>
              Mua nhà
            </Link>
          </li>
        </ul>
      </li>
      {/* <li className="visible_list dropitem">
        <a className="list-item" href="/about">
          <span className={`${handleActive("/about")} title`}>
            Về chúng tôi
          </span>
        </a>
      </li> */}
      {/* End homeItems */}

      <li className="megamenu_style dropitem">
        <a className="list-item" href="/contact">
          <span className={`${handleActive("/contact")} title`}>
            Liên hệ
          </span>
        </a>
      </li>
      {/* End listings */}

      <li className="megamenu_style dropitem">
        <a className="list-item" href="/faq">
          <span className={`${handleActive("/faq")} title`}>
            FAQ
          </span>
        </a>
      </li>
      {/* End listings */}
    </ul>
  );
};

export default MainMenu;
