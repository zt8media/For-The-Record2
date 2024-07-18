import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './Styles/Slider.css';

// import required modules
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
//images

import SliderOne from '../assets/images/records/aaliyah-record.webp'
import SliderTwo from '../assets/images/records/coming-home.webp'
import SliderThree from '../assets/images/records/lizzo-album.webp'
import SliderFour from '../assets/images/records/thriller.webp'
import SliderFive from '../assets/images/records/lauryn-record.webp'

export default function App() {
  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={4}
        loop={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
       
        navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          breakpoints={{
            320: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 4,
            },
          }}
          modules={[EffectCoverflow, Pagination,Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={SliderOne} />
        </SwiperSlide>
        <SwiperSlide>
        <img src={SliderTwo} />
        </SwiperSlide>
        <SwiperSlide>
        <img src={SliderThree} />
        </SwiperSlide>
        <SwiperSlide>
        <img src={SliderFour} />
        </SwiperSlide>
        <SwiperSlide>
        <img src={SliderFive} />
        </SwiperSlide>
        <div className="swiper-button-next">
          <i className="fa fa-arrow-right custom-arrow" style={{ color: '#ffffff' }}></i>
        </div>
        <div className="swiper-button-prev">
          <i className="fa fa-arrow-left custom-arrow" style={{ color: '#ffffff' }}></i>
        </div>

      </Swiper>
    </>
  );
}
