import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination } from 'swiper';

import { Navigation,Pagination } from 'swiper/modules';
// import 'swiper/swiper.min.css';
// import 'swiper/swiper.css'; // Core styles
// import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import './styles.css';

const FBService = () => {
  return (
    <section id="" className="py-16 px-5 bg-gray-100">
      {/* container */}
      <div className=" mx-auto px-4">
        <div className="flex flex-wrap">
          <div className=" lg:w-1/3">
            <div className="header-section mb-8">
              <h2 className="text-3xl font-semibold">
                WHAT WE <span className="text-blue-500">Service</span>
              </h2>
            </div>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={3}
          className="mySwiper"
          style={{display:'flex'}}
        >
          {/* Slide 1 */}
          <SwiperSlide >
            <div className="service-box bg-white shadow-lg rounded-lg p-6">
              <div className="element">
                <div
                  className="shape bg-blue-500 h-16 w-16 mb-4 cursor-pointer"
                  data-bs-toggle="modal"
                  data-bs-target="#myModal"
                ></div>
              </div>
              <div className="service-containet">
                <h3 className="text-xl font-semibold mb-2">LIFE INSURANCE</h3>
                <p className="text-gray-700 mb-4">
                  Mauris volutpat urna tristique finibus iaculis. Morbi facilisis.
                </p>
                <div className="flex space-x-4 justify-center">
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                    className="text-blue-500 hover:underline"
                  >
                    View detail
                  </a>
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                    className="text-blue-500 hover:underline"
                  >
                    Enquiry
                  </a>
                </div>
              </div>
            </div>
            
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="service-box bg-white shadow-lg rounded-lg p-6">
              <div className="element">
                <div
                  className="shape bg-blue-500 h-16 w-16 mb-4 cursor-pointer"
                  data-bs-toggle="modal"
                  data-bs-target="#myModal"
                ></div>
              </div>
              <div className="service-containet">
                <h3 className="text-xl font-semibold mb-2">MUTUAL FUNDS</h3>
                <p className="text-gray-700 mb-4">
                  Mauris volutpat urna tristique finibus iaculis. Morbi facilisis.
                </p>
                <div className="flex space-x-4 justify-center">
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                    className="text-blue-500 hover:underline"
                  >
                    View detail
                  </a>
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                    className="text-blue-500 hover:underline"
                  >
                    Enquiry
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="service-box bg-white shadow-lg rounded-lg p-6">
              <div className="element">
                <div
                  className="shape bg-blue-500 h-16 w-16 mb-4 cursor-pointer"
                  data-bs-toggle="modal"
                  data-bs-target="#myModal"
                ></div>
              </div>
              <div className="service-containet">
                <h3 className="text-xl font-semibold mb-2">HEALTH INSURANCE</h3>
                <p className="text-gray-700 mb-4">
                  Mauris volutpat urna tristique finibus iaculis. Morbi facilisis.
                </p>
                <div className="flex space-x-4 justify-center">
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                    className="text-blue-500 hover:underline"
                  >
                    View detail
                  </a>
                  <a
                    href="#"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                    className="text-blue-500 hover:underline"
                  >
                    Enquiry
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-pagination"></div>
      </div>
    </section>
  );
};

export default FBService;
