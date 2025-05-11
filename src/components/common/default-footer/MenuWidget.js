import React from "react";

const MenuWidget = () => {
  const menuSections = [
    {
      title: "Phổ biến",
      links: [
        { label: "Bất động sản cho thuê", href: "/property-list/for-rent" },
        { label: "Mua bất động sản", href: "/property-list/for-sale" },
        { label: "Offices for Buy", href: "#" },
        { label: "Offices for Rent", href: "#" },
      ],
    },
    {
      title: "Hỗ trợ",
      links: [
        { label: "Terms of Use", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Liên hệ hỗ trợ", href: "/contact" },
        { label: "Câu hỏi thường gặp", href: "/faq" },
      ],
    },
    {
      title: "Cá nhân",
      links: [
      ],
    },
  ];

  return (
    <>
      {menuSections.map((section, index) => (
        <div className="col-auto" key={index}>
          <div className="link-style1 mb-3">
            <h6 className="text-white mb25">{section.title}</h6>
            <ul className="ps-0">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default MenuWidget;
