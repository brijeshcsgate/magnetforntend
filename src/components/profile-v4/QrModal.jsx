import React from 'react'
import "../../pages/profiles/profile-v2/styles/navbar.css"
const QrModal = () => {


  return (
    <div className="modal fade" id="qrModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content" >
          <div style={{position:"relative"}}  className='modal-header'>
            <button style={{position:"absolute",right:"10px",top:"10px"}} type="button" className="btn-close"  data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body" style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "80%", textAlign: "center" }}>

              <img style={{
                height: "100px",
                width: "100px",
                borderRadius: "50%",
              }} src={`${process.env.PUBLIC_URL + "/imgV4/profile-img.jpg"}`} alt="qr" />
              <h3 className="text-secondary">{`Shahista Naaz`}</h3>
              <p className="text-secondary">{`Full-stack developer`}</p>
              <img src={`${process.env.PUBLIC_URL + "/img/qr.png"}`} alt="qr" />
              <div style={{ display: "flex", gap: "1rem", width: "100%", justifyContent: "center" }}>
                <button style={{ border: "none", backgroundColor: "#425cbb", padding: "5px 11px", color: "white" }} >{`Share my code`}</button>
                <button style={{ border: "none", backgroundColor: "#425cbb", padding: "5px 11px", color: "white" }} >{`Save to photos`}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QrModal
