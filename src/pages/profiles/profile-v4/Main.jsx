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
const Main = ({ profileDetails, profileUserId, visitorInfo, name, whatsappNumber, email, companyName, designation, mobile }) => {
    const { selectedTb } = useContext(ContextAPI)
    return (
        < >

            <div className=''>
                <div className={`${selectedTb === "about" ? styles?.showContent : styles?.hideContent}`}>
                    <About aboutUs={profileDetails?.aboutUs} countryCode={profileDetails?.countryCode} mobile={profileDetails?.mobile} whatsappNumberCountryCode={profileDetails?.whatsappNumberCountryCode} whatsappNumber={profileDetails?.whatsappNumber}
              email={profileDetails?.email} address={profileDetails?.address}/>
                </div>
                <div className={`${selectedTb === "services" ? styles?.showContent : styles.hideContent}`}>
                    <Service services={profileDetails?.services} profileUserId={profileUserId} visitorInfo={visitorInfo}/>
                </div>
                <div className={`${selectedTb === "products" ? styles.showContent : styles.hideContent}`}>
                    <Products products={profileDetails?.products} profileUserId={profileUserId} visitorInfo={visitorInfo}/>
                </div>
                <div className={`${selectedTb === "offers" ? styles.showContent : styles.hideContent}`}>
                    <Offers item={profileDetails?.offers}/>
                </div>
                <div className={`${selectedTb === "gallery" ? styles.showContent : styles.hideContent}`}>
                    <Gallery images={profileDetails?.imageGalleries} videos={profileDetails?.videoGalleries} documentsLinks={profileDetails?.documentsLinks}/>
                </div>
                <div className={`${selectedTb === "testimonials" ? styles.showContent : styles.hideContent}`}>
                    <Testimonials testimonials={profileDetails?.testimonials}/>
                </div>
                <div className={`${selectedTb === "payments" ? styles.showContent : styles.hideContent}`}>
                    <Payments bankAccountDetails={profileDetails?.bankAccountDetails} paymentDetails={profileDetails?.paymentDetails} />
                </div>
            </div>

        </>
    )
}

export default Main
