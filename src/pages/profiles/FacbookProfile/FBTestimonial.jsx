import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; // Import Swiper styles

const testimonials = [
    {
        name: 'Brijesh Yadav',
        location: 'Troology',
        text: `Quisquam itaque deserunt ullam, quia ea repellendus provident,
               ducimus neque ipsam modi voluptatibus doloremque, corrupti
               laborum. Incidunt numquam perferendis veritatis neque repellendus.
               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo
               deserunt exercitationem deleniti.`,
        img: 'assets/img/profile.jpg',
    },
    {
        name: 'Brijesh',
        location: 'Troology',
        text: `Quisquam itaque deserunt ullam, quia ea repellendus provident,
               ducimus neque ipsam modi voluptatibus doloremque, corrupti
               laborum. Incidunt numquam perferendis veritatis neque repellendus.
               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo
               deserunt exercitationem deleniti.`,
        img: 'assets/img/profile.jpg',
    },
    {
        name: 'Brijesh',
        location: 'Troology',
        text: `Quisquam itaque deserunt ullam, quia ea repellendus provident,
               ducimus neque ipsam modi voluptatibus doloremque, corrupti
               laborum. Incidunt numquam perferendis veritatis neque repellendus.
               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo
               deserunt exercitationem deleniti.`,
        img: 'assets/img/profile.jpg',
    },
];

const FBTestimonial = () => {
    return (
        // <div id="testilink">
        <section className=" " id="">
            <div className="container mx-auto px-5 pt-4">

                <div className="row">
                    <div className="col-md-10 col-lg-8">
                        <div className="header-section pt-3 px-4">
                            <h2 className="text-3xl font-semibold">
                                Our <span className="text-blue-500">Testimonial</span>
                            </h2>
                        </div>
                    </div>
                </div>

                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    navigation
                >
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={index} className="swiper-slide">
                            <div className="testimonial p-6 border rounded-lg shadow-lg">
                                <address className="testimonial__author text-center">
                                    <img src={testimonial.img} alt="" className="testimonial__photo w-16 h-16 rounded-full mx-auto" />
                                    <h6 className="testimonial__name text-lg font-semibold">{testimonial.name}</h6>
                                    <p className="testimonial__location text-sm text-gray-500">{testimonial.location}</p>
                                </address>

                                <blockquote className="testimonial__text mt-4 text-gray-700 italic">
                                    {testimonial.text}
                                </blockquote>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
        // </div>
    );
};

export default FBTestimonial;
