"use client";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import FormContact from "@/components/property/FormContact";

import ProfessionalInfo from "@/components/property/ProfessionalInfo";
import ReviewBoxForm from "@/components/property/ReviewBoxForm";
import ListingItemsContainer from "@/components/property/agency-single/ListingItems";

import SingleAgentCta from "@/components/property/agent-single/SingleAgentCta";
import AllReviews from "@/components/property/reviews";
import Image from "next/image";

import { apiUser } from "@/apis/management-User";
import { apiAuthen } from "@/apis/authen";
import React, { useEffect, useState } from "react";
import { verify } from "jsonwebtoken";

const AgentSingle = ({ params }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const getCookie = (name) => {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const decodedToken = async () => {
    const token = getCookie("token");
    console.log("token", token);
    const userToken = await apiAuthen.getToken(token);
    setUser(userToken);
    console.log("userToken", userToken);
    console.log("user", user);
  };

  useEffect(() => {
    decodedToken();
    console.log("user", user);
  }, [user]);

  const fetchProperties = async () => {
    try {
      const response = await apiUser.getUserList();
      console.log("response", response);
      // response.forEach((elm) => {
      //   if (elm._id == params.id) {
      //     setProperty(elm);
      //   }
      // });
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);
  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Agent Single Section Area */}
      {user && (
        <section className="agent-single pt60">
          <div className="cta-agent bgc-thm-light mx-auto maxw1600 pt60 pb60 bdrs12 position-relative mx20-lg">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-xl-7">
                  <SingleAgentCta id={params.id} user={user} />
                  <div className="img-box-11 position-relative d-none d-xl-block">
                    <Image
                      width={120}
                      height={120}
                      className="img-1 spin-right"
                      src="/images/about/element-3.png"
                      alt="agents"
                    />
                    <Image
                      width={41}
                      height={11}
                      className="img-2 bounce-x"
                      src="/images/about/element-5.png"
                      alt="agents"
                    />
                    <Image
                      width={57}
                      height={49}
                      className="img-3 bounce-y"
                      src="/images/about/element-7.png"
                      alt="agents"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End cta-agent */}

          <div className="container">
            <div className="row wow fadeInUp" data-aos-delay="300">
              <div className="col-lg-8 pr40 pr20-lg">
                {/* End .row */}

                <ListingItemsContainer user={user} />
              </div>
              {/* End .col-lg-8 */}

              <div className="col-lg-4">
                <div className="agent-single-form home8-contact-form default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white position-relative">
                  <h4 className="form-title mb25">Contact Form</h4>
                  <FormContact />
                </div>
                <div className="agen-personal-info position-relative bgc-white default-box-shadow1 bdrs12 p30 mt30">
                  <ProfessionalInfo />
                </div>
              </div>
              {/* End .col-lg-4 */}
            </div>
          </div>
        </section>
      )}
      {/* End Agent Single Section Area */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default AgentSingle;
