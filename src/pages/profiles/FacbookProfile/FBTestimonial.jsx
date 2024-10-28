import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles

const FBTestimonial = ({ testimonials }) => {
    return (
        // <div id="testilink">
        <section className=" fbmainbody  pt-4 pb-5 mn-pad" id="">


            <div className=" mx-auto px-3 ">
                <div className="flex flex-wrap">
                    <div className=" lg:w-1/3">
                        <div className="fbheader-section mb-2 px-2">
                            <h2 className="text-3xl font-semibold">
                                Our <span className="text-blue-500">Testimonial</span>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                pagination={{ clickable: true }}
                navigation

                className="mySwiper pl-2 pr-3"
            >
                {testimonials?.map((testimonial, index) => (
                    <SwiperSlide key={index} className="swiper-slide px-2">
                        <div className="fbtestimonial p-6 border  shadow-lg">
                            <address className="fbtestimonial__author text-center">
                                {/* <img src={testimonial.img} alt="" className="testimonial__photo w-16 h-16 rounded-full mx-auto" /> */}
                                <h6 className="fbtestimonial__name text-lg font-semibold">{testimonial?.name}</h6>
                                <p className="fbtestimonial__location text-sm text-gray-500"><i>{testimonial?.location}</i></p>
                            </address>

                            <blockquote className="fbtestimonial__text mt-2 text-gray-700 italic">
                                {testimonial?.description}
                            </blockquote>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

        </section>
        // </div>
    );
};

export default FBTestimonial;
