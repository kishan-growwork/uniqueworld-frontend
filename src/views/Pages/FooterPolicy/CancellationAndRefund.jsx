import React, { useEffect } from 'react'
import logo from "../../../assets/images/logo/unique-logo.png";
import "./Index.scss"
import style from "../LandingPage/index.module.scss";
import { IoCallOutline, IoLocationOutline } from "react-icons/io5";
import { BsWhatsapp, BsFacebook, BsTwitter, BsLinkedin } from "react-icons/bs";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const CancellationAndRefund = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [])
  return (
    <div id='policycontainer'>
    <div id='header'>
        <img src={logo} alt="" />
    </div>
    <div id="wrapper">
        <p id='contentheader'>Cancellation & Refund Policy</p>
        <div id="contentspeader"></div>
        <p id="updated-date">Last updated on Oct 12th 2023</p>
        <p className='content-text'>Unique World Placement believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:
        </p>



        <ul>
            <li className='content-text list-text'>
            Cancellations will be considered only if the request is made immediately after placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.
            </li>
            <li className='content-text list-text'>
            Unique World Placement does not accept cancellation requests for perishable items like flowers, eatables etc. However, refund/replacement can be made if the customer establishes that the quality of product delivered is not good.
            </li>
            <li className='content-text list-text'>
            In case of receipt of damaged or defective items please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within 7 days of receipt of the products.
            </li>
            <li className='content-text list-text'>
            In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 7 days of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.
            </li>
            <li className='content-text list-text'>
            In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them.    
                    </li>
            <li className='content-text list-text'>
            In case of any Refunds approved by the Unique World Placement, it’ll take 3-5 days for the refund to be processed to the end customer..       
                 </li>
        </ul>








    </div>
    <section>
        <footer id="landingFooter" className="landingFooter">
          <div
            className="footer-top"
            style={{ borderBottom: "1px solid #000" }}
          >
            <div className={("container", style["container"])}>
              <div className="row row-adjustment">
                <div
                  className="col-xxl-2 col-md-12 col-lg-3 footer-info"
                  style={{
                    display: "flex",

                    justifyContent: "center",
                  }}
                >
                  <div style={{ width: "100%" }}>
                    <a href="#" className="logo d-flex align-items-center">
                      <img src={logo} alt="Uniqueworld Logo" />
                    </a>
                  </div>
                  <div></div>

                  <br />
                </div>

                <div className="col-md-6 col-sm-6 col-xxl-2 col-md-4 col-lg-2 col-12 footer-links">
                  <div>
                    <h4>Contacts</h4>
                    <p
                      style={{
                        display: "flex",
                        alignItems: "left",
                        color: "#000",
                      }}
                    >
                      <div
                        style={{
                          marginRight: "5px",
                        }}
                      >
                        <IoLocationOutline />
                      </div>
                      <div style={{ textAlign: "left" }}>
                        Address: T-1, 3rd Floor, Time Square Building, Beside
                        Bhulkabhavan School, Adajan, Surat, Gujarat 395009{" "}
                        <br /> <br />
                      </div>
                    </p>
                    <p
                      style={{
                        display: "flex",
                        alignItems: "left",
                        color: "#000",
                      }}
                    >
                      <div
                        style={{
                          marginRight: "5px",
                        }}
                      >
                        <IoCallOutline />
                      </div>
                      <div style={{ textAlign: "left" }}>
                        Dhaval Gandhi: 9974877260 <br />
                      </div>
                    </p>
                  </div>
                </div>

                <div className="col-md-6 col-sm-6 col-xxl-2 col-md-4 col-lg-2 col-12 footer-links">
                  <h4>Jobs by location</h4>
                  <ul>
                    <li>
                      <a
                        style={{ color: "#000", textDecoration: "none" }}
                        href="https://www.uniqueworldjobs.com/index.php/job/ahmedabad"
                      >
                        Jobs in Ahmedabad
                      </a>
                    </li>
                    <li>
                      <a
                        style={{ color: "#000", textDecoration: "none" }}
                        href="https://www.uniqueworldjobs.com/index.php/job/surat"
                      >
                        Jobs in Surat
                      </a>
                    </li>
                    <li>
                      <a
                        style={{ color: "#000", textDecoration: "none" }}
                        href="https://www.uniqueworldjobs.com/index.php/job/valsad"
                      >
                        Jobs in Valsad
                      </a>
                    </li>
                    <li>
                      <a
                        style={{ color: "#000", textDecoration: "none" }}
                        href="https://www.uniqueworldjobs.com/index.php/job/gandhinagar"
                      >
                        Jobs in Gandhinagar
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="col-md-6 col-sm-6 col-xxl-2 col-md-4 col-lg-2 col-12 footer-links">
                  <h4>Resources</h4>
                  <ul>
                    <li>
                      <a
                        style={{ color: "#000", textDecoration: "none" }}
                        href="https://www.uniqueworldjobs.com/index.php/contact-us"
                      >
                        Support
                      </a>
                    </li>
                    <li>
                      <a
                        style={{ color: "#000", textDecoration: "none" }}
                        href="https://www.uniqueworldjobs.com/index.php/faq"
                      >
                        FAQ
                      </a>
                    </li>
                    <li>
                      <a
                        style={{ color: "#000", textDecoration: "none" }}
                        href="https://www.uniqueworldjobs.com/index.php/contact-us"
                      >
                        Contact Details
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="col-md-6 col-sm-6 col-xxl-2  col-md-4 col-lg-2 col-12 footer-links">
                  <h4>About Unique World</h4>
                  <ul>
                    <li>
                      <a
                        style={{ color: "#000", textDecoration: "none" }}
                        href="https://www.uniqueworldjobs.com/index.php/about-us"
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        style={{ color: "#000", textDecoration: "none" }}
                        href="https://www.uniqueworldjobs.com/index.php/about-us"
                      >
                        Why Choose Us?
                      </a>
                    </li>
                    <li>
                      <a
                        style={{ color: "#000", textDecoration: "none" }}
                        href="https://www.uniqueworldjobs.com/index.php/for-candidates"
                      >
                        For Candidates
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="col-md-6 col-sm-6 col-xxl-2 col-md-4 col-lg-1  col-12 footer-links">
                  {/* <div className="mb-3">
                    <h4>All Jobs</h4>
                    <ul>
                      <li>
                        <a
                          style={{ color: "#000", textDecoration: "none" }}
                          href="https://www.uniqueworldjobs.com/index.php/job-by-categories"
                        >
                          Jobs by category
                        </a>
                      </li>
                      <li>
                        <a
                          style={{ color: "#000", textDecoration: "none" }}
                          href="https://www.uniqueworldjobs.com/index.php/job/job-by-location"
                        >
                          Jobs in location
                        </a>
                      </li>
                    </ul>
                  </div> */}
                  <h4>Policies</h4>
                  <ul>
                    <li>
                      <Link
                        style={{ color: "#000", textDecoration: "none" }}
                        // href="https://www.uniqueworldjobs.com/index.php/policy"
                        to="/policy"
                      >
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        style={{ color: "#000", textDecoration: "none" }}
                        // href="https://merchant.razorpay.com/policy/Mmsgd2PcyVAKFU/terms"
                        to="/terms"
                      >
                        Terms and condition
                      </Link>
                    </li>
                    <li>
                      <Link
                        style={{ color: "#000", textDecoration: "none" }}
                        // href="https://merchant.razorpay.com/policy/Mmsgd2PcyVAKFU/refund"
                        to="refund"
                      >
                        Cancelation and refund policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        style={{ color: "#000", textDecoration: "none" }}
                        // href="https://merchant.razorpay.com/policy/Mmsgd2PcyVAKFU/shipping"
                        to="shipping"
                      >
                        Shipping And Delivery policy
                      </Link>
                    </li>
                    <li>
                      <Link
                        style={{ color: "#000", textDecoration: "none" }}
                        // href="https://merchant.razorpay.com/policy/Mmsgd2PcyVAKFU/contact_us"
                        to="contact_us"
                      >
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="row copyright">
            <div
              className="col-12 col-md-10 col-xxl-11"
              style={{ color: "#000" }}
            >
              All Rights Reserved
            </div>
            <div
              className="col-12 col-md-2 col-xxl-1"
              style={{ wordSpacing: "12px" }}
            >
              <BsWhatsapp fill="#000" /> <BsFacebook fill="#000" />{" "}
              <BsTwitter fill="#000" /> <BsLinkedin fill="#000" />
            </div>
          </div>
        </footer>
      </section>
</div>
  )
}

export default CancellationAndRefund