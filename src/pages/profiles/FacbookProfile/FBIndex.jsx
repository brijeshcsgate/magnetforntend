import React from 'react'

const FBIndex = () => {
  return (
    <div>
      
    <div className="header">
        <div className="container">
            <div className="heroback">
                <img src="assets/img/fbbg.jpg" />
            </div>
            <div className="profilecont">
                <div className="profileimg">
                    <img src="assets/img/new.jpeg" alt=""
                        style={{width:'180px', height:'180px', borderRadius:'50%', objectFit: 'cover'}}/>
                </div>
                <div className="aboutprofile">
                    <h2>Brijesh Yadav <span>(Web Developer)</span></h2>
                    <span className="itailic">It is a long established fact that a reader will be distracted by the
                        readable content of a page when looking at its
                        layout.</span>
                    <div className="linkbar">
                        <a href=""><i className="fa-brands fa-facebook-square"></i></a>
                        <a href=""><i className="fa-brands fa-instagram-square"></i></a>
                        <a href=""><i className="fa-brands fa-twitter-square"></i></a>
                        <a href=""><i className="fa-brands fa-youtube-square"></i></a>
                        <a href=""><i className="fa-brands fa-linkedin-in"></i></a>
                    </div>
                </div>
                <div className="socillink">
                    <div className="herologo">
                        <img src="assets/img/liclogo.png" alt="" srcset=""/>
                        <img data-bs-toggle="modal" href="#exampleModalToggle" role="button" src="assets/img/qr.png"
                            alt="" srcset="" style={{width:'42px'}}/>
                    </div>
                    <div className="herologo">
                        <h6 cplass>Life Insurance Corporation of India</h6>
                    </div>
                    <div className="linkbutton">
                        <a data-bs-toggle="modal" data-bs-target="#refer-business" name="" id="" className="btn First-act"
                            href="#" role="button"><i className="fa-solid fa-briefcase"></i> Refer
                            Business</a>
                        <a name="" id="" className="btn" href="#" role="button"><i className="fa-solid fa-circle-question"></i>
                            Enquiry</a>
                        <a name="" id="" className="btn" href="#" role="button"><i className="fa-solid fa-floppy-disk"></i> Save
                            My Contact</a>
                    </div>
                </div>
            </div>

            <div className="topend"></div>

            <div className="navigation" id="navbar">
                <nav className="navbar navbar-expand-lg navbar-light p-0">
                    <button style={{boxShadow:'none'}} className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <button style={{border:'none'}} className="navbar-toggler p-0" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <div className="d-flex align-items-center">
                            <p className="m-0 me-2"> Brijesh Yadav</p>
                            <img style={{width: '40px', height:'40px' ,borderRadius: '50%', objectFit: 'cover'}}
                                src="assets/img/new.jpeg" alt=""/>
                        </div>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" href="#prolink">Profile</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#servlink">Services</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#prodlink">Products</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#offer">Offers</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#imglink">Gallery</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#testilink">Testimonial</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#paylink">Payment</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#prodlink">Products</a>
                            </li> 
                            <li className="topUserImg">
                                <p>Brijesh Yadav</p>
                                <img src="assets/img/new.jpeg" alt=""/>
                            </li>
                        </ul>
                    </div>
                    
                </nav>
            </div>
        </div>
    </div>
    </div>
  )
}

export default FBIndex

