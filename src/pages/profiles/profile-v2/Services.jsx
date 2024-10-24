import React, { useState, useEffect } from "react";
import SingleService from "./SingleService";
import styles from "./styles/profileV2.module.css";
import axios from "axios";
const Services = ({services,profileUserId,visitorInfo}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [serviceData, setServiceData] = useState(services);
  
  return (
    <div className={`${styles.serviceContainer}`}>
      <h2 className="text-secondary">Services</h2>

      {serviceData?.length > 0 &&
        serviceData?.map((item) => (
          <div key={item.id}>
            <SingleService item={item} profileUserId={profileUserId} visitorInfo={visitorInfo} />
          </div>
        ))}
    </div>
  );
};

export default Services;
