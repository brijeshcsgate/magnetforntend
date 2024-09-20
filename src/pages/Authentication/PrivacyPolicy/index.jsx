import React from "react";
import "./style.css";
import { privacyPolicy } from "./constant";
const PrivacyPolice = () => {
  return (
    <div className="p-5 ">
      <div>
        <h1 className="my-5 heading-600-42 text-center">Privacy Policy</h1>
        <p className="heading-400-24 text-center">
          We are committed to maintaining the accuracy, confidentiality, and
          security of your personally identifiable information ("Personal
          Information"). As part of this commitment, our privacy policy governs
          our actions as they relate to the collection, use and disclosure of
          Personal Information. Our privacy policy is based upon the values set
          by the Canadian Standards Association's Model Code for the Protection
          of Personal Information and Canada's Personal Information Protection
          and Electronic Documents Act.
        </p>
        <div className="police-container">
          {privacyPolicy.map((item, index) => (
            <div className="condition-container" key={index}>
              <label className="condition-title heading-400-26">
                {item?.title}
              </label>
              <p className="condition-para">{item?.para}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolice;
