import React from 'react'
import styles from "./styles/profileV2.module.css"
import SingleTestimonial from './SingleTestimonial'
const Testimonials = ({testimonials}) => {
    return (
        <>
        <div className={styles.testimonialsContainer} style={{ backgroundImage: `url("/img/img_bg_main.jpg")` }}>
        <div className={styles.paymentOverlay}>
            <div id="carouselExampleIndicators" className={`${styles.carousels} carousel slide`}>
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                {/* {JSON.stringify(testimonials)} */}
                <div className={`${styles.carouselInner} carousel-inner`} >
                {testimonials?.map((testimonial, index) => (
          
                    <div className={`carousel-item ${index===0?"active":''}`}key={index} >
                         {/* {JSON.stringify(testimonial)} */}
                        <SingleTestimonial testimonial={testimonial}/>
                    </div>
                    // <div className="carousel-item">
                    //     <SingleTestimonial />
                    // </div>
                    // <div className="carousel-item">
                    //     <SingleTestimonial />
                    // </div>
                ))}
                </div>
                <button className={`${styles.carouselIndecator} carousel-control-prev`} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
        </div>
        </>

    )
}

export default Testimonials
