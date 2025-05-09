const Faq2 = () => {
  const faqItems = [
    {
      id: "One",
      question:
        "Tôi muốn cho thuê nhà/căn hộ, quy trình đăng tin trên website như thế nào?",
      answer:
        "Tương tự như đăng tin bán, bạn cần đăng nhập, chọn mục ''Đăng tin cho thuê'' , cung cấp thông tin chi tiết về bất động sản, giá thuê và các điều kiện kèm theo.",
    },
    {
      id: "Two",
      question:
        "Làm sao để tôi tìm được người thuê phù hợp và đáng tin cậy qua website?",
      answer:
        "Website thu hút lượng lớn người dùng có nhu cầu thuê thật. Chúng tôi sẽ đại diện cho bạn để xác minh nguời thuê và giải quyết các thủ tục liên quan.",
    },
    {
      id: "Three",
      question:
        "Việc đăng tin cho thuê có mất phí không và có những gói hỗ trợ nào?",
      answer:
        "Việc đăng tin cho thuê bất động sản trên website của chúng tôi là hoàn toàn miễn phí. Chúng tôi chỉ thu một khoản phí hoa hồng khi giao dịch của bạn thành công. Hãy liên hệ trực tiếp để được tư vấn.",
    },
  ];

  return (
    <div className="accordion" id="accordionExample2">
      {faqItems.map((item, index) => (
        <div className="accordion-item" key={index}>
          <h2 className="accordion-header" id={item.id}>
            <button
              className={`accordion-button ${index === 2 ? "" : "collapsed"}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#ndcollapse${index + 1}`}
              aria-expanded={index === 2 ? "true" : "false"}
              aria-controls={`collapse${index + 1}`}
            >
              {item.question}
            </button>
          </h2>
          <div
            id={`ndcollapse${index + 1}`}
            className={`accordion-collapse collapse ${
              index === 2 ? "show" : ""
            }`}
            aria-labelledby={item.id}
            data-parent="#accordionExample2"
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

export default Faq2;
