import React, { useState, useEffect } from "react";
import SingleService from "./SingleService";
import styles from "./styles/profileV2.module.css";
import axios from "axios";
const Services = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [serviceData, setServiceData] = useState([]);
  const fetchServiceV2Data = () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFrQGdtYWlsLmNvbSIsInVzZXJJZCI6IjY0ZDFlOGY0ZjNhNzUzMjFlMGE4YzQ5OSIsImlhdCI6MTY5MTQ3ODI2MH0.TSIxHVxpi6DQk15tscKJq03cTwdK33NeEz1rij9ualo";
    axios
      .get("http://localhost:8080/getservice", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setServiceData(res.data.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    fetchServiceV2Data();
  }, []);
  return (
    <div className={`${styles.serviceContainer}`}>
      <h2 className="text-secondary">Services</h2>

      {serviceData.length > 0 &&
        serviceData?.map((item) => (
          <div key={item.id}>
            <SingleService item={item} />
          </div>
        ))}
    </div>
  );
};

export default Services;
