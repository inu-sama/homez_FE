import Image from "next/image";
import Link from "next/link";

const Explore = () => {
  // Array of iconbox data
  const iconboxData = [
    {
      id: 1,
      icon: "/images/icon/property-buy.svg",
      title: "Đăng tin bất động sản",
      text: "Tiếp cận khách hàng tiềm năng một cách nhanh chóng.",
      linkText: "Đăng tin",
      link: "/add-property",
    },
    {
      id: 2,
      icon: "/images/icon/property-sell.svg",
      title: "Thuê căn hộ",
      text: "Dễ dàng tìm thấy ngôi nhà mơ ước với bộ lọc thông minh và đa dạng.",
      linkText: "Khám phá",
      link: "/property-list/for-rent",
    },
    {
      id: 3,
      icon: "/images/icon/property-rent.svg",
      title: "Mua nhà",
      text: "An tâm giao phó, tối ưu hóa lợi nhuận cho thuê và giảm thiểu rủi ro cho chủ nhà.",
      linkText: "Liên hệ",
      link: "/contact",
    },
  ];

  return (
    <>
      {iconboxData.map((item) => (
        <div
          className="col-sm-6 col-lg-4"
          key={item.id}
          data-aos="fade-up"
          data-aos-delay={(item.id + 1) * 100} // Increase delay for each item
        >
          <div className="iconbox-style2 text-center">
            <div className="icon">
              <Image width={150} height={150} src={item.icon} alt="icon" />
            </div>
            <div className="iconbox-content">
              <h4 className="title">{item.title}</h4>
              <p className="text">{item.text}</p>
              <Link href={item.link} className="ud-btn btn-white2">
                {item.linkText}
                <i className="fal fa-arrow-right-long" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Explore;
