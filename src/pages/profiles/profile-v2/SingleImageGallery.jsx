import React from 'react'
import styles from "./styles/profileV2.module.css"
const SingleImageGallery = ({item}) => {
    return (
        <div className={styles.singleImageGalleryContainer}>
            <div className={styles.singleImageGalleryImg}>
              
                <img className="d-block w-100" src={item?.image} alt="" />
            </div>

            <div className={styles.singleImageGalleryText}>
                <h2 className='fs-5'>{item?.name}</h2>
            </div>
        </div>
    )
}

export default SingleImageGallery
