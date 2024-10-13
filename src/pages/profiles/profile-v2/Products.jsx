import React, { useState, useEffect } from "react";
import styles from "./styles/profileV2.module.css";
import SingleProduct from "./SingleProduct";
import axios from "axios";
const Products = ({products,profileUserId, visitorInfo}) => {
  const [productData, setProductData] = useState(products);
  // const fetchProductV2Data = () => {
  //   const token =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFrQGdtYWlsLmNvbSIsInVzZXJJZCI6IjY0ZDFlOGY0ZjNhNzUzMjFlMGE4YzQ5OSIsImlhdCI6MTY5MTQ3ODI2MH0.TSIxHVxpi6DQk15tscKJq03cTwdK33NeEz1rij9ualo";

  //   axios
  //     .get(`http://localhost:8080/getproduct`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       setProductData(res.data.data);
  //     })
  //     .catch((err) => {});
  // };

  // useEffect(() => {
  //   fetchProductV2Data();
  // }, []);
  return (
    <div className={`${styles.productContainer}`}>
      <h2 className="text-secondary">Products</h2>
      {productData?.length > 0 &&
        productData.map((ele) => (
          <div key={ele.id}>
            <SingleProduct item={ele} profileUserId={profileUserId} visitorInfo={visitorInfo}/>
          </div>
        ))}
    </div>
  );
};

export default Products;
