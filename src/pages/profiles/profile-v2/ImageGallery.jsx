import React from 'react'
import styles from "./styles/profileV2.module.css"
import SingleImageGallery from './SingleImageGallery'
const ImageGallery = () => {
  return (
    <div className={styles.imageGalleryContainer}>
      <h2 className='text-secondary'>Image Gallery</h2>
      <div className={styles.imageGalleryCards}>
            <SingleImageGallery/>
            <SingleImageGallery/>
            <SingleImageGallery/>
            <SingleImageGallery/>
            <SingleImageGallery/>
            <SingleImageGallery/>
      </div>
    </div>
  )
}

export default ImageGallery
