import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress'; // For loading indicator
import './AddInspectionPopup.css';
import { ROUTES } from '@/constants/route.constant';
import { Link, useNavigate } from 'react-router-dom';
import { getApi } from '@/services/method';
import { APIS } from '@/constants/api.constant'; // Import API endpoints

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function AddInspectionPopup({ open, setOpen }) {
  const [loading, setLoading] = React.useState(false);
  const [inspections, setInspections] = React.useState([]);
  const [totalInspections, setTotalInspections] = React.useState(0); // State for total inspections
  const [isActiveTab, setIsActiveTab] = React.useState('Clear All'); // Define the active tab state
  const [error, setError] = React.useState(null); // For error handling
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = React.useState('');

  // Filter inspections based on the search query
  const filteredInspections = inspections.filter((inspection) =>
    inspection.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClose = () => {
    setOpen(false);
  };

  const onAddInspection = () => {
    navigate(ROUTES.INSERT_INSPECTIONS);
  };
  const navigateToEdit = (rowData) => {
    // navigate(`${ROUTES.INSPECTIONS_START_INSPECTION}/${rowData?._id}`, {
    //   state: { isEditeActive: true },
    // });
    navigate(`${ROUTES.INSPECTIONS_START_INSPECTION}/${rowData?._id}`, {
      state: { isEditeActive: true },
    });
  };

  const onGetInspectionApi = () => {
    setLoading(true);
    const payload = {
      page: 1,
      pageSize: '30',
      search: '',
    };

    const url = `${APIS.GET_ALL_Inspections}?pageSize=${payload.pageSize}&page=${payload.page}&search=${payload.search}`;

    getApi(url, null, payload)
      .then((response) => {
        const data = response.data;
        console.log('API Response Data: ', data);
        setTotalInspections(data.totalCount || 0); // Assuming `totalCount` holds the total inspections number

        // Extract list from the response data
        const inspectionList = data.list || [];
        console.log('inspection list: ', inspectionList);
        if (Array.isArray(inspectionList)) {
          setInspections(inspectionList);
        } else {
          setInspections([]);
          setError('Unexpected data format received.');
        }
        setError(null);
      })
      .catch(() => {
        setError('Failed to load inspection forms.');
        setInspections([]);
      })
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    if (open) {
      onGetInspectionApi(false); // Call API when popup opens
    }
  }, [open, isActiveTab]); // Re-fetch data if `isActiveTab` changes

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          id="customized-dialog-title"
          className="aip-header-txt"
        >
          Select Inspection Form
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          dividers
          style={{ width: '600px', padding: '0px 0px 59px 0px' }}
        >
          <div className="aip-txt-20-400-030303">
            {loading ? (
              <CircularProgress /> // Show loading spinner
            ) : error ? (
              <span style={{ justifyContent: 'center', display: 'flex' }}>
                {error}
              </span>
            ) : inspections.length === 0 ? (
              <span style={{ justifyContent: 'center', display: 'flex' }}>
                Oops! There are no inspection forms.
              </span>
            ) : (
              <>
                <div className="top-2 flex justify-end p-5">
                  <input
                    type="text"
                    name="q"
                    className="border h-8 shadow p-2 rounded-full text-sm pr-10 pl-4 focus:outline-none"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: '170px', fontSize: '12px' }}
                  />
                  <button
                    type="submit"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      marginLeft: '-30px',
                    }}
                  >
                    <svg
                      className="h-5 w-5 fill-current text-gray-500 dark:text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 56.966 56.966"
                    >
                      <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                    </svg>
                  </button>
                </div>

                <div className="scrolldata">
                  {filteredInspections.map((inspection,params) => (
                    <div key={inspection._id} className="inspection-card">
                      
                      <Link
                      to={`/inspections/start_inspection/${inspection._id}?add=true`}
                      state={{ id: inspection._id }}
                        // to="#"
                        // onClick={(e) => {
                        //   e.preventDefault();
                        //   navigateToEdit(inspection);
                        // }}
                        style={{ textDecoration: 'none', color: '#333' }}
                      >
                        <p>{inspection.title}</p>
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </DialogContent>
        <div className="footer-container">
          <Button
            variant="contained"
            onClick={onAddInspection}
            className="aip-cta-15-700-roboto aip-pad-8-16"
          >
            + Add Inspection Form
          </Button>
          <div className="total-inspections">
            Total Inspections: {totalInspections}
          </div>
        </div>
      </BootstrapDialog>
    </React.Fragment>
  );
}
