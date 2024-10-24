import React, { useEffect, useState } from 'react'
import NavbarV2 from './NavbarV2'
import ProfileV2 from './ProfileV2'
import Footer from './Footer'
import NoAccessibleProfile from '@/pages/NoAccessibleProfile/NoAccessibleProfile'
import { useParams } from 'react-router-dom'
import VistiorInfoForm from '@/pages/ProfilePages/VistiorInfoForm'
import { APIS } from '@/constants/api.constant'
import apiService from '@/lib/apiService'

const Profilev2Main = () => {



  const [profiles, setProfiles] = useState([]);

  const [profileDetails, setProfileDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const [visitorInfoType, setVisitorInfoType] = useState('')

  const [visitorInfo, setVisitorInfo] = useState('')
  const [profileUserId, setProfileUserId] = useState('')
  const [handleSection, setHandleSection] = useState('')
  const [profileStatus, setProfileStatus] = useState(true)
  const { id } = useParams(); // Access the id from URL
  let profileId = id;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // const response = await apiService.get(`${APIS.GET_ENQUIRY}/${id}`);
        const response = await apiService.get(`${APIS.PROFILE_IDENT}/${id}`);
        setProfileStatus(response?.data?.profileStatus)
        setProfileUserId(response.data._id)
        setProfileDetails(response.data);
        setProfiles(response.data.testimonials);
        setVisitorInfoType(response.data.vistor_info_type)
      } catch (err) {
        setError(err.response?.data?.error || "Error fetching profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [profileId]);

  return (
    <div style={{ position: "relative" }}>
      {profileStatus === true ? <>
        <VistiorInfoForm openP={visitorInfoType != 'Not Required' ? true : false} visitorInfoType={visitorInfoType} profileUserId={profileUserId} setVisitorInfo={setVisitorInfo} />

        <NavbarV2 name={profileDetails?.name} profileImage={profileDetails?.profileImage} />
        <ProfileV2 profileDetails={profileDetails} profileUserId={profileUserId} visitorInfo={visitorInfo} name={profileDetails?.name} whatsappNumber={+"+" + profileDetails?.whatsappNumberCountryCode + " " + profileDetails?.whatsappNumber} email={profileDetails?.email} companyName={profileDetails?.orgName} designation={profileDetails?.jobRoleName} mobile=
          {+'+' + profileDetails?.countryCode + ' ' + profileDetails?.mobile} />
        <Footer profileUserId={profileUserId} visitorInfo={visitorInfo} name={profileDetails?.name} whatsappNumber={+"+" + profileDetails?.whatsappNumberCountryCode + " " + profileDetails?.whatsappNumber} email={profileDetails?.email} companyName={profileDetails?.orgName} designation={profileDetails?.jobRoleName} mobile=
          {+'+' + profileDetails?.countryCode + ' ' + profileDetails?.mobile}

          facebookLink={profileDetails?.facebookLink}
          instaLink={profileDetails?.instaLink} twitterLink={profileDetails?.twitterLink} linkedInLink={profileDetails?.linkedInLink}
          youtubeLink={profileDetails?.youtubeLink}
        />
      </>
        :
        <NoAccessibleProfile />
      }
    </div>
  )
}

export default Profilev2Main
