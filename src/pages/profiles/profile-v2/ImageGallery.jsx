import React from 'react'
import styles from "./styles/profileV2.module.css"
import SingleImageGallery from './SingleImageGallery'
const ImageGallery = ({ images }) => {
  return (
    <div className={styles.imageGalleryContainer}>
      <h2 className='text-secondary'>Image Gallery</h2>
      <div className={styles.imageGalleryCards}>

        {images?.length > 0 &&
          images.map((ele) => (
            <div key={ele.id}>

              <SingleImageGallery item={ele} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default ImageGallery
