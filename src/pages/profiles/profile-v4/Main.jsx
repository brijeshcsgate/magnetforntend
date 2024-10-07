import React, { useContext, useState } from 'react'
import Service from './Service';
import Products from './Products';
import Offers from './Offers';
import styles from "./styles/main.module.css"
import { ContextAPI } from '../../../contextAPI/ContextProfileV2';
import Testimonials from './Testimonials';
import Payments from './Payments';
import Gallery from './Gallery';
import About from './About';
const Main = () => {
    const { selectedTb } = useContext(ContextAPI)
    return (
        < >

            <div className=''>
                <div className={`${selectedTb === "about" ? styles.showContent : styles.hideContent}`}>
                    <About />
                </div>
                <div className={`${selectedTb === "services" ? styles.showContent : styles.hideContent}`}>
                    <Service />
                </div>
                <div className={`${selectedTb === "products" ? styles.showContent : styles.hideContent}`}>
                    <Products />
                </div>
                <div className={`${selectedTb === "offers" ? styles.showContent : styles.hideContent}`}>
                    <Offers />
                </div>
                <div className={`${selectedTb === "gallery" ? styles.showContent : styles.hideContent}`}>
                    <Gallery />
                </div>
                <div className={`${selectedTb === "testimonials" ? styles.showContent : styles.hideContent}`}>
                    <Testimonials />
                </div>
                <div className={`${selectedTb === "payments" ? styles.showContent : styles.hideContent}`}>
                    <Payments />
                </div>
            </div>

        </>
    )
}

export default Main
