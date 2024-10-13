import React from 'react'
import styles from "./styles/profileV2.module.css"
const SingleTestimonial = ({testimonial}) => {
  return (
    <div className={styles.singleTestimonialContainer}>
     
      <h5><i>{testimonial?.name}</i></h5>
      {/* <p>Project: {testimonial?.description}</p> */}
      <hr />
      <div>{testimonial?.description}</div>
    </div>
  )
}

export default SingleTestimonial
