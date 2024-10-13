import React, { useState } from 'react'
import styles from "././styles/profileV2.module.css"
const About = ({ aboutUs }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle the text view
  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className={`${styles.aboutContainer}`}>
      <h2 className='text-secondary'>About</h2>
      <p className='text-secondary'>
        {isExpanded ? aboutUs : aboutUs?.slice(0, 200)}
        {aboutUs?.length >= 200 ?
          <span onClick={toggleText} id="dots" style={{color:'blue'}}>
            {isExpanded ? "show less" : "... see more"}
          </span> : <></>
        }
        </p>
    </div>
  )
}

export default About
