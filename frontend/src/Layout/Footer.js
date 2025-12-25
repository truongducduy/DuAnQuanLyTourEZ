import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const Footer = () => {
    const footerImage = "/Frontend/Images/Home/footer.jpg"; 

    return (
        <footer className="footer" style={{ backgroundImage: `url(${footerImage})` }}>
            <div className="footer-overlay"></div>
            <div className="container footer-content-wrapper">
                {/* Footer top */}
                <div className="footer-top">
                    <div className="footer-col footer-about">
                        <div className="footer-logo">
                          <img src="/Frontend/Images/Home/logo.jpg" alt="EZTRIP Logo" className="logo-image" />
                          <span className="logo-text">EZTRIP</span>
                        </div>
                        <p>
                            Chúng tôi mong muốn mang lại trải nghiệm du lịch tuyệt vời trên khắp Việt Nam.
                        </p>
                        <div className="footer-social-icons">
                            <a href="#"><FaFacebookF /></a>
                            <a href="#"><FaTwitter /></a>
                            <a href="#"><FaInstagram /></a>
                        </div>
                    </div>

                    <div className="footer-col footer-newsletter">
                        <h3 className="newsletter-title">Đăng ký nhận bản tin</h3>
                        <form className="newsletter-form">
                            <input type="email" placeholder="Email Address" required />
                            <button className="btn book-now-btn" type="submit">BOOK NOW</button>
                        </form>
                    </div>
                </div>

                {/* Footer bottom */}
                <div className="footer-bottom-links row">
                    <div className="footer-links-group col-2">
                        <h4>Dịch vụ</h4>
                        <ul>
                            <li><a href="#">Đặt tour du lịch</a></li>
                            <li><a href="#">Đặt tour</a></li>
                        </ul>
                    </div>
                    <div className="footer-links-group col-2">
                        <h4>Công ty</h4>
                        <ul>
                            <li><a href="#">Giới thiệu công ty</a></li>
                            <li><a href="#">Việc làm</a></li>
                            <li><a href="#">Liên hệ</a></li>
                        </ul>
                    </div>
                    <div className="footer-links-group footer-contact col-4">
                        <h4>Liên hệ</h4>
                        <div className="contact-item"><FaMapMarkerAlt /> <p>Số 3 Đào Tấn, Quận Ngũ Hành Sơn, Đà Nẵng</p></div>
                        <div className="contact-item"><FaEnvelope /> <p>ez.trip.email@gmail.com</p></div>
                        <div className="contact-item"><FaPhoneAlt /> <p>+84 0855687945 </p></div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2025 EZTRIP. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
