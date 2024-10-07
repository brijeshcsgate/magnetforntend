import React from 'react'
import styles from "./styles/profileV2.module.css"
import SingleVideoGallery from './SingleVideoGallery'
const VideoGallery = () => {
  return (
    <div className={styles.videoGalleryContainer}>
      <h2 className='text-secondary'>{`Video Gallery`}</h2>
      <div className={styles.videoGalleryCards}>
            {/* <SingleVideoGallery/>
            <SingleVideoGallery/>
            <SingleVideoGallery/> */}
      </div>
    </div>
  )
}

export default VideoGallery
