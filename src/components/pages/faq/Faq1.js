const Faq1 = () => {
  const faqItems = [
    {
      id: "headingOne",
      question: "Làm thế nào để tôi đăng tin bán nhà/đất trên website?",
      answer:
        "Bạn chỉ cần tạo tài khoản, chọn mục ' Đăng tin ', điền đầy đủ thông tin theo hướng dẫn và hình ảnh bất động sản. Tin của bạn sẽ được duyệt và hiển thị nhanh chóng.",
    },
    {
      id: "headingTwo",
      question: "Chi phí đăng tin bán bất động sản trên website là bao nhiêu?",
      answer:
        "Việc đăng tin bán bất động sản trên website của chúng tôi là hoàn toàn miễn phí. Chúng tôi chỉ thu một khoản phí hoa hồng khi giao dịch của bạn thành công. Hãy liên hệ trực tiếp để được tư vấn.",
    },
    {
      id: "headingThree",
      question:
        "Website có những công cụ nào giúp tôi tiếp cận người mua tiềm năng hiệu quả?",
      answer:
        "Tin đăng của bạn sẽ được hiển thị cho hàng trăm người dùng truy cập website mỗi ngày. Ngoài ra, chúng tôi có các tùy chọn quảng cáo nổi bật, đẩy tin và chia sẻ trên các kênh đối tác để tăng cường khả năng tiếp cận.",
    },
  ];

  return (
    <div className="accordion" id="accordionExample">
      {faqItems.map((item, index) => (
        <div className="accordion-item" key={index}>
          <h2 className="accordion-header" id={item.id}>
            <button
              className={`accordion-button ${index === 2 ? "" : "collapsed"}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${index + 1}`}
              aria-expanded={index === 2 ? "true" : "false"}
              aria-controls={`collapse${index + 1}`}
            >
              {item.question}
            </button>
          </h2>
          <div
            id={`collapse${index + 1}`}
            className={`accordion-collapse collapse ${
              index === 2 ? "show" : ""
            }`}
            aria-labelledby={item.id}
            data-parent="#accordionExample"
          >
            <div className="accordion-body">
              <p>{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faq1;
