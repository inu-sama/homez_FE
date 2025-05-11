"use client";

import MainMenu from "@/components/common/MainMenu";
import SidebarPanel from "@/components/common/sidebar-panel";
import LoginSignupModal from "@/components/common/login-signup-modal";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// import { verify } from "jsonwebtoken";

// const translateToken = (token) => {
//   if (!token) {
//     throw new Error("Token is required");
//   }
//   try {
//     const decoded = verify(token, process.env.SECRET_KEY);
//     return decoded;
//   } catch (err) {
//     throw new Error("Invalid token");
//   }
// };

const DefaultHeader = () => {
  const [navbar, setNavbar] = useState(false);
  const [show, setShow] = useState(false);
  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };
  useEffect(() => {
    const token = getCookie("token");
    const role = getCookie("role");
    if (token) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, []);
  // ${navbar ? "sticky slideInDown animated" : ""}
  return (
    <>
      <header
        className={`header-nav nav-homepage-style light-header menu-home4 main-menu sticky slideInDown animated`}
      >
        <nav className="posr">
          <div className="container posr menu_bdrt1">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="logos mr40">
                    <Link className="header-logo logo1" href="/">
                      <Image
                        width={138}
                        height={44}
                        src="/images/header-logo2.svg"
                        alt="Header Logo"
                      />
                    </Link>
                    <Link className="header-logo logo2" href="/">
                      <Image
                        width={138}
                        height={44}
                        src="/images/header-logo2.svg"
                        alt="Header Logo"
                      />
                    </Link>
                  </div>
                  {/* End Logo */}

                  <MainMenu />
                  {/* End Main Menu */}
                </div>
              </div>
              {/* End .col-auto */}

              <div className="col-auto">
                <div className="d-flex align-items-center">
                  {!show ? (
                    <a
                      href="#"
                      className="login-info d-flex align-items-cente"
                      data-bs-toggle="modal"
                      data-bs-target="#loginSignupModal"
                      role="button"
                    >
                      <i className="far fa-user-circle fz16 me-2" />{" "}
                      <span className="d-none d-xl-block">
                        Đăng ký/Đăng nhập
                      </span>
                    </a>
                  ) : (
                    <>
                      <Link
                        href={`/my-properties`}
                        className="login-info d-flex align-items-cente"
                        role="button"
                      >
                        <i className="far fa-user-circle fz16 me-2" />{" "}
                        <span className="d-none d-xl-block">Tài khoản</span>
                      </Link>
                      <Link
                        className="ud-btn btn-white add-property bdrs60 mx-2 mx-xl-4"
                        href="/add-property"
                      >
                        Thêm căn hộ
                        <i className="fal fa-arrow-right-long" />
                      </Link>
                    </>
                  )}
                  {/* <a
                    className="sidemenu-btn filter-btn-right"
                    href="#"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#SidebarPanel"
                    aria-controls="SidebarPanelLabel"
                  >
                    <Image
                      width={25}
                      height={9}
                      className="img-1"
                      src="/images/dark-nav-icon.svg"
                      alt="humberger menu"
                    />
                    <Image
                      width={25}
                      height={9}
                      className="img-2"
                      src="/images/dark-nav-icon.svg"
                      alt="humberger menu"
                    />
                  </a> */}
                </div>
              </div>
              {/* End .col-auto */}
            </div>
            {/* End .row */}
          </div>
        </nav>
      </header>
      {/* End Header */}

      {/* Signup Modal */}
      <div className="signup-modal">
        <div
          className="modal fade"
          id="loginSignupModal"
          tabIndex={-1}
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
            <LoginSignupModal />
          </div>
        </div>
      </div>
      {/* End Signup Modal */}

      {/* DesktopSidebarMenu */}
      {/* <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="SidebarPanel"
        aria-labelledby="SidebarPanelLabel"
      >
        <SidebarPanel />
      </div> */}
      {/* Sidebar Panel End */}
    </>
  );
};

export default DefaultHeader;
