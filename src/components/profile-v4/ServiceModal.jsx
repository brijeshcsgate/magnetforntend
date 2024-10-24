import React, { useContext } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ContextAPI } from '@/contextAPI/ContextProfileV2';
const ServiceModal = (isOpenModal) => {

  const { serviceInfo } = useContext(ContextAPI)

  return (
    <div style={{ width: "90%" }}>
      {/* <!-- Modal --> */}
      <div className={isOpenModal ? "modal fade" : ""} id="serviceModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">{serviceInfo?.name}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div>
                <img width={`100%`} className={`card `} src={serviceInfo?.image} alt="" />
              </div>
            </div>
            <div className="modal-footer">
              {serviceInfo?.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceModal
