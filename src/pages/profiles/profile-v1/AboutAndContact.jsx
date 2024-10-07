import React, { useState, useContext } from "react";
import styles from "./styles/profileV1.module.css";
import { BsTelephoneFill, BsGlobe, BsTelegram } from "react-icons/bs";
import { FaLocationPin } from "react-icons/fa6";
import { MdMailOutline } from "react-icons/md";
import { ImWhatsapp } from "react-icons/im";
import { ContextAPI } from "../../../contextAPI/ContextProfileV2";
import GoogleMapReact from "google-map-react";
import SimpleMap from "./GoogeMap";
const AboutAndContact = () => {
  const { choosenColor } = useContext(ContextAPI);
  const [showMore, setShowMore] = useState(false);
  const handleClick = () => {
    setShowMore(!showMore);
  };
  return (
    <div className={styles.aboutAndContactMe}>
      <div>
        <div className={styles.contentTitles}>
          <span className={styles.firstWord}>
            <span className="first-word">About</span>
          </span>{" "}
        </div>
        <p className="text-secondary">
          This section shall help you to have detailed information about
          yourself. Create it quickly with Magnets set of pre-defined ready to
          use templates across industries of your ch
          <span
            id="dots"
            style={{ display: `${showMore ? "none" : "inline"}` }}
          >
            ...
          </span>
          <span
            id="more"
            style={{ display: `${showMore ? "inline" : "none"}` }}
          >
            oice enim ligula venenatis dolor. Maecenas nisl est, ultrices nec
            congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut
            aliquet. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim
            ac. In at libero sed nunc venenatis imperdiet sed ornare turpis.
            Donec vitae dui eget tellus gravida venenatis. Integer fringilla
            congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta.
          </span>
          <span onClick={handleClick} style={{ color: "#6a5fb0" }}>
            {showMore ? "see less" : "see more"}
          </span>
        </p>{" "}
      </div>
      <div className={styles.contactmeContainer}>
        <div className={styles.contentTitles}>
          <span className={styles.firstWord}>
            <span
              className="first-word"
              style={{ color: `${choosenColor ? choosenColor : "#a9dfa2"}` }}
            >
              Contact
            </span>
          </span>{" "}
          Details
        </div>
        <div className={styles.contactBoxs}>
          <div>
            <div>
              <div className={`${styles.contactmeIcon} text-secondary`}>
                <span>
                  <BsTelephoneFill
                    style={{
                      color: `${choosenColor ? choosenColor : "#a9dfa2"}`,
                    }}
                  />
                </span>
                <span>Phone Number</span>
              </div>
              <p
                style={{ color: `${choosenColor}`, paddingLeft: "1.5rem" }}
              >{`(+91) 8126 139 074`}</p>
            </div>
            <div>
              <div className={`${styles.contactmeIcon} text-secondary`}>
                <span>
                  <BsGlobe
                    style={{
                      color: `${choosenColor ? choosenColor : "#a9dfa2"}`,
                    }}
                  />
                </span>
                Website:
              </div>
              <p
                style={{ color: `${choosenColor}`, paddingLeft: "1.5rem" }}
              >{`www.magnet.cards`}</p>
            </div>
            <div>
              <div className={`${styles.contactmeIcon} text-secondary`}>
                {" "}
                <span>
                  <ImWhatsapp
                    style={{
                      color: `${choosenColor ? choosenColor : "#a9dfa2"}`,
                    }}
                  />
                </span>
                {`WhatsApp Number:`}
              </div>
              <p
                style={{ color: `${choosenColor}`, paddingLeft: "1.5rem" }}
              >{`(+91) 8126 139 074`}</p>
            </div>
          </div>
          <div>
            <div>
              <div className={`${styles.contactmeIcon} text-secondary`}>
                <span>
                  <BsTelegram
                    style={{
                      color: `${choosenColor ? choosenColor : "#a9dfa2"}`,
                    }}
                  />
                </span>
                {`Telegram:`}
              </div>
              <p
                style={{ color: `${choosenColor}`, paddingLeft: "1.5rem" }}
              >{`@gyangps`}</p>
            </div>
            <div>
              <div className={`${styles.contactmeIcon} text-secondary`}>
                <span>
                  <MdMailOutline
                    style={{
                      color: `${choosenColor ? choosenColor : "#a9dfa2"}`,
                    }}
                  />
                </span>
                Email address: :
              </div>
              <p
                style={{ color: `${choosenColor}`, paddingLeft: "1.5rem" }}
              >{`ashish.kumar@troology.com`}</p>
            </div>
            <div>
              <div className={`${styles.contactmeIcon} text-secondary`}>
                <span>
                  <FaLocationPin
                    style={{
                      color: `${choosenColor ? choosenColor : "#a9dfa2"}`,
                    }}
                  />
                </span>
                Address:
              </div>
              <p
                style={{ color: `${choosenColor}`, paddingLeft: "1.5rem" }}
              >{`Hazratganj, Lucknow, Uttar Pradesh 226001`}</p>
            </div>
          </div>
        </div>
        <div className={styles.locationBox}>
          {/* api key=AIzaSyAqtH-R0LVFB9wgfhbOOfNRV3LNl6Qg340 */}
          <SimpleMap />
        </div>
      </div>
    </div>
  );
};

export default AboutAndContact;
