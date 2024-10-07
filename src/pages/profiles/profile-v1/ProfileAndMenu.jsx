import React from 'react'
import MenuContainer from './MenuContainer'
import Profile from './Profile'
import styles from "./styles/profileV1.module.css"
const ProfileAndMenu = () => {
  return (
    <>
    <div className={styles.profileAndMenu}>
      <div className={styles.menuContainer}>
        <MenuContainer/>
      </div>
      <div className={styles.profileContainer}>
        <Profile/>
      </div>
    </div>
    </>
  )
}

export default ProfileAndMenu
