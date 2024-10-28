import React from 'react'
import styles from "./styles/profileV4.module.css"
import SingleTestimonial from './SingleTestimonials'
import Carousel from 'react-bootstrap/Carousel';

const Testimonials = ({testimonials}) => {


  return (
    <>
    <div className={styles.h100vh}>
      <div className={styles.m4linespacing}>
        <span></span>
        <h5 className={styles.fnSiz700}>Testimonials</h5>
      </div>
      <Carousel indicatorLabels={null} indicators={null} draggable={1} nextIcon={null} nextLabel={null} prevIcon={null} prevLabel={null}>
      
      {testimonials?.map((testimonial, index) => (
          
      
        <Carousel.Item key={index}>
          <SingleTestimonial testimonial={testimonial}/>
        </Carousel.Item>
        ))}
        {/* <Carousel.Item>
          <SingleTestimonial />
        </Carousel.Item>
        <Carousel.Item>
          <SingleTestimonial />
        </Carousel.Item> */}
      </Carousel>
      </div>
    </>
  )
}

export default Testimonials
