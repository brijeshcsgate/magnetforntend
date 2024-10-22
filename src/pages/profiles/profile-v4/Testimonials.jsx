import React from 'react'
import styles from "./styles/profileV4.module.css"
import SingleTestimonial from './SingleTestimonials'
import Carousel from 'react-bootstrap/Carousel';

const Testimonials = () => {


  return (
    <>
    <div className={styles.h100vh}>
      <div className={styles.titleUnderline} >
        <span></span>
        <h5>Testimonials</h5>
      </div>
      <Carousel indicatorLabels={null} indicators={null} draggable={1} nextIcon={null} nextLabel={null} prevIcon={null} prevLabel={null}>
        <Carousel.Item>
          <SingleTestimonial />
        </Carousel.Item>
        <Carousel.Item>
          <SingleTestimonial />
        </Carousel.Item>
        <Carousel.Item>
          <SingleTestimonial />
        </Carousel.Item>
      </Carousel>
      </div>
    </>
  )
}

export default Testimonials
