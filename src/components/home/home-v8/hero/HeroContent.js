"use client";
import React, { useState, useEffect } from "react";
import FilterItems from "./FilterItems";
import { useRouter } from "next/navigation";

const HeroContent = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("rent");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const [location, setLocation] = useState(null);
  const [category, setCategory] = useState(null);

  // useEffect(() => {
  //   console.log("Location:", location);
  //   console.log("Category:", category);
  // }, [location, category]);

  const tabs = [
    { id: "rent", label: "Thuê nhà", link: "/property-list/for-rent" },
    { id: "buy", label: "Mua nhà", link: "/property-list/for-sale" },
    // { id: "sold", label: "Sold" },
  ];

  return (
    <div className="advance-search-tab mt60 mt30-lg mx-auto animate-up-2">
      <ul className="nav nav-tabs p-0 m-0 border-0">
        {tabs.map((tab) => (
          <li className="nav-item" key={tab.id}>
            <button
              className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="tab-content">
        {tabs.map((tab) => (
          <div
            className={`${activeTab === tab.id ? "active" : ""} tab-pane`}
            key={tab.id}
          >
            <div className="advance-content-style1 at-home8">
              <div className="row">
                <FilterItems
                  setLocation={setLocation}
                  setCategory={setCategory}
                />

                <div className="col-md-12">
                  <div className="d-grid">
                    <button
                      className="ud-btn btn-dark"
                      type="button"
                      onClick={() => {
                        const queryParams = new URLSearchParams();

                        if (location) queryParams.append("location", location);
                        if (category) queryParams.append("category", category);

                        router.push(`${tab.link}?${queryParams.toString()}`);
                      }}
                    >
                      <span className="flaticon-search" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroContent;
