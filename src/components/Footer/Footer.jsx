/* eslint-disable no-unused-vars */
import React from "react";
import style from "./footer.module.css";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";

const Footer = () => {
  return (
    <div className={style.footer_wrapper}>
      <div className={style.footerMainDiv}>
        <div className={style.footer_left_div}>
          <div className={style.footer_div_section}>
            <h3>Discover Unique Finds</h3>
            <p>
              Find everything you need and more at 29Brands. Explore our curated
              selection of products, handpicked just for you.
            </p>
          </div>

          <div className={style.footer_div_section}>
            <h3>Discover Stay Connected</h3>
            <p>
              Stay in the loop with exclusive offers and updates by following us
              on social media and subscribing to our newsletter.
            </p>
          </div>
        </div>
        <div className={style.footer_right_div}>
          <div className={style.footer_div_section}>
            <h3>Need Assistance?</h3>
            <p>
              Our dedicated support team is here to help. Contact us anytime for
              friendly and efficient customer service.{" "}
            </p>
          </div>

          <div className={style.footer_div_section}>
            <div className={style.socialMedial_div}>
              <button className={style.social_button}>
                <a href="">
                  <FaFacebook className={style.facebook_icon} />
                </a>
              </button>
              <button className={style.social_button}>
                <a href="">
                  <FaYoutube className={style.youtube_icon} />
                </a>
              </button>{" "}
              <button className={style.social_button}>
                <a href="">
                  <FaInstagramSquare className={style.instagram_icon} />
                </a>
              </button>{" "}
              <button className={style.social_button}>
                <a href="">
                  <BsLinkedin className={style.linkedin_icon} />
                </a>
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
      <a
        href="https://www.merinasoft.com/"
        target="_blank"
        rel="noopener noreferrer"
        className={style.footer_text}
      >
        {" "}
        All Rights Reserved By &copy; Merinasoft 2024
      </a>
    </div>
  );
};

export default Footer;
