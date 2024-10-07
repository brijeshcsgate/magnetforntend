import React, { useState } from 'react'
import styles from "././styles/profileV2.module.css"
const About = () => {

  const [showMore, setShowMore] = useState(false)
  const handleClick = () => {
    setShowMore(!showMore)
  }
  return (
    <div className={`${styles.aboutContainer}`}>
      <h2 className='text-secondary'>About</h2>
      <p className='text-secondary'>This section shall help you to have detailed information about yourself. Create it quickly with Magnets set
        of pre-defined ready to use templates across industries of your ch<span id="dots" style={{ display: `${showMore ? "none" : "inline"}` }}>...</span><span id="more" style={{ display: `${showMore ? "inline" : "none"}` }}>oice enim ligula venenatis dolor.
          Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet.
          Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed
          ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum.
          Sed dapibus pulvinar nibh tempor porta.</span>
        <span onClick={handleClick} style={{ color: "#6a5fb0" }}>{showMore ? "see less" : "see more"}</span>
      </p>    
    </div>
  )
}

export default About
