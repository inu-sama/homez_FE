import React from "react";
import Image from "next/image";
import Link from "next/link";
import ProSidebarContent from "./ProSidebarContent";
import handleLogout from "../logout";
export default function HeaderAD() {
  return (
    <div className="mobilie_header_nav stylehome1">
      <div className="mobile-menu">
        <div className="header innerpage-style">
          <div className="menu_and_widgets">
            <div className="mobile_menu_bar d-flex justify-content-between align-items-center">
              <a
                className="menubar"
                href="#"
                data-bs-toggle="offcanvas"
                data-bs-target="#mobileMenu"
                aria-controls="mobileMenu"
              >
                <Image
                  width={25}
                  height={9}
                  src="/images/mobile-dark-nav-icon.svg"
                  alt="mobile icon"
                />
              </a>
              <Link className="mobile_logo" href="/">
                <Image
                  width={138}
                  height={44}
                  src="/images/header-logo2.svg"
                  alt="logo"
                />
              </Link>
              <button
                className="nav-link h5"
                style={{
                  outline: "none",
                  border: "none",
                  background: "white",
                }}
                onClick={handleLogout}
              >
                <span className="icon fz18 fa-solid fa-right-from-bracket" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-start mobile_menu-canvas"
        tabIndex="-1"
        id="mobileMenu"
        aria-labelledby="mobileMenuLabel"
        data-bs-scroll="true"
      >
        <div className="rightside-hidden-bar">
          <div className="hsidebar-header">
            <div
              className="sidebar-close-icon"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <span className="far fa-times"></span>
            </div>
            <h4 className="title">Welcome to Homez</h4>
          </div>
          {/* End header */}

          <div className="hsidebar-content ">
            <div className="hiddenbar_navbar_content">
              <ProSidebarContent />
              {/* End .hiddenbar_navbar_menu */}
            </div>
          </div>
          {/* End hsidebar-content */}
        </div>
      </div>
    </div>
  );
}
