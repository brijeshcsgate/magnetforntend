import React from 'react'
import "../../pages/profiles/profile-v2/styles/navbar.css"
const QrModal = () => {

  
  return (
    <div className="modal fade" id="qrModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header" style={{ backgroundColor: "#ffffff" }}>
            <button type="button" className="btn-close" style={{ color: "white" }} data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body" style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "50%", textAlign: "center" }}>

              <img style={{
                height: "100px",
                width: "100px",
                borderRadius: "50%",
              }} src={`${process.env.PUBLIC_URL + "/img/ashish.jpeg"}`} alt="qr" />
              <h3 className="text-secondary">{`Ashish`}</h3>
              <p className="text-secondary">{`Full-stack developer`}</p>
              <img src={`${process.env.PUBLIC_URL + "/img/qr.png"}`} alt="qr" />
              <p className='qrP'>{`Share my code`}</p>
              <p className='qrP'>{`Save my code`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QrModal
