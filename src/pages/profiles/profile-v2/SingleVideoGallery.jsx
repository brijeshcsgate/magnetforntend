import React from 'react'
import styles from "./styles/profileV2.module.css"
import YouTube from 'react-youtube';
const SingleVideoGallery = () => {
    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            // YouTube player parameters
            autoplay: 0, // Set to 1 if you want the video to autoplay
        },
    };
    return (
        <div className={styles.SingleVideoGalleryContainer}>
            <YouTube videoId={`kqtD5dpn9C8`} opts={opts} />

            <div className={styles.singleVideoGalleryText}>
                <h2 className='fs-5'>{`Magnet`}</h2>
            </div>
        </div>
    )
}
export default SingleVideoGallery
