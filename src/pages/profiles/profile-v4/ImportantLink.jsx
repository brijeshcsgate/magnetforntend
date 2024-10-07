import React, { useContext } from 'react'
import styles from "../../profiles/profile-v2/styles/profileV2.module.css"
import { ContextAPI } from '../../../contextAPI/ContextProfileV2'

const ImportantLink = () => {
    const { choosenColor } = useContext(ContextAPI)
    return (
        <div className={styles.linkContainer}>
            <div className={styles.singleLink}>
                <img src={`${process.env.PUBLIC_URL + "/img/word.png"}`} alt="word" />
                <div style={{ color: `${choosenColor ? choosenColor : ""}` }}>Link Name 1</div>
            </div>
            <div className={styles.singleLink}>
                <img src={`${process.env.PUBLIC_URL + "/img/excel.png"}`} alt="word" />
                <div style={{ color: `${choosenColor ? choosenColor : ""}` }}>Link Name 2</div>
            </div>
            <div className={styles.singleLink}>
                <img src={`${process.env.PUBLIC_URL + "/img/powerpoint.png"}`} alt="word" />
                <div style={{ color: `${choosenColor ? choosenColor : ""}` }}>Link Name 3</div>
            </div>
            <div className={styles.singleLink}>
                <img src={`${process.env.PUBLIC_URL + "/img/pdf.png"}`} alt="word" />
                <div style={{ color: `${choosenColor ? choosenColor : ""}` }}>Link Name 4</div>
            </div>
            <div className={styles.singleLink}>
                <img src={`${process.env.PUBLIC_URL + "/img/csv.png"}`} alt="word" />
                <div style={{ color: `${choosenColor ? choosenColor : ""}` }}>Link Name 5</div>
            </div>
            <div className={styles.singleLink}>
                <img src={`${process.env.PUBLIC_URL + "/img/link_ico.png"}`} alt="word" />
                <div style={{ color: `${choosenColor ? choosenColor : ""}` }}>Link Name 6</div>
            </div>
        </div>
    )
}

export default ImportantLink