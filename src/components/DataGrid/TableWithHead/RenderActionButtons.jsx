import { useContext, useEffect, useRef } from 'react';
import { Button } from '@mui/material';
import loader from '../../../assets/images/loder.gif';
import { postFileApi } from '@/services/method';
import { APIS } from '@/constants/api.constant';
import { processDataInChunks } from '@/utils/common.helper';
import { toast } from 'react-toastify';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import useOutsideAlerter from '@/hooks/useOutsideAlerter';
const RenderActionButtons = ({
  actionButtons,
  handleMoreButtonClick,
  uploadLoader,
  setIsMoreOpen,
  isMoreOpen,
  moreActionData,
  renderActionButton,
  setUploadLoader,
  onGetVehicleApi,
  handleMoreClose,
}) => {
  const wrapperRef = useRef(null);

  useOutsideAlerter(wrapperRef, handleMoreClose);
  if (!actionButtons || actionButtons.length === 0) {
    return <></>;
  }

  const buttonsToShow = actionButtons.filter(({ show }) => show);
  const handleOpen = (item) => {
    item?.type === 'vehicle'
      ? item.onClick(handleMoreButtonClick, item)
      : setIsMoreOpen(false);
  };

  const handleFileChange = async (e) => {
    var formData = new FormData();
    formData.append('file', e.target.files[0]);
    setUploadLoader(true);
    try {
      postFileApi(APIS.VEHICLE_BULK_UPLOAD, formData).then(async (res) => {
        await processDataInChunks(
          res?.data?.count,
          onGetVehicleApi,
          toast,
          handleMoreClose
        );
      });
    } catch (error) {
      handleMoreClose();
    }
  };

  const Loader = () => {
    return <img src={loader} width={30} height={30} />;
  };
const extractText = (input) => {
  return input?.replace("+ Add ", "");
};



  return (
    <div className='flex gap-3'>
      {buttonsToShow.map((button, index) => renderActionButton(button, index))}
      {moreActionData.length > 0 && (
        <div className="table-more-container" ref={wrapperRef}>
          <Button
            className="button dot flex items-center justify-center p-2"
            onClick={isMoreOpen ? handleMoreClose : handleMoreButtonClick}
            style={{
              height: '42px',
              borderRadius: '7px',
              border: '1px solid #D0D0D0',
            }}
          >
            <MoreHorizIcon className="flex items-center justify-center" />
          </Button>
          {isMoreOpen && (
            <div className="more-menu">
              <input
                type="file"
                id="bulk-upload"
                style={{ display: 'none' }}
                onChange={(e) => handleFileChange(e)}
              />
              {moreActionData &&
                moreActionData.map((item, index) => (
                  <div
                    className="more-menu-item"
                    key={index}
                    onClick={() => {
                      handleOpen(item);
                      item.onClick();
                    }}
                  >
                    <div className="heading-400-12">{item.title}</div>
                    <div className="more-icon">
                      {' '}
                      {item?.type === 'vehicle' ? (
                        uploadLoader ? (
                          <Loader />
                        ) : (
                          item.icon
                        )
                      ) : (
                        item.icon || item.icon
                      )}{' '}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RenderActionButtons;
