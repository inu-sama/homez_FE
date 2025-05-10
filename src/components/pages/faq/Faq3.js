const Faq3 = () => {
  const faqItems = [
    {
      id: "headingOne",
      question:
        "Dịch vụ quản lý bất động sản bao gồm những gì khi tôi giao nhà cho thuê lại?",
      answer:
        "Khi bạn ủy thác, chúng tôi sẽ đảm nhận toàn bộ quá trình từ tìm kiếm khách thuê, làm hợp đồng, thu tiền thuê, đến việc bảo trì, sửa chữa cơ bản và giải quyết các vấn đề phát sinh trong suốt thời gian cho thuê.",
    },
    {
      id: "headingTwo",
      question:
        "Chúng tôi đảm bảo việc tìm kiếm khách thuê và quản lý tài sản của tôi như thế nào?",
      answer:
        "Chúng tôi có đội ngũ chuyên nghiệp và quy trình sàng lọc khách thuê kỹ lưỡng. Tài sản của bạn sẽ được quảng bá trên nhiều kênh, chăm sóc định kỳ và báo cáo tình trạng thường xuyên cho bạn.",
    },
    {
      id: "headingThree",
      question:
        "Phí dịch vụ cho việc ủy thác quản lý và cho thuê lại bất động sản là bao nhiêu?",
      answer:
        "Mức phí dịch vụ sẽ phụ thuộc vào loại hình bất động sản, giá trị cho thuê và phạm vi công việc quản lý. Vui lòng liên hệ trực tiếp với chúng tôi để được tư vấn và nhận báo giá chi tiết cho trường hợp cụ thể của bạn.",
    },
  ];

  return (
    <div className="accordion" id="accordionExample3">
      {faqItems.map((item, index) => (
        <div className="accordion-item" key={index}>
          <h2 className="accordion-header" id={item.id}>
            <button
              className={`accordion-button ${index === 2 ? "" : "collapsed"}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#rdcollapse${index + 1}`}
              aria-expanded={index === 2 ? "true" : "false"}
              aria-controls={`collapse${index + 1}`}
            >
              {item.question}
            </button>
          </h2>
          <div
            id={`rdcollapse${index + 1}`}
            className={`accordion-collapse collapse ${
              index === 2 ? "show" : ""
            }`}
            aria-labelledby={item.id}
            data-parent="#accordionExample3"
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

export default Faq3;
