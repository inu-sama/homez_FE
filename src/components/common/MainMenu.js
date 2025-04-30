import {
  homeItems,
  blogItems,
  listingItems,
  propertyItems,
  pageItems,
} from "@/data/navItems";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const MainMenu = () => {
  const pathname = usePathname();
  const [topMenu, setTopMenu] = useState("");
  const [submenu, setSubmenu] = useState("");
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    homeItems.forEach((elm) => {
      if (elm.href.split("/")[1] == pathname.split("/")[1]) {
        setTopMenu("home");
      }
    });
    blogItems.forEach((elm) => {
      if (elm.href.split("/")[1] == pathname.split("/")[1]) {
        setTopMenu("blog");
      }
    });
    pageItems.forEach((elm) => {
      if (elm.href.split("/")[1] == pathname.split("/")[1]) {
        setTopMenu("pages");
      }
    });
    propertyItems.forEach((item) =>
      item.subMenuItems.forEach((elm) => {
        if (elm.href.split("/")[1] == pathname.split("/")[1]) {
          setTopMenu("property");
          setSubmenu(item.label);
        }
      })
    );
    listingItems.forEach((item) =>
      item.submenu.forEach((elm) => {
        if (elm.href.split("/")[1] == pathname.split("/")[1]) {
          setTopMenu("listing");
          setSubmenu(item.title);
        }
      })
    );
  }, [pathname]);

  const handleActive = (link) => {
    if (link.split("/")[1] == pathname.split("/")[1]) {
      return "menuActive";
    }
  };
  return (
    <ul className="ace-responsive-menu">
      <li className="visible_list dropitem">
        <a className="list-item" href="#">
          <span className={topMenu == "home" ? "title menuActive" : "title"}>
            Khám phá
          </span>
          <span className="arrow"></span>
        </a>
        {/* Level Two*/}
        <ul className="sub-menu">
          <li>
            <Link className={`${handleActive("/grid-full-3-col/Rent")}`} href={"/grid-full-3-col/Rent"}>
              Thuê
            </Link>
          </li>
          <li>
            <Link className={`${handleActive("/grid-full-3-col/Sale")}`} href={"/grid-full-3-col/Sale"}>
              Mua
            </Link>
          </li>
        </ul>
      </li>
      <li className="visible_list dropitem">
        <a className="list-item" href="/about">
          <span className={topMenu == "pages" ? "title menuActive" : "title"}>
            Về chúng tôi
          </span>
        </a>
      </li>
      {/* End homeItems */}

      <li className="megamenu_style dropitem">
        <a className="list-item" href="/contact">
          <span className={topMenu == "listing" ? "title menuActive" : "title"}>
            Liên lạc
          </span>
        </a>
      </li>
      {/* End listings */}

      <li className="megamenu_style dropitem">
        <a className="list-item" href="/faq">
          <span className={topMenu == "listing" ? "title menuActive" : "title"}>
            FAQ
          </span>
        </a>
      </li>
      {/* End listings */}
    </ul>
  );
};

export default MainMenu;
