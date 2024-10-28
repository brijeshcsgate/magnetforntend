import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
const FBVideo = ({ videos }) => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(null);

  const handlePlay = (index) => {
    setActiveVideoIndex(index);
  };


  return (
    <section className="mt-65 fbmainbody pt-4 pb-2 mn-pad" id="">


      <div className=" mx-auto px-3 ">
        <div className="flex flex-wrap">
          <div className=" lg:w-1/3">
            <div className="fbheader-section mb-2 px-2">
              <h2 className="text-3xl font-semibold">
                Our <span className="text-blue-500">Videos</span>
              </h2>
            </div>
          </div>
        </div>

        <Swiper className="mySwiper pl-2 pr-3"
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            // When the screen width is >= 1024px (desktop)
            1024: {
              slidesPerView: 3,  // Show 3 slides for larger screens
            },
            // When the screen width is >= 768px (tablet)
            768: {
              slidesPerView: 2,  // Show 2 slides for tablet view
            },
            // When the screen width is >= 640px (mobile)
            640: {
              slidesPerView: 1,  // Show 1 slide for mobile view
            },
          }}
        >
          {videos.map((video, index) => (
            //  <div>
            <SwiperSlide key={index}>

              <div className="swiper-slide pt-2 pl-2 pb-2" >

                <div className="fbservice-box fbbg-white    ">
                  <div className={`${index}?'video-wrapper':''`}    >
                    {activeVideoIndex !== index && (
                      <div
                        className="video-overlay"
                        onClick={() => handlePlay(index)}
                      ></div>
                    )}
                    <iframe
                      className="w-full h-64 rounded-md"
                      src={video?.link}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>

                </div>
                <div className="mt-2 cursor-pointer" data-bs-toggle="modal" data-bs-target="#myvid">
                  <p className="text-lg">{video?.name}</p>
                </div>
              </div>
            </SwiperSlide>
            // </div>
          ))}
        </Swiper>
      </div>
      {/* </div> */}

    </section>
  );
};

export default FBVideo;
