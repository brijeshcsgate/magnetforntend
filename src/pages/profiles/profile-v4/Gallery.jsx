import React from 'react'
import ImageGallery from './ImageGallery'
import VideoGallery from './VideoGallery'
import ImportantLink from './ImportantLink'
import styles from "./styles/profileV4.module.css"

const Gallery = ({images,videos,documentsLinks}) => {
  return (
    <div>
      <div className={styles.titleUnderline}>
        <span></span>
        <h5>Image</h5>
      </div>
      <ImageGallery images={images} />
      <br />
      <br />
      <div className={styles.titleUnderline}>
        <span></span>
        <h5>Video</h5>
      </div>
      <VideoGallery  videos={videos}/>
      <br />
      <br />
      <div className={styles.titleUnderline}>
        <span></span>
        <h5>Important Link</h5>
      </div>
      <ImportantLink documentsLinks={documentsLinks}/>
    </div>
  )
}

export default Gallery
