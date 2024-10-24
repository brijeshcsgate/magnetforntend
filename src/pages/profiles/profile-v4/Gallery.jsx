import React from 'react'
import ImageGallery from './ImageGallery'
import VideoGallery from './VideoGallery'
import ImportantLink from './ImportantLink'
import styles from "./styles/profileV4.module.css"

const Gallery = ({images,videos,documentsLinks,imageGalleryStatus,videoGalleryStatus,linkStatus}) => {
  return (
    <div>
       {(imageGalleryStatus === true) && (images?.length > 0) ?
<>
      <div className={styles.titleUnderline}>
        <span></span>
        <h5>Image</h5>
      </div>
      <ImageGallery images={images} />
      <br />
      <br />
      </>: <></>}
          {(videoGalleryStatus === true) && (videos?.length > 0) ?
<>
      <div className={styles.titleUnderline}>
        <span></span>
        <h5>Video</h5>
      </div>
      <VideoGallery  videos={videos}/></>: <></>}
          {(linkStatus === true && (documentsLinks?.length > 0)) ?
<>
      <br />
      <br />
      <div className={styles.titleUnderline}>
        <span></span>
        <h5>Important Link</h5>
      </div>
      <ImportantLink documentsLinks={documentsLinks}/>
    </>:<></>}
    </div>
  )
}

export default Gallery
