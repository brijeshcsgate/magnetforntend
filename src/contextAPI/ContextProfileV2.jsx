import React, { createContext, useState } from "react";

export const ContextAPI = createContext();

export const ContextAPIProvider = ({ children }) => {
  const [choosenColor, setChoosenColor] = useState("");
  const [serviceInfo, setServiceInfo] = useState([]);
  const [showEnquiryFormModal, setShowEnquiryFormModal] = useState(false);
  const [galleryModalShow, setGalleryModalShow] = useState(false);
  const [galleryModalData, setGalleryModalData] = useState([]);
  
  // profile v1
  const [selectedV1MenuEle, setSelectedV1MenuEle] = useState("profile");
  const [openFadeV1, setOpenFadeV1] = useState(true);
  const [viewDetialsModalV1,setViewDetailsModalV1]=useState([])
  
  // Profile v2
  const [isScrolled, setIsScrolled] = useState(false);
  const [serviceModalDataV2,setServiceModalDataV2]=useState([])
  // const [productModalDataV2,setProductModalDataV2]=useState([])
  
  // Profile v4
  const [selectedTb, setSelectedTab] = useState("services");
  return (
    <ContextAPI.Provider
      value={{
        // productModalDataV2,
        // setProductModalDataV2,
        serviceModalDataV2,
        setServiceModalDataV2,
        viewDetialsModalV1,
        setViewDetailsModalV1,
        setGalleryModalData,
        galleryModalData,
        setGalleryModalShow,
        galleryModalShow,
        openFadeV1,
        setOpenFadeV1,
        selectedV1MenuEle,
        setSelectedV1MenuEle,
        showEnquiryFormModal,
        showEnquiryFormModal,
        setShowEnquiryFormModal,
        choosenColor,
        isScrolled,
        setIsScrolled,
        selectedTb,
        setSelectedTab,
        serviceInfo,
        setServiceInfo,
      }}
    >
      {children}
    </ContextAPI.Provider>
  );
};
