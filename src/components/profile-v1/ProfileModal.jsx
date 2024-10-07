import React from "react";
import style from "./modal.module.css";

const ProfileModal = (isOpenModal) => {
  return (
    <div style={{ width: "100%" }}>
      <div
        className={isOpenModal ? "modal fade" : ""}
        id="formModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className={`${style.modalDescription}`}>
            <div className={`${style.modalContent} modal-content`}>
              <div className="modal-header">
                <h4 className="modal-title" id="exampleModalLabel">
                  Connect with Shahista Naaz
                </h4>

                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Add Shahista to your connections and business with each other!
                  Submit this connection form to connect & enquire about the
                  Service/Products for your own use. If in case you want to
                  refer Shahista Naaz to your friend or business, please click
                  here to refer business.
                </p>
                <h5>Date: 25/11/2021</h5>
                <div className={`${style.select}`}>
                  <label for="gender" className="fw-bold fs-8 pe-2">
                    Connection type:{" "}
                  </label>
                  <input
                    type="radio"
                    id="gender"
                    name="gender"
                    value="male"
                    className="m-1"
                  />
                  Request Connection
                  <input
                    type="radio"
                    id="gender"
                    name="gender"
                    value="female"
                    className="m-1"
                  />
                  Reffer to Friend
                </div>

                <div className="contactForm">
                  <form className={`${style.siteForm}`}>
                    <div className="row position-relative">
                      <div className="col-md-6">
                        <input
                          className={`${style.siteInput}`}
                          placeholder="Name"
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          className={`${style.siteInput}`}
                          placeholder="E-mail"
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          className={`${style.siteInput}`}
                          placeholder="Mobile Number"
                        />
                      </div>
                      <div className="col-md-6">
                        <input
                          className={`${style.siteInput}`}
                          placeholder="Your Industry"
                        />
                      </div>
                      <div className="col-md-12">
                        <input
                          className={`${style.siteInput}`}
                          placeholder="Address"
                        />
                      </div>
                      <div className="col-md-12">
                        <textarea
                          className={`${style.siteArea}`}
                          placeholder="Message"
                        ></textarea>
                      </div>
                      <div>

                      <h5 className={`${style.referral}`}>
                        How hot is referral?
                      </h5>
                      <div className={`${style.rate}`}>
                        <input type="radio" id="star5" name="rate" value="5" />
                        <label for="star5" title="text">
                          5 stars
                        </label>
                        <input type="radio" id="star4" name="rate" value="4" />
                        <label for="star4" title="text">
                          4 stars
                        </label>
                        <input type="radio" id="star3" name="rate" value="3" />
                        <label for="star3" title="text">
                          3 stars
                        </label>
                        <input type="radio" id="star2" name="rate" value="2" />
                        <label for="star2" title="text">
                          2 stars
                        </label>
                        <input type="radio" id="star1" name="rate" value="1" />
                        <label for="star1" title="text">
                          1 star
                        </label>
                      </div>
                      </div>
                      <div
                        className={`${style.top_15} ${style.bottom_30} col-md-12`}
                      >
                        <button className={`${style.siteBtn}`} type="submit">
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
