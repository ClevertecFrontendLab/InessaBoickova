import { useState } from 'react';
import { FreeMode,Navigation, Pagination,Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import img from '../../resources/img/image_book.png'

import 'swiper/scss';
import 'swiper/scss/thumbs';
import 'swiper/scss/pagination';

export const SwiperSlider =  () => {
  const [activeThumb,setActiveThumb] = useState(null);

  return (

    <div className="swiper">
      <Swiper  data-test-id='slide-big'
              spaceBetween={10}
              slidesPerView={1}
              navigation={true}
              modules = {[Navigation, Thumbs, Pagination]}   
              thumbs={{swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null}}
              pagination={{
                clickable: true,
              }}
              className= 'swiper_slider'>
          <SwiperSlide ><img src={img} alt='img'/></SwiperSlide>
          <SwiperSlide><img src={img} alt='img'/></SwiperSlide>
          <SwiperSlide><img src={img} alt='img'/></SwiperSlide>
          <SwiperSlide><img src={img} alt='img'/></SwiperSlide>
      </Swiper>
        <Swiper
            freeMode={true}
            watchSlidesProgress={true}
            onSwiper={setActiveThumb}
            spaceBetween={30}
            slidesPerView = {3}
            modules = {[FreeMode, Navigation, Thumbs]}
            className= 'swiper_thimbs'>
              <div data-test-id='slide-mini' className="swiper_thimbs-images">
                  <SwiperSlide data-test-id='slide-mini'><img src={img} alt='img'/></SwiperSlide>
                  <SwiperSlide data-test-id='slide-mini'><img src={img} alt='img'/></SwiperSlide>
                  <SwiperSlide data-test-id='slide-mini'><img src={img} alt='img'/></SwiperSlide>
                  <SwiperSlide data-test-id='slide-mini'><img src={img} alt='img'/></SwiperSlide>
                  <SwiperSlide data-test-id='slide-mini'><img src={img} alt='img'/></SwiperSlide>
              </div>

        </Swiper>
    </div>
  );
};


