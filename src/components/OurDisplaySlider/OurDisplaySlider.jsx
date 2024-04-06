/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./OurDisplaySlider.css";
import ReactPlayer from "react-player";
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const OurDisplaySlider = () => {
  const [galleryItems, setGalleryitems] = useState([]);

  //getAllproducts:
  const getAllproducts = async () => {
    try {
      const response = await axiosInstance.get("/transactionsRouter/getAll");
      const res_Data = response.data;
      const filteredDisplayaryProduct = res_Data.filter(
        (p) =>
          p.operation_type_id === 2 &&
          p.Image?.ImagePriority?.id_image_priority === 3
      );

      setGalleryitems(filteredDisplayaryProduct);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllproducts();
  }, []);

  const renderGalleryItem = (item) => {
    if (item.type === "video") {
      return (
        <ReactPlayer
          url={item.Image.image_url}
          playing
          loop
          muted
          controls={false}
          height="35vh"
          width="100%"
          className="slider_video_display"
        />
      );
    } else if (item.type === "gif") {
      return (
        <img
          alt={item.type}
          src={item.Image.image_url}
          className="slider_image_display"
        />
      );
    } else {
      // Assume it's an image
      return (
        <div className="sliderImage_div">
          <img
            alt={item.type}
            src={item.Image.image_url.replace(
              "https://drive.google.com/uc?export=view&id=",
              "https://drive.google.com/thumbnail?id="
            )}
            className="slider_image_display"
          />
        </div>
      );
    }
  };

  return (
    <div className="ourdisplayslider_container">
      <AliceCarousel
        autoPlay
        autoPlayInterval={5000}
        infinite={true}
        disableButtonsControls
        disableDotsControls
      >
        {galleryItems.map((item, index) => (
          <div key={index}>{renderGalleryItem(item)}</div>
        ))}
      </AliceCarousel>
    </div>
  );
};

export default OurDisplaySlider;
