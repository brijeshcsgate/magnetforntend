import React, { useState, useEffect } from "react";
import styles from "./styles/profileV2.module.css";
import SingleProduct from "./SingleProduct";
import axios from "axios";
const Products = ({products,profileUserId, visitorInfo}) => {
  const [productData, setProductData] = useState(products);
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
