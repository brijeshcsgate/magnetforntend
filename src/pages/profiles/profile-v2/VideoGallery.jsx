import React from 'react'
import styles from "./styles/profileV2.module.css"
import SingleVideoGallery from './SingleVideoGallery'
import VideoCard from '@/pages/ProfilePages/VideoCard'
const VideoGallery = ({videos}) => {
  return (
    <div className={styles.videoGalleryContainer}>
      <h2 className='text-secondary'>{`Video Gallery`}</h2>
      <div className={styles.videoGalleryCards}>
            {/* <SingleVideoGallery/>
            <SingleVideoGallery/>
            <SingleVideoGallery/> */}

            
      {videos?.length > 0 &&
        videos.map((video,index) => (
          <div key={video.id}>
            {/* <SingleProduct item={ele} /> */}
            <VideoCard
                  key={index}
                  popupHref={video?.link}
                  videoSrc={video?.link}
                  title={video?.name}
                  dataSrId={video?.dataSrId}
                /> 
            {/* <SingleImageGallery item={ele} /> */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default VideoGallery
