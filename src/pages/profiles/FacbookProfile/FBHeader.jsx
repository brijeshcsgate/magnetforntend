import React, { useState } from 'react'
import './fbstyle.css'
const FBHeader = ({profileImage}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };


  return (
    <div className="header">
    <div className="container mx-auto">
        <div className="relative">
            <div className="heroback">
                <img src={profileImage} className="w-full h-10"/>
            </div>
            <div className="flex justify-between items-start  profilecont">
                <div className="profileimg">
                    <img src={profileImage} alt=""
                        className="w-[180px] h-[180px] rounded-full object-cover"/>
                </div>
                <div className="aboutprofile text-left">
                    <h2 className="text-2xl font-bold">Brijesh Yadav <span className="text-gray-500">(Web Developer)</span></h2>
                    <span className="italic text-gray-600">
                        It is a long established fact that a reader will be distracted by the readable content of a
                        page when looking at its layout.
                    </span>
                    <div className="flex mt-4 space-x-2 linkbar">
                        <a href="" className="text-blue-600"><i className="fa-brands fa-facebook-square"></i></a>
                        <a href="" className="text-pink-600"><i className="fa-brands fa-instagram-square"></i></a>
                        <a href="" className="text-blue-500"><i className="fa-brands fa-twitter-square"></i></a>
                        <a href="" className="text-red-600"><i className="fa-brands fa-youtube-square"></i></a>
                        <a href="" className="text-blue-700"><i className="fa-brands fa-linkedin-in"></i></a>
                    </div>
                </div>
                <div className="socillink flex flex-col items-end " >
                    <div className="herologo flex items-center space-x-2 ">
                        <img src={profileImage} alt="" className="w-15 h-10 "/>
                        <img data-bs-toggle="modal" href="#exampleModalToggle" role="button" src={profileImage}
                            alt="" className="w-10 h-10 cursor-pointer"/>
                    </div>
                    <div className="herologo ">
                        <h6 className="text-lg font-semibold">Life Insurance Corporation of India</h6>
                    </div>
                    <div className="flex space-x-2  linkbutton">
                        <a data-bs-toggle="modal" data-bs-target="#refer-business" name="" id=""
                            className=" First-act bg-blue-500 text-white px-4 py-2 rounded" href="#" role="button"><i
                                className="fa-solid fa-briefcase"></i> Refer Business</a>
                        <a name="" id="" className="btn bg-gray-200 text-black px-4 py-2 rounded" href="#" role="button"><i
                                className="fa-solid fa-circle-question"></i> Enquiry</a>
                        <a name="" id="" className="btn bg-gray-200 text-black px-4 py-2 rounded" href="#" role="button"><i
                                className="fa-solid fa-floppy-disk"></i> Save My Contact</a>
                    </div>
                </div>
            </div>
            <div className="topend"></div>

            <div className="navigation " id="navbar">
                <nav className="navbar navbar-expand-lg navbar-light p-0">
                    <button style={{boxShadow:'none'}} className="block md:hidden" type="button" data-bs-toggle="collapse" onClick={handleToggle}
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <button style={{border:'none'}} className="block md:hidden p-0" data-bs-toggle="collapse"  onClick={handleToggle}
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <div className="d-flex align-items-center">
                            <p className="m-0 me-2"> Brijesh Yadav</p>
                            <img style={{width: '40px',height:'40px',borderRadius: '50%', objectFit: 'cover'}}
                                src={profileImage} alt=""/>
                        </div>
                    </button>
                    <div className={` ${isMenuOpen ? '' : 'hidden'} md:flex md:items-center`} id="">
                  
                    {/* <div className="" id="navbarSupportedContent"> */}
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 space-x-4">
                            <li className="nav-item">
                                <a className="nav-link active text-blue-600" href="#prolink">Profile</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-blue-600" href="#servlink">Services</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-blue-600" href="#prodlink">Products</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-blue-600" href="#offer">Offers</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-blue-600" href="#imglink">Gallery</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-blue-600" href="#testilink">Testimonial</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-blue-600" href="#paylink">Payment</a>
                            </li>
                            <li className="topUserImg">
                                <p className="text-gray-600">Brijesh Yadav</p>
                                <img className="w-10 h-10 rounded-full object-cover" src="assets/img/new.jpeg" alt=""/>
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

export default FBHeader
