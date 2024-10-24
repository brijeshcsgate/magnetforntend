import React, { useContext } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ContextAPI } from '@/contextAPI/ContextProfileV2';
const OfferModal = (isOpenModal) => {

  const { offerInfo } = useContext(ContextAPI)
  return (
    <div style={{ width: "90%" }}>
      {/* <!-- Modal --> */}
      <div className={isOpenModal ? "modal fade" : ""} id="offerModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">{offerInfo?.name}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div>
                <img width={`100%`} className={`card `} src={offerInfo?.image} alt="" />
              </div>
            </div>
            <p className='text-secondary p-3'>
              {offerInfo?.description}
            </p>
            <p className="text-secondary p-3">
              <b>Start Date:</b>{" "}{offerInfo.startDate}, {offerInfo.startTime}
              <br />
              <b>End Date:</b>{" "}{offerInfo.endDate}, {offerInfo.endTime}                    </p>

          </div>
        </div>
      </div>
    </div >
  )
}

export default OfferModal






















































































































































