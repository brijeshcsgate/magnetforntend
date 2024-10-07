import React from 'react'
import styles from "./styles/profileV1.module.css"
import ProfileAndMenu from './ProfileAndMenu'
import ContentContainer from './ContentContainer'
const Main = () => {
  return (
    <div className={`${styles.main}`}>
      <div className={`${styles.profileAndMenuSection}`}>
        <ProfileAndMenu/>
      </div>
      <div className={`${styles.contentContainer}`}>
        <ContentContainer/>
      </div>
    </div>
  )
}

export default Main
