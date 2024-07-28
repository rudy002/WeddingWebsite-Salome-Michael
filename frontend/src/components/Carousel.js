import "./Carousel.css";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function Carousel() {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
      return (
        <div className="slider-container">
          <Slider {...settings}>
            <div>
              <h3><img src="/images/photo1.jpeg" className="photo-side-carousel" alt="pic on side" /></h3>
            </div>
            <div>
              <h3><img src="/images/logo.png" className="App-logo-carousel" alt="logo" /></h3>
            </div>
            <div>
              <h3><img src="/images/photo3.jpeg" className="photo-side-carousel" alt="pic on side" /></h3>
            </div>
            <div>
              <h3><img src="/images/photo2.jpeg" className="photo-side-carousel" alt="pic on side" /></h3>
            </div>
          </Slider>
        </div>
      );

}

export default Carousel;