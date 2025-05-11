// "use client";

// import { useState, useEffect } from "react";
// import { auth } from "@/lib/firebase";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { apiAuthen } from "@/apis/authen";

// const SignUp = () => {
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [confirmation, setConfirmation] = useState(null);
//   const [info, setInfo] = useState(false);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [email, setEmail] = useState("");
//   const [FirstName, setFirstName] = useState("");
//   const [LastName, setLastName] = useState("");

//   const fullPhone = `+84${phone}`;
//   auth.languageCode = "vi";

//   useEffect(() => {
//     console.log("Checking for reCAPTCHA setup");

//     const recaptchaContainer = document.getElementById("recaptcha-container");
//     if (!recaptchaContainer) {
//       console.error("Thiếu phần tử #recaptcha-container trong DOM.");
//       return;
//     }

//     if (!auth) {
//       console.error("Firebase auth chưa được khởi tạo.");
//       return;
//     }

//     if (!window.recaptchaVerifier) {
//       try {
//         console.log("Setting up reCAPTCHA...");

//         window.recaptchaVerifier = new RecaptchaVerifier(
//           auth,
//           "recaptcha-container",
//           {
//             size: "invisible",
//             callback: (response) => {
//               console.log("reCAPTCHA verified", response);
//             },
//           }
//         );

//         window.recaptchaVerifier
//           .render()
//           .then(() => {
//             console.log("reCAPTCHA đã được render.");
//           })
//           .catch((err) => {
//             console.error("Lỗi khi render reCAPTCHA:", err);
//           });
//       } catch (err) {
//         console.error("Lỗi khi thiết lập reCAPTCHA:", err);
//       }
//     }
//   }, [auth]);

//   // Hàm kiểm tra số điện thoại
//   const validatePhoneNumber = (phone) => {
//     const regex = /^\+84\d{9}$/;
//     return regex.test(phone);
//   };

//   // Gửi OTP
//   const sendOTP = async (e) => {
//     e.preventDefault();

//     if (!validatePhoneNumber(phone)) {
//       setMessage("Số điện thoại không hợp lệ. Định dạng: +84xxxxxxxxx");
//       return;
//     }

//     if (!window.recaptchaVerifier) {
//       setMessage("Lỗi: reCAPTCHA chưa được khởi tạo. Vui lòng tải lại trang.");
//       return;
//     }

//     setLoading(true);
//     setMessage("");

//     try {
//       const appVerifier = window.recaptchaVerifier;
//       const confirmationResult = await signInWithPhoneNumber(
//         auth,
//         phone,
//         appVerifier
//       );
//       setConfirmation(confirmationResult);
//       setMessage("Mã OTP đã được gửi.");
//     } catch (err) {
//       console.error("Lỗi khi gửi OTP:", err);
//       setMessage(
//         "Lỗi gửi OTP: Cache trình duyệt có thể đã hết hạn. Vui lòng thử lại."
//       );
//     }

//     setLoading(false);
//   };

//   const verifyOTP = async (e) => {
//     e.preventDefault();
//     if (!otp) {
//       setMessage("Vui lòng nhập mã OTP.");
//       return;
//     }

//     setLoading(true);
//     try {
//       await confirmation.confirm(otp);
//       setMessage("Xác thực thành công!");
//       setInfo(true);
//     } catch (err) {
//       console.error(err);
//       setMessage("Sai mã OTP hoặc OTP đã hết hạn.");
//     }
//     setLoading(false);
//   };

//   const handleSubmitInfo = async (e) => {
//     e.preventDefault();
//     if (!email || !FirstName || !LastName) {
//       setMessage("Vui lòng điền đầy đủ thông tin.");
//       return;
//     }
//     try {
//       const response = await apiAuthen.register(
//         phone,
//         email,
//         FirstName,
//         LastName
//       );
//       console.log(response);
//       if (response.status === 201) {
//         setMessage("Đăng ký thành công!");
//         document.cookie = `token=${response.data.token}; path=/; max-age=86400; Secure; SameSite=Strict`;
//         setTimeout(() => {
//           window.location.href = "/";
//         }, 2000);
//       }
//     } catch (error) {
//       console.error("Error during registration:", error);
//       setMessage("Đăng ký thất bại. Vui lòng thử lại.");
//     }
//   };

//   return (
//     <form
//       className="form-style1"
//       onSubmit={info ? handleSubmitInfo : undefined}
//     >
//       <div id="recaptcha-container"></div>

//       {message && <div className="alert alert-info text-center">{message}</div>}

//       {!info ? (
//         <div>
//           <div className="mb25">
//             <label className="form-label fw600 dark-color">Số điện thoại</label>
//             <input
//               type="tel"
//               className="form-control"
//               placeholder="+84"
//               required
//               value={phone}
//               onChange={(e) => {
//                 const newValue = e.target.value;
//                 if (newValue.startsWith("+84")) {
//                   setPhone(newValue);
//                 } else if (/^\d+$/.test(newValue.replace("+84", ""))) {
//                   setPhone(`+84${newValue.replace(/^\+?84/, "")}`);
//                 }
//               }}
//               disabled={!!confirmation}
//             />
//           </div>

//           {confirmation && (
//             <div className="mb25">
//               <label className="form-label fw600 dark-color">Mã OTP</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Nhập mã xác nhận"
//                 required
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//               />
//             </div>
//           )}
//         </div>
//       ) : (
//         <div>
//           <div className="row mb25">
//             <div className="w-50 pe-2">
//               <label className="form-label fw600 dark-color">Họ</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Nhập họ"
//                 required
//                 value={LastName}
//                 onChange={(e) => setLastName(e.target.value)}
//               />
//             </div>
//             <div className="w-50 ps-2">
//               <label className="form-label fw600 dark-color">Tên</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Nhập tên"
//                 required
//                 value={FirstName}
//                 onChange={(e) => setFirstName(e.target.value)}
//               />
//             </div>
//           </div>
//           <div className="mb25">
//             <label className="form-label fw600 dark-color">Email</label>
//             <input
//               type="email"
//               className="form-control"
//               placeholder="Nhập email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//         </div>
//       )}

//       <div className="d-grid mb20">
//         {!confirmation ? (
//           <button
//             onClick={sendOTP}
//             className="ud-btn btn-thm"
//             type="button"
//             disabled={loading}
//           >
//             {loading ? "Đang gửi OTP..." : "Gửi OTP"}
//             <i className="fal fa-comment-sms" />
//           </button>
//         ) : !info ? (
//           <button
//             onClick={verifyOTP}
//             className="ud-btn btn-thm"
//             type="button"
//             disabled={loading}
//           >
//             {loading ? "Đang xác thực..." : "Xác nhận OTP"}{" "}
//             <i className="fal fa-paintbrush" />
//           </button>
//         ) : (
//           <button className="ud-btn btn-thm" type="submit" disabled={loading}>
//             {loading ? "Đang đăng ký..." : "Đăng ký"}{" "}
//             <i className="fal fa-arrow-right-long" />
//           </button>
//         )}
//       </div>
//     </form>
//   );
// };

// export default SignUp;
"use client";

import { useState } from "react";
import { apiAuthen } from "@/apis/authen";

const SignUp = () => {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmitInfo = async (e) => {
    e.preventDefault();

    if (
      !email ||
      !FirstName ||
      !LastName ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      setMessage("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Mật khẩu không khớp.");
      return;
    }

    setLoading(true);
    const response = await apiAuthen.register(
      phone,
      email,
      FirstName,
      LastName,
      password
    );

    if (response.status === 201) {
      setMessage("Đăng ký thành công!");
      document.cookie = `token=${response.data.token}; path=/; max-age=86400; Secure; SameSite=Strict`;
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } else {
      setMessage(response.data.message);
    }
    setLoading(false);
  };

  return (
    <form className="form-style1" onSubmit={handleSubmitInfo}>
      {message && <div className="alert alert-info text-center">{message}</div>}

      <div className="mb25">
        <label className="form-label fw600 dark-color">Số điện thoại</label>
        <input
          type="tel"
          className="form-control"
          placeholder="+84xxxxxxxxx"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="row mb25">
        <div className="w-50 pe-2">
          <label className="form-label fw600 dark-color">Họ</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nhập họ"
            required
            value={LastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="w-50 ps-2">
          <label className="form-label fw600 dark-color">Tên</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nhập tên"
            required
            value={FirstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
      </div>

      <div className="mb25">
        <label className="form-label fw600 dark-color">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Nhập email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb25">
        <label className="form-label fw600 dark-color">Mật khẩu</label>
        <input
          type="password"
          className="form-control"
          placeholder="Nhập mật khẩu"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mb25">
        <label className="form-label fw600 dark-color">Xác nhận mật khẩu</label>
        <input
          type="password"
          className="form-control"
          placeholder="Nhập lại mật khẩu"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className="d-grid mb20">
        <button className="ud-btn btn-thm" type="submit" disabled={loading}>
          {loading ? "Đang đăng ký..." : "Đăng ký"}{" "}
          <i className="fal fa-arrow-right-long" />
        </button>
      </div>
    </form>
  );
};

export default SignUp;
