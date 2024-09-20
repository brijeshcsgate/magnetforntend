import BreadCrumbs from '@/components/common/BreadCrumbs/BreadCrumbs';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants/route.constant';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AvatarIcon from '/assets/images/user.png';
import { PencilIcon } from 'lucide-react';
import CrewPreviewPage from './CrewPreviewPage';
import DataCharectersTooltip from '@/components/ui/DataCharectersTooltip';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';

const CrewPreview = () => {
  const [isActiveTabs, setIsActiveTab] = useState('Preview');
  const [usrPrvData, setUsrPrvData] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  const boldItem = 'Crew';
  const {setCount } = useContext(CounterContext);
  useEffect(() => { 
    setCount('Crew');
  }, []);
  const onUserDetailsGetById = async () => {
    const getByIdUrl = `${import.meta.env.VITE_APP_BASE_URL_V1}v1/user/${location.state.id}`;
    let response;
    try {
      response = await axios.get(getByIdUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response?.status === 200) {
        setUsrPrvData(response.data.data);
      }
    } catch (error) {
      //
    }
  };
  useEffect(() => {
    onUserDetailsGetById();
  }, []);
  const navigateToEdit = (rowData) => {
    navigate(`${ROUTES.UPDATE_CREW}/${rowData?._id}`, {
      state: { isEditeActive: true },
    });
  };

  return (
    <div className="preview-v-main-container">
      <div className="preview-v-form-container">
        <div className="preview-v-form-top-section ">
          <div className=" flex justify-between">
            <div className="mr-10">
              <BreadCrumbs
                backNavi={() => navigate(ROUTES.CREW)}
                breadCrumbs={[]}
                boldItem={boldItem}
              />

              <div className="preview-top-v-details">
                <div className="preview-top-v-img border-radius-50">
                  <img
                    style={{ width: '100%', height: '100%' }}
                    src={usrPrvData?.profileImage.url || AvatarIcon}
                    alt=""
                  />
                </div>
                <div className="row-equal-spacing p2-2 pb-2">
                  <div className="heading-600-24 text-gray-primary v-center pt-7x">
                    {/* {usrPrvData?.name?.english} */}

                    <DataCharectersTooltip
                      text={usrPrvData?.name?.english}
                      maxLength={60}
                    />
                  </div>
                  <div className="heading-400-12 text-gray-quaternary">
                    {usrPrvData?.loginEmail}
                  </div>

                  <div className="heading-400-12 text-gray-quaternary">
                    {usrPrvData?.loginMobile}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              <Button
                onClick={() => navigateToEdit(usrPrvData)}
                variant="outline"
                size="icon"
                className="group pd-l-4 pd-r-4"
              >
                <span className="">
                  <PencilIcon width="12px" />
                </span>
                &nbsp;&nbsp; <span className="hidden lg:block"> Edit</span>
              </Button>
            </div>
          </div>
          <div className="top-bottom-section"></div>
        </div>
        {isActiveTabs === 'Preview' && (
          <CrewPreviewPage response={usrPrvData} id="id" />
        )}
      </div>
    </div>
  );
};

export default CrewPreview;
