import { sponsorsSectionThree } from '@/data/sponsorsSection';
import React from 'react';
import { Image } from 'react-bootstrap';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const options = {
  spaceBetween: 140,
  slidesPerView: 5,
  autoplay: { delay: 5000 },
  modules: [Autoplay],
  breakpoints: {
    0: {
      spaceBetween: 30,
      slidesPerView: 2,
    },
    375: {
      spaceBetween: 30,
      slidesPerView: 2,
    },
    575: {
      spaceBetween: 30,
      slidesPerView: 3,
    },
    767: {
      spaceBetween: 50,
      slidesPerView: 4,
    },
    991: {
      spaceBetween: 50,
      slidesPerView: 5,
    },
    1199: {
      spaceBetween: 100,
      slidesPerView: 5,
    },
  },
};

const SponsorsSectionThree = () => {
  return (
    <div className="sponsors-section-three">
      <div className="auto-container">
        <Swiper {...options} className="thm-swiper__slider">
          {sponsorsSectionThree.map((image, i) => (
            <SwiperSlide key={i}>
              <Image src={image.src} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SponsorsSectionThree;
