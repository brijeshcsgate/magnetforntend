import React, { useContext } from "react";
import styles from "./styles/profileV1.module.css";
import { ContextAPI } from "../../../contextAPI/ContextProfileV2";
import { BsBank2, BsPersonVcardFill } from "react-icons/bs";
import { FaUserAlt, FaUserShield } from "react-icons/fa";
import { MdSavings } from "react-icons/md";
const Payments = () => {
  const { choosenColor } = useContext(ContextAPI);
  return (
    <div className={styles.bankAccountAndUPIImg}>
      <div>
        <div className={styles.contentTitles}>
          <span className={styles.firstWord}>
            <span className="first-word">Bank</span>
          </span>{" "}
          Account Details
        </div>
        <div className={styles.paymentBoxs}>
          <div>
            <div>
              <div className={`${styles.contactmeIcon} text-secondary fw-bold`}>
                <span>
                  <BsBank2 color="#78cc6d" />
                </span>
                <span>Bank Name</span>
              </div>
              <p
                style={{ color: `${choosenColor}`, paddingLeft: "1.5rem" }}
              >{`Bank of Maharashtra`}</p>
            </div>
            <div>
              <div className={`${styles.contactmeIcon} text-secondary fw-bold`}>
                <span>
                  <FaUserAlt color="#78cc6d" />
                </span>
                Account Name
              </div>
              <p
                style={{ color: `${choosenColor}`, paddingLeft: "1.5rem" }}
              >{`Ashish Chaudhary`}</p>
            </div>
            <div>
              <div className={`${styles.contactmeIcon} text-secondary fw-bold`}>
                {" "}
                <span>
                  <BsBank2 color="#78cc6d" />
                </span>
                {`IFSC Code`}
              </div>
              <p
                style={{ color: `${choosenColor}`, paddingLeft: "1.5rem" }}
              >{`PUNB0733600`}</p>
            </div>
            <div>
              <div className={`${styles.contactmeIcon} text-secondary fw-bold`}>
                <span>
                  <BsPersonVcardFill color="#78cc6d" />
                </span>
                {`PAN Card Number`}
              </div>
              <p
                style={{ color: `${choosenColor}`, paddingLeft: "1.5rem" }}
              >{`AAAAA7777A`}</p>
            </div>
          </div>
          <div>
            <div>
              <div className={`${styles.contactmeIcon} text-secondary fw-bold`}>
                <span>
                  <MdSavings color="#78cc6d" />
                </span>
                Account Type:
              </div>
              <p
                style={{ color: `${choosenColor}`, paddingLeft: "1.5rem" }}
              >{`Savings account`}</p>
            </div>
            <div>
              <div className={`${styles.contactmeIcon} text-secondary fw-bold`}>
                <span>
                  <FaUserShield color="#78cc6d" />
                </span>
                Account Number:
              </div>
              <p
                style={{ color: `${choosenColor}`, paddingLeft: "1.5rem" }}
              >{`XXXXXXXXXX`}</p>
            </div>
            <div>
              <div className={`${styles.contactmeIcon} text-secondary fw-bold`}>
                <span>
                  <BsBank2 color="#78cc6d" />
                </span>
                GST No.:
              </div>
              <p
                style={{ color: `${choosenColor}`, paddingLeft: "1.5rem" }}
              >{`07AAACP0165G2ZQ`}</p>
            </div>
            <div>
              <div className={`${styles.contactmeIcon} text-secondary fw-bold`}>
                Remark:
              </div>
              <p
                style={{ color: `${choosenColor}`, paddingLeft: "1.5rem" }}
              >{`Is it possible to reverse funds transferred to the wrong account..`}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.contentTitles}>
        <span className={styles.firstWord}>
          <span className="first-word">UPI</span>
        </span>{" "}
        Image
      </div>
      <div>
        <div>
          <img src={`${process.env.PUBLIC_URL + "/img/qr.png"}`} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Payments;
