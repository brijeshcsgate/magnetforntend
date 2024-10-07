import React from 'react'
import ImageGallery from './ImageGallery'
import VideoGallery from './VideoGallery'
import ImportantLink from './ImportantLink'
import styles from "./styles/profileV4.module.css"

const Gallery = () => {
  return (
    <div>
      <div className={styles.titleUnderline}>
        <span></span>
        <h5>Image</h5>
      </div>
      <ImageGallery />
      <br />
      <br />
      <div className={styles.titleUnderline}>
        <span></span>
        <h5>Video</h5>
      </div>
      <VideoGallery />
      <br />
      <br />
      <div className={styles.titleUnderline}>
        <span></span>
        <h5>Important Link</h5>
      </div>
      <ImportantLink />
    </div>
  )
}

export default Gallery
