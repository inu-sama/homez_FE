// @/data/mobileMenuItems.js
const mobileMenuItems = [
  { label: "Quản lí người dùng ", path: "/AD" },
  { label: "Listings", path: "/listings" },
  { label: "Property", path: "/property" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Blog", path: "/blog" },
  {
    label: "Pages",
    subMenu: [
      { path: "/about", label: "About" },
      { path: "/contact", label: "Contact" },
      { path: "/compare", label: "Compare" },
      { path: "/pricing", label: "Pricing" },
      { path: "/faq", label: "Faq" },
      { path: "/login", label: "Login" },
      { path: "/register", label: "Register" },
      { path: "/404", label: "404" },
      { path: "/invoice", label: "Invoice" },
    ],
  },
];

export default mobileMenuItems;
