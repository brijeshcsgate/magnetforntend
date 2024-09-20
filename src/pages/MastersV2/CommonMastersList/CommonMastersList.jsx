/* eslint-disable react/prop-types */
import { deleteIcon, editIcon, importIcon, exportIcon } from '@/assets/Icons';
// import DataTable from "@/components/DataGrid/DataTable";
import RowDetailsButton from '@/components/DataGrid/RowDetailsButton';
import DataTableComponent from '@/components/DataGrid/TableWithHead';
// import BreadCrumbs from "@/components/common/BreadCrumbs/BreadCrumbs";
// import Button from "@/components/common/Button/Button";
import ConfrimationModal from '@/components/common/ConfrimationModal';
import { APIS } from '@/constants/api.constant';
// import { BUTTON_TYPES } from "@/constants/common.constant";
import { ROUTES } from '@/constants/route.constant';
import UpdateStatusModal from '@/components/MasterImport';
import { CommonMasterService } from '@/services/CommonMasterService';
// import { patchApi } from "@/services/method";
// import Modal from '../../../components/Modal'

import { startCase } from 'lodash';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Tabs from '@/components/common/Tabs/Tabs';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';
const navigateToPreview = () => {};
const CommonMastersList = () => {
  const { routeId } = useParams();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [totalCount, setTotalCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modal, setModal] = useState({
    isVisible: false,
    row: null,
    type: '',
  });
  const [isOpen, setIsOpen] = useState(false);
  const { setCount } = useContext(CounterContext);

  const handleButtonClick = () => {
    setIsOpen(!isOpen); // Toggle isOpen state
  };
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`${ROUTES.MASTERS}/${routeId}/${id}/edit`);
  };

  const handleDelete = (row) => {
    setModal({ isVisible: true, row, type: 'delete' });
  };
  const metaData = {
    brakingSystem: {
      patchApi: APIS.BRAKE_SYSTEM,
      title: 'Braking System',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
        },
        {
          field: 'englishName',
          headerName: 'Name [En]',
          headerClassName: 'super-app-theme--header',
          // valueFormatter: ({ value }) => value?.english,
          width: 350,
          renderCell: (params) => <div>{params.row.name.english}</div>,
          valueGetter: (params) => params.row.name.english,
        },
        {
          field: 'hindiName',
          headerName: 'Name [Hi]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => <div>{params?.row?.name.hindi || '-'}</div>,
          valueGetter: (params) => params.row.name.hindi,
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },

        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
          valueGetter: (params) => params.value,
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                // {
                //   title: "View",
                //   icon: openEyeBlack({ width: 16, height: 14 }),
                //   onClick: () => navigateToPreview(params.row),
                // },
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                // {
                //   title: "Archive",
                //   icon: attachIcon({ width: 12, height: 14 }),
                //   onClick: () => navigateToPreview(params.row),
                // },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    'group-in-depot': {
      patchApi: APIS.BUS_CATEGORY,
      title: 'Group In Depot',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
        },
        {
          field: 'englishName',
          headerName: 'Name [En]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 250,
          renderCell: (params) => <div>{params.row.name.english}</div>,
          valueGetter: (params) => params.row.name.english,
        },
        {
          field: 'hindiName',
          headerName: 'Name [Hi]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => <div>{params?.row?.name.hindi || '-'}</div>,
          valueGetter: (params) => params.row.name.hindi,
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    busStop: {
      patchApi: APIS.BUS_STOP,
      title: 'Bus Stations / Stops',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
        },
        {
          field: 'englishName',
          headerName: 'Name [En]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 250,
          renderCell: (params) => <div>{params.row.name.english}</div>,
          valueGetter: (params) => params.row.name.english,
        },
        {
          field: 'hindiName',
          headerName: 'Name [Hi]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => <div>{params?.row?.name.hindi || '-'}</div>,
          valueGetter: (params) => params.row.name.hindi,
        },
        {
          field: 'type',
          headerName: 'Type',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.type,
          width: 200,
          renderCell: (params) => <div>{params?.row?.type || '-'}</div>,
          valueGetter: (params) => params.row.type,
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'busStationArea',
          headerName: 'Bus Station Area',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.busStationArea || '-'}</div>
          ),
          valueGetter: (params) => params.row?.busStationArea,
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    typeOfService: {
      patchApi: APIS.BUS_SERVICE_TYPE,
      title: 'Type of Service',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
        },
        {
          field: 'englishName',
          headerName: 'Name(En)',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 250,
          renderCell: (params) => <div>{params.row.name.english}</div>,
          valueGetter: (params) => params.row.name.english,
        },
        {
          field: 'hindiName',
          headerName: 'Name [Hi]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => <div>{params?.row?.name.hindi || '-'}</div>,
          valueGetter: (params) => params.row.name.hindi,
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    busOwnership: {
      patchApi: APIS.BUS_OWNERSHIP,
      title: 'Bus Ownership',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
        },
        {
          field: 'englishName',
          headerName: 'Name [En]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 250,
          renderCell: (params) => <div>{params.row.name.english}</div>,
          valueGetter: (params) => params.row.name.english,
        },
        {
          field: 'hindiName',
          headerName: 'Name [Hi]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => <div>{params?.row?.name.hindi || '-'}</div>,
          valueGetter: (params) => params.row.name.hindi,
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    contractor: {
      patchApi: APIS.CONTRACTOR,
      title: 'Contractor',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
        },
        {
          field: 'englishName',
          headerName: 'Name [En]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 250,
          renderCell: (params) => <div>{params.row.name.english}</div>,
          valueGetter: (params) => params.row.name.english,
        },
        {
          field: 'hindiName',
          headerName: 'Name [Hi]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => <div>{params?.row?.name.hindi || '-'}</div>,
          valueGetter: (params) => params.row.name.hindi,
        },
        {
          field: 'mobile',
          headerName: 'Mobile No.',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => <div>{params?.row?.mobile || '-'}</div>,
          valueGetter: (params) => params.row.mobile,
        },
        {
          field: 'address',
          headerName: 'Address',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>
              {params?.row?.address?.billing || params?.row?.address || '-'}
            </div>
          ),
          valueGetter: (params) =>
            params?.row?.address?.billing || params?.row?.address,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },

    chassisType: {
      patchApi: APIS.CHASSIS_BODY_TYPE,
      title: 'Chassis Type',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
        },
        {
          field: 'englishName',
          headerName: 'Name [En]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 250,
          renderCell: (params) => <div>{params.row.name.english}</div>,
          valueGetter: (params) => params.row.name.english,
        },
        {
          field: 'hindiName',
          headerName: 'Name [Hi]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => <div>{params?.row?.name.hindi || '-'}</div>,
          valueGetter: (params) => params.row.name.hindi,
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    country: {
      patchApi: APIS.COUNTRY,
      title: 'Country',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
        },
        {
          field: 'name',
          headerName: 'Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
          renderCell: (params) => <div>{params.row.name.english}</div>,
          valueGetter: (params) => params.row.name.english,
        },
        {
          field: 'shortName',
          headerName: 'Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    depot: {
      patchApi: APIS.DEPOT,
      title: 'Depot',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          width: 150,
        },
        {
          field: 'depotName',
          headerName: 'Name (En)',
          headerClassName: 'super-app-theme--header',
          width: 200,
          renderCell: (params) => <div>{params?.row?.name?.english}</div>,
          valueGetter: (params) => params.row.name?.english,
        },
        {
          field: 'depotNameEnglish',
          headerName: 'Name (Hi)',
          headerClassName: 'super-app-theme--header',
          width: 200,
          renderCell: (params) => <div>{params?.row?.name?.hindi}</div>,
          valueGetter: (params) => params.row.name?.hindi,
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'state',
          headerName: 'State',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
          renderCell: (params) => (
            <div>{params?.row?.stateId?.name?.english}</div>
          ),
        },
        {
          field: 'district',
          headerName: 'District',
          headerClassName: 'super-app-theme--header',
          width: 200,
          renderCell: (params) => (
            <div>{params?.row?.districtId?.name?.english}</div>
          ),
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    organisation: {
      patchApi: APIS.ORGANISATION,
      title: 'Organisation',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          width: 150,
        },
        {
          field: 'depotName',
          headerName: 'Name (En)',
          headerClassName: 'super-app-theme--header',
          width: 200,
          renderCell: (params) => <div>{params?.row?.name?.english}</div>,
          valueGetter: (params) => params.row.name?.english,
        },
        {
          field: 'depotNameEnglish',
          headerName: 'Name (Hi)',
          headerClassName: 'super-app-theme--header',
          width: 200,
          renderCell: (params) => <div>{params?.row?.name?.hindi}</div>,
          valueGetter: (params) => params.row.name?.hindi,
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'state',
          headerName: 'State',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
          renderCell: (params) => (
            <div>{params?.row?.stateId?.name?.english}</div>
          ),
        },
        {
          field: 'district',
          headerName: 'District',
          headerClassName: 'super-app-theme--header',
          width: 200,
          renderCell: (params) => (
            <div>{params?.row?.districtId?.name?.english}</div>
          ),
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },

    'organisation-structure': {
      patchApi: APIS.DESIGNATION,
      title: 'Organisation Structure',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
        },
        {
          field: 'englishName',
          headerName: 'Name [En]',
          headerClassName: 'super-app-theme--header',
          // valueFormatter: ({ value }) => value?.english,
          width: 350,
          renderCell: (params) => <div>{params.row.name.english}</div>,
          valueGetter: (params) => params.row.name.english,
        },
        {
          field: 'hindiName',
          headerName: 'Name [Hi]',
          headerClassName: 'super-app-theme--header',
          // valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => <div>{params?.row?.name.hindi || '-'}</div>,
          valueGetter: (params) => params.row.name.hindi,
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          //  valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },

        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
          valueGetter: (params) => params.value,
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                // {
                //   title: "View",
                //   icon: openEyeBlack({ width: 16, height: 14 }),
                //   onClick: () => navigateToPreview(params.row),
                // },
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                // {
                //   title: "Archive",
                //   icon: attachIcon({ width: 12, height: 14 }),
                //   onClick: () => navigateToPreview(params.row),
                // },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },

    district: {
      patchApi: APIS.DISTRICT,
      title: 'District',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 150,
        },
        {
          field: 'englishName',
          headerName: 'Name [En]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 150,
          renderCell: (params) => <div>{params.row.name.english}</div>,
          valueGetter: (params) => params.row.name.english,
        },
        {
          field: 'hindiName',
          headerName: 'Name [Hi]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 150,
          renderCell: (params) => <div>{params?.row?.name.hindi || '-'}</div>,
          valueGetter: (params) => params.row.name.hindi,
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'rtoCode',
          headerName: 'RTO Code',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.rtoCode,
          width: 250,
          renderCell: (params) => <div>{params?.row?.rtoCode || '-'}</div>,
          valueGetter: (params) => params.row.rtoCode,
        },
        {
          field: 'districtPopulation',
          headerName: 'District Population',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.districtPopulation,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.districtPopulation || '-'}</div>
          ),
          valueGetter: (params) => params.row.districtPopulation,
        },
        {
          field: 'state',
          headerName: 'State',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 350,
          renderCell: (params) => <div>{params.row.stateId.name.english}</div>,
        },
        {
          field: 'country',
          headerName: 'Country',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 150,
          renderCell: (params) => (
            <div>{params.row.countryOfOrigin.name.english}</div>
          ),
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },

    deviceType: {
      patchApi: APIS.DEVICE_TYPE,
      title: 'Device Type',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          width: 200,
        },
        {
          field: 'englishName',
          headerName: 'Name [En]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 250,
          renderCell: (params) => <div>{params.row.name.english}</div>,
          valueGetter: (params) => params.row.name.english,
        },
        {
          field: 'hindiName',
          headerName: 'Name [Hi]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => <div>{params?.row?.name.hindi || '-'}</div>,
          valueGetter: (params) => params.row.name.hindi,
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    vehicleDriveType: {
      patchApi: APIS.DRIVE_TYPE,
      title: 'Vehicle Drive Type',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          width: 200,
        },
        {
          field: 'englishName',
          headerName: 'Name [En]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 250,
          renderCell: (params) => <div>{params.row.name.english}</div>,
          valueGetter: (params) => params.row.name.english,
        },
        {
          field: 'hindiName',
          headerName: 'Name [Hi]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => <div>{params?.row?.name.hindi || '-'}</div>,
          valueGetter: (params) => params.row.name.hindi,
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    engineBrand: {
      patchApi: APIS.ENGINE_BRAND,
      title: 'Engine Brand',
      columns: [
        {
          field: 'englishName',
          headerName: 'Name [En]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 250,
          renderCell: (params) => <div>{params.row.name.english}</div>,
          valueGetter: (params) => params.row.name.english,
        },
        {
          field: 'hindiName',
          headerName: 'Name [Hi]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => <div>{params?.row?.name.hindi || '-'}</div>,
          valueGetter: (params) => params.row.name.hindi,
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    fabricator: {
      patchApi: APIS.FABRICTOR,
      title: 'Fabricator',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          width: 200,
        },
        {
          field: 'fabricatorName',
          headerName: 'Name (En)',
          headerClassName: 'super-app-theme--header',
          width: 250,
          renderCell: (params) => <div>{params.row.name.english || '-'}</div>,
        },
        {
          field: 'fabricatorNameHindi',
          headerName: 'Name (Hi)',
          headerClassName: 'super-app-theme--header',
          width: 250,
          renderCell: (params) => <div>{params.row.name.hindi || '-'}</div>,
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    deviceVendor: {
      patchApi: APIS.DEVICE_VENDOR,
      title: 'Device Vendor',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          width: 200,
        },
        {
          field: 'deviceVendorName',
          headerName: 'Name (En)',
          headerClassName: 'super-app-theme--header',
          width: 250,
          renderCell: (params) => <div>{params.row.name.english || '-'}</div>,
        },
        {
          field: 'deviceVendorNameHindi',
          headerName: 'Name (Hi)',
          headerClassName: 'super-app-theme--header',
          width: 250,
          renderCell: (params) => <div>{params.row.name.hindi || '-'}</div>,
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row?.shortName?.english,
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },

    dhaba: {
      patchApi: APIS.FOOD_COURT,
      title: 'Dhaba',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          width: 150,
        },
        {
          field: 'foodCourtName',
          headerName: 'Name (En)',
          headerClassName: 'super-app-theme--header',
          width: 200,
          renderCell: (params) => <div>{params?.row?.name?.english}</div>,
          valueGetter: (params) => params.row.name?.english,
        },
        {
          field: 'depotNameEnglish',
          headerName: 'Name (Hi)',
          headerClassName: 'super-app-theme--header',
          width: 200,
          renderCell: (params) => <div>{params?.row?.name?.hindi}</div>,
          valueGetter: (params) => params.row.name?.hindi,
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'state',
          headerName: 'State',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
          renderCell: (params) => (
            <div>{params?.row?.stateId?.name?.english}</div>
          ),
        },
        {
          field: 'region',
          headerName: 'Region',
          headerClassName: 'super-app-theme--header',
          width: 200,
          renderCell: (params) => (
            <div>{params?.row?.regionId?.name?.english}</div>
          ),
        },
        {
          field: 'category',
          headerName: 'Category',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{params?.row?.category}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    fuelType: {
      patchApi: APIS.FUEL_TYPE,
      title: 'Fuel Type',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          width: 200,
        },
        {
          field: 'fuelTypeName',
          headerName: 'Name (En)',
          headerClassName: 'super-app-theme--header',
          renderCell: (params) => <div>{params.row.name?.english}</div>,
          width: 200,
        },
        {
          field: 'fuelTypeNameHidi',
          headerName: 'Name (Hi)',
          renderCell: (params) => <div>{params.row.name?.hindi}</div>,
          headerClassName: 'super-app-theme--header',
          width: 250,
        },
        {
          field: 'shortName',
          headerName: 'Fuel Type Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    issueCategory: {
      patchApi: APIS.ISSUE_CATEGORY,
      title: 'Issue Category',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
        },
        {
          field: 'name.english',
          headerName: 'Name [En]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 250,
          renderCell: (params) => <div>{params.row.name.english}</div>,
          valueGetter: (params) => params.row.name.english,
        },
        {
          field: 'hindiName',
          headerName: 'Name [Hi]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => <div>{params?.row?.name.hindi || '-'}</div>,
          valueGetter: (params) => params.row.name.hindi,
        },
        // {
        //   field: "colour",
        //   headerName: "Colour",
        //   headerClassName: "super-app-theme--header",
        //   valueFormatter: ({ value }) => value?.hindi,
        //   width: 250,
        //   renderCell: (params) => <div>{params?.row?.colour || "-"}</div>,
        // },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    issueSubCategory: {
      patchApi: APIS.ISSUE_SUB_CATEGORY,
      title: 'Issue Sub Category',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
        },
        {
          field: 'name.english',
          headerName: 'Name [En]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 250,
          renderCell: (params) => <div>{params.row.name.english}</div>,
          valueGetter: (params) => params.row.name.english,
        },
        {
          field: 'hindiName',
          headerName: 'Name [Hi]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => <div>{params?.row?.name.hindi || '-'}</div>,
          valueGetter: (params) => params.row.name.hindi,
        },
        // {
        //   field: "colour",
        //   headerName: "Colour",
        //   headerClassName: "super-app-theme--header",
        //   valueFormatter: ({ value }) => value?.hindi,
        //   width: 250,
        //   renderCell: (params) => <div>{params?.row?.colour || "-"}</div>,
        // },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    newoffice: {
      patchApi: APIS.OFFICE,
      title: 'newoffice',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
          renderCell: (params) => <div>{params.row.officeId}</div>,
          // valueGetter: (params) => params.row.officeId,
        },
        {
          field: 'name.english',
          headerName: 'Name [En]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 250,
          renderCell: (params) => <div>{params.row.name.english}</div>,
          valueGetter: (params) => params.row.name.english,
        },
        {
          field: 'hindiName',
          headerName: 'Name [Hi]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => <div>{params?.row?.name.hindi || '-'}</div>,
          valueGetter: (params) => params.row.name.hindi,
        },

        {
          field: 'premisesType',
          headerName: 'Premises Type',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.premisesType,
          width: 250,
          renderCell: (params) => <div>{params?.row?.premisesType || '-'}</div>,
          valueGetter: (params) => params.row.premisesType,
        },
        {
          field: 'officeType',
          headerName: 'Type',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.officeType,
          width: 250,
          renderCell: (params) => <div>{params?.row?.officeType || '-'}</div>,
          valueGetter: (params) => params.row.officeType,
        },
        {
          field: 'stateId',
          headerName: 'State',
          headerClassName: 'super-app-theme--header',
          // valueFormatter: ({ value }) => value?.lat,
          width: 200,
          renderCell: (params) => (
            <div>{params?.row?.stateId?.name?.english || '-'}</div>
          ),
        },
        {
          field: 'districtId',
          headerName: 'District',
          headerClassName: 'super-app-theme--header',
          // valueFormatter: ({ value }) => value?.lat,
          width: 200,
          renderCell: (params) => (
            <div>{params?.row?.districtId?.name?.english || '-'}</div>
          ),
        },
        {
          field: 'regionId',
          headerName: 'Region',
          headerClassName: 'super-app-theme--header',
          // valueFormatter: ({ value }) => value?.lat,
          width: 200,
          renderCell: (params) => (
            <div>{params?.row?.regionId?.name?.english || '-'}</div>
          ),
        },
        {
          field: 'lat',
          headerName: 'Latitude',
          headerClassName: 'super-app-theme--header',
          // valueFormatter: ({ value }) => value?.lat,
          width: 200,
          renderCell: (params) => <div>{params?.row?.lat || '-'}</div>,
        },
        {
          field: 'long',
          headerName: 'Longitude',
          headerClassName: 'super-app-theme--header',
          // valueFormatter: ({ value }) => value?.lat,
          width: 200,
          renderCell: (params) => <div>{params?.row?.long || '-'}</div>,
        },

        // {
        //   field: "long",
        //   headerName: "Longitude",
        //   headerClassName: "super-app-theme--header",
        //   // valueFormatter: ({ value }) => value?.lat,
        //   width: 200,
        //   renderCell: (params) => <div>{params?.row?.long || "-"}</div>,
        // },
        // {
        //   field: "shortName",
        //   headerName: "Issue Sub-Category Short Name",
        //   headerClassName: "super-app-theme--header",
        //   valueFormatter: ({ value }) => value?.hindi,
        //   width: 250,
        //   renderCell: (params) => (
        //     <div>{params?.row?.shortName?.english || "-"}</div>
        //   ),
        //   valueGetter: (params) => params.row.shortName?.english,
        // },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    office: {
      patchApi: APIS.OFFICE,
      title: 'Office',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
          renderCell: (params) => <div>{params.row.officeId}</div>,
          // valueGetter: (params) => params.row.officeId,
        },
        {
          field: 'name.english',
          headerName: 'Name [En]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 250,
          renderCell: (params) => <div>{params.row.name.english}</div>,
          valueGetter: (params) => params.row.name.english,
        },
        {
          field: 'hindiName',
          headerName: 'Name [Hi]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => <div>{params?.row?.name.hindi || '-'}</div>,
          valueGetter: (params) => params.row.name.hindi,
        },

        {
          field: 'premisesType',
          headerName: 'Premises Type',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.premisesType,
          width: 250,
          renderCell: (params) => <div>{params?.row?.premisesType || '-'}</div>,
          valueGetter: (params) => params.row.premisesType,
        },
        {
          field: 'officeType',
          headerName: 'Type',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.officeType,
          width: 250,
          renderCell: (params) => <div>{params?.row?.officeType || '-'}</div>,
          valueGetter: (params) => params.row.officeType,
        },
        {
          field: 'stateId',
          headerName: 'State',
          headerClassName: 'super-app-theme--header',
          // valueFormatter: ({ value }) => value?.lat,
          width: 200,
          renderCell: (params) => (
            <div>{params?.row?.stateId?.name?.english || '-'}</div>
          ),
        },
        {
          field: 'districtId',
          headerName: 'District',
          headerClassName: 'super-app-theme--header',
          // valueFormatter: ({ value }) => value?.lat,
          width: 200,
          renderCell: (params) => (
            <div>{params?.row?.districtId?.name?.english || '-'}</div>
          ),
        },
        {
          field: 'regionId',
          headerName: 'Region',
          headerClassName: 'super-app-theme--header',
          // valueFormatter: ({ value }) => value?.lat,
          width: 200,
          renderCell: (params) => (
            <div>{params?.row?.regionId?.name?.english || '-'}</div>
          ),
        },
        {
          field: 'lat',
          headerName: 'Latitude',
          headerClassName: 'super-app-theme--header',
          // valueFormatter: ({ value }) => value?.lat,
          width: 200,
          renderCell: (params) => <div>{params?.row?.lat || '-'}</div>,
        },
        {
          field: 'long',
          headerName: 'Longitude',
          headerClassName: 'super-app-theme--header',
          // valueFormatter: ({ value }) => value?.lat,
          width: 200,
          renderCell: (params) => <div>{params?.row?.long || '-'}</div>,
        },

        // {
        //   field: "long",
        //   headerName: "Longitude",
        //   headerClassName: "super-app-theme--header",
        //   // valueFormatter: ({ value }) => value?.lat,
        //   width: 200,
        //   renderCell: (params) => <div>{params?.row?.long || "-"}</div>,
        // },
        // {
        //   field: "shortName",
        //   headerName: "Issue Sub-Category Short Name",
        //   headerClassName: "super-app-theme--header",
        //   valueFormatter: ({ value }) => value?.hindi,
        //   width: 250,
        //   renderCell: (params) => (
        //     <div>{params?.row?.shortName?.english || "-"}</div>
        //   ),
        //   valueGetter: (params) => params.row.shortName?.english,
        // },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    officeFacility: {
      patchApi: APIS.OFFICEFACILITY,
      title: 'Office Facility',
      columns: [
        // {
        //   field: "code",
        //   headerName: "Office Code",
        //   headerClassName: "super-app-theme--header",
        //   valueFormatter: ({ value }) => value?.english,
        //   width: 200,
        //   renderCell: (params) => <div>{params.row.officeId}</div>,
        //   // valueGetter: (params) => params.row.officeId,
        // },
        {
          field: 'name.english',
          headerName: 'Name [En]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 250,
          renderCell: (params) => <div>{params.row.name.english}</div>,
          valueGetter: (params) => params.row.name.english,
        },
        {
          field: 'hindiName',
          headerName: 'Name [Hi]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => <div>{params?.row?.name.hindi || '-'}</div>,
          valueGetter: (params) => params.row.name.hindi,
        },

        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },

    operator: {
      patchApi: APIS.OPERATOR,
      title: 'Operator',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          width: 150,
        },
        {
          field: 'operatorName',
          headerName: 'Name (En)',
          headerClassName: 'super-app-theme--header',
          width: 200,
          renderCell: (params) => <div>{params?.row?.name?.english}</div>,
          valueGetter: (params) => params.row.name?.english,
        },
        {
          field: 'operatorNameEnglish',
          headerName: 'Operator Name (Hi)',
          headerClassName: 'super-app-theme--header',
          width: 200,
          renderCell: (params) => <div>{params?.row?.name?.hindi}</div>,
          valueGetter: (params) => params.row.name?.hindi,
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },

        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
          valueGetter: (params) => params.value,
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                // {
                //   title: "View",
                //   icon: openEyeBlack({ width: 16, height: 14 }),
                //   onClick: () => navigateToPreview(params.row),
                // },
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                // {
                //   title: "Archive",
                //   icon: attachIcon({ width: 12, height: 14 }),
                //   onClick: () => navigateToPreview(params.row),
                // },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },

    userRole: {
      patchApi: APIS.ROLES_PERMISSION,
      title: 'Roles & Permissions',
      columns: [
        {
          field: 'role',
          headerName: 'Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.row?.role,
          width: 350,
          renderCell: (params) => <div>{params?.row?.role?.name?.english}</div>,
          valueGetter: (params) => params?.row?.role,
        },

        {
          field: 'description',
          headerName: 'Description',
          headerClassName: 'super-app-theme--header',
          //  valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => <div>{params?.row?.description || '-'}</div>,
          valueGetter: (params) => params.row.description,
        },

        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                // {
                //   title: "View",
                //   icon: openEyeBlack({ width: 16, height: 14 }),
                //   onClick: () => navigateToPreview(params.row),
                // },
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                // {
                //   title: "Archive",
                //   icon: attachIcon({ width: 12, height: 14 }),
                //   onClick: () => navigateToPreview(params.row),
                // },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    modelEuro: {
      patchApi: APIS.MODEL_EURO,
      title: 'Model Euro',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          //   type: 'number',
          width: 130,
          editable: false,
        },
        {
          field: 'NameEnglish',
          headerName: 'Name (En)',
          headerClassName: 'super-app-theme--header',
          width: 220,
          renderCell: (params) => <div>{params.row.name.english}</div>,
          valueGetter: (params) => params.row.name.english,
        },
        {
          field: 'makeShortName',
          headerName: 'Name (Hi)',
          headerClassName: 'super-app-theme--header',
          width: 180,
          editable: false,
          renderCell: (params) => <div>{params?.row?.name.hindi || '-'}</div>,
          valueGetter: (params) => params.row.name.hindi,
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    region: {
      patchApi: APIS.REGION,
      title: 'Region',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          width: 150,
        },
        {
          field: 'regionName',
          headerName: 'Name (En)',
          headerClassName: 'super-app-theme--header',
          width: 150,
          renderCell: (params) => <div>{params?.row?.name?.english}</div>,
          valueGetter: (params) => params.row.name?.english,
        },
        {
          field: 'regionNameHindi',
          headerName: 'Name (Hi)',
          headerClassName: 'super-app-theme--header',
          width: 150,
          renderCell: (params) => <div>{params?.row?.name?.hindi}</div>,
          valueGetter: (params) => params.row.name?.hindi,
        },
        // {
        //   field: "regionDistrict",
        //   headerName: "District",
        //   headerClassName: "super-app-theme--header",
        //   width: 200,
        //   renderCell: (params) => {
        //     const districtData = params?.row?.districtId || [];
        //     const firstDistrict = districtData[0];
        //     const additionalDistrictsCount = districtData.length - 1;

        //     if (districtData.length === 0) {
        //       return "-";
        //     } else if (districtData.length === 1) {
        //       return firstDistrict?.name?.english;
        //     } else {
        //       return (
        //         <>
        //           {`${firstDistrict?.name?.english} + ${additionalDistrictsCount}`}
        //         </>
        //       );
        //     }
        //   },
        // },
        {
          field: 'regionState',
          headerName: 'State',
          headerClassName: 'super-app-theme--header',
          width: 250,
          renderCell: (params) => <div>{params.row.stateId.name.english}</div>,
        },
        {
          field: 'country',
          headerName: 'Country',
          headerClassName: 'super-app-theme--header',
          width: 150,
          renderCell: (params) => (
            <div>{params.row.countryOfOrigin.name.english}</div>
          ),
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 100,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },

    priority: {
      patchApi: APIS.PRIORITY,
      title: 'Priority',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
        },
        {
          field: 'row.name.english',
          headerName: 'Name [En]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 250,
          renderCell: (params) => <div>{params.row.name.english}</div>,
          valueGetter: (params) => params.row.name.english,
        },
        {
          field: 'hindiName',
          headerName: 'Name [Hi]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => <div>{params?.row?.name.hindi || '-'}</div>,
          valueGetter: (params) => params.row.name.hindi,
        },
        {
          field: 'dueDate',
          headerName: 'Due Days',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
        },
        {
          field: 'colour',
          headerName: 'Colour',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => <div>{params?.row?.colour || '-'}</div>,
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },

    typeOfRoad: {
      patchApi: APIS.ROAD_TYPE,
      title: 'Type of Road',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
        },
        {
          field: 'englishName',
          headerName: 'Name [En]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 350,
          renderCell: (params) => <div>{params.row?.route?.english}</div>,
          valueGetter: (params) => params.row?.route?.english,
        },
        {
          field: 'hindiName',
          headerName: 'Name [Hi]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => <div>{params?.row?.route?.hindi || '-'}</div>,
          valueGetter: (params) => params.row.route?.hindi,
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },

        {
          field: 'type',
          headerName: 'Type',
          headerClassName: 'super-app-theme--header',
          //  valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => <div>{params?.row?.type || '-'}</div>,
          valueGetter: (params) => params.row.type,
        },
        {
          field: 'number',
          headerName: 'Number',
          headerClassName: 'super-app-theme--header',
          //  valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => <div>{params?.row?.number || '-'}</div>,
          valueGetter: (params) => params.row.number,
        },
        {
          field: 'originPoint',
          headerName: 'Origin',
          headerClassName: 'super-app-theme--header',
          //  valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => <div>{params.row?.point?.origin || '-'}</div>,
          valueGetter: (params) => params.row?.point?.origin,
        },
        {
          field: 'endPoint',
          headerName: 'End',
          headerClassName: 'super-app-theme--header',
          //  valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => <div>{params.row?.point?.end || '-'}</div>,
          valueGetter: (params) => params.row?.point?.end,
        },
        /*   {
          field: "state",
          headerName: "State",
          headerClassName: "super-app-theme--header",
          valueFormatter: ({ value }) => value?.english,
          width: 350,
          renderCell: (params) => <div>{params?.row?.stateId?.name?.english}</div>,
        },
        {
          field: "country",
          headerName: "Country",
          headerClassName: "super-app-theme--header",
          valueFormatter: ({ value }) => value?.english,
          width: 150,
          renderCell: (params) => (
            <div>{params?.row?.countryOfOrigin?.name?.english}</div>
          ),
        },*/
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
          valueGetter: (params) => params.value,
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                // {
                //   title: "View",
                //   icon: openEyeBlack({ width: 16, height: 14 }),
                //   onClick: () => navigateToPreview(params.row),
                // },
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                // {
                //   title: "Archive",
                //   icon: attachIcon({ width: 12, height: 14 }),
                //   onClick: () => navigateToPreview(params.row),
                // },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },

    routeCategory: {
      patchApi: APIS.ROUTE_CATEGORY,
      title: 'Route Category',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
        },
        {
          field: 'name.english',
          headerName: 'Name [En]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 250,
          renderCell: (params) => <div>{params.row.name.english}</div>,
          valueGetter: (params) => params.row.name.english,
        },
        {
          field: 'hindiName',
          headerName: 'Name [Hi]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => <div>{params?.row?.name.hindi || '-'}</div>,
          valueGetter: (params) => params.row.name.hindi,
        },
        {
          field: 'distance',
          headerName: 'Distance(in km)',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => <div>{params?.row?.distance || '-'}</div>,
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    routeType: {
      patchApi: APIS.ROUTE_TYPE,
      title: 'Route Type',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
        },
        {
          field: 'englishName',
          headerName: 'Name [En]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 250,
          renderCell: (params) => <div>{params.row.name.english}</div>,
          valueGetter: (params) => params.row.name.english,
        },
        {
          field: 'hindiName',
          headerName: 'Name [Hi]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => <div>{params?.row?.name.hindi || '-'}</div>,
          valueGetter: (params) => params.row.name.hindi,
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    state: {
      patchApi: APIS.STATE,
      title: 'State',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
        },
        {
          field: 'state',
          headerName: 'Name (En)',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 330,
          renderCell: (params) => <div>{params.row.name.english}</div>,
          valueGetter: (params) => params.row.name.english,
        },
        {
          field: 'statehindi',
          headerName: 'Name (Hi)',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 300,
          renderCell: (params) => <div>{params?.row?.name.hindi || '-'}</div>,
          valueGetter: (params) => params.row.name.hindi,
        },
        {
          field: 'country',
          headerName: 'Country',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
          renderCell: (params) => (
            <div>{params.row.countryOfOrigin.name.english}</div>
          ),
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    seatingConfiguration: {
      patchApi: APIS.SEATING_CONFIGURATION,
      title: 'Seating Configuration',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 250,
        },
        {
          field: 'englishName',
          headerName: 'Name [En]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 350,
          renderCell: (params) => <div>{params.row.name.english}</div>,
          valueGetter: (params) => params.row.name.english,
        },
        {
          field: 'hindiName',
          headerName: 'Name [Hi]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 350,
          renderCell: (params) => <div>{params?.row?.name.hindi || '-'}</div>,
          valueGetter: (params) => params.row.name.hindi,
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    toll: {
      patchApi: APIS.TOLL,
      title: 'Toll',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
        },
        {
          field: 'englishName',
          headerName: 'Name [En]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 350,
          renderCell: (params) => <div>{params.row.name.english}</div>,
          valueGetter: (params) => params.row.name.english,
        },
        {
          field: 'hindiName',
          headerName: 'Name [Hi]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 350,
          renderCell: (params) => <div>{params?.row?.name.hindi || '-'}</div>,
          valueGetter: (params) => params.row.name.hindi,
        },
        // {
        //   field: "state",
        //   headerName: "State",
        //   headerClassName: "super-app-theme--header",
        //   width: 250,
        //   renderCell: (params) => <div>{params.row.stateId.name.english}</div>,
        // },
        // {
        //   field: "country",
        //   headerName: "Country",
        //   headerClassName: "super-app-theme--header",
        //   width: 150,
        //   renderCell: (params) => (
        //     <div>{params.row.countryId.name.english}</div>
        //   ),
        // },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    transmissionType: {
      patchApi: APIS.TRANSMISSION_TYPE,
      title: 'Transmission Type',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
        },
        {
          field: 'englishName',
          headerName: 'Name [En]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 350,
          renderCell: (params) => <div>{params.row.name.english}</div>,
          valueGetter: (params) => params.row.name.english,
        },
        {
          field: 'hindiName',
          headerName: 'Name [Hi]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 350,
          renderCell: (params) => <div>{params?.row?.name.hindi || '-'}</div>,
          valueGetter: (params) => params.row.name.hindi,
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    tyreType: {
      patchApi: APIS.TYRE_TYPE,
      title: 'Tyre Type',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
        },
        {
          field: 'englishName',
          headerName: 'Name [En]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 250,
          renderCell: (params) => <div>{params.row.name.english}</div>,
          valueGetter: (params) => params.row.name.english,
        },
        {
          field: 'hindiName',
          headerName: 'Name [Hi]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => <div>{params?.row?.name.hindi || '-'}</div>,
          valueGetter: (params) => params.row.name.hindi,
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },

    vendor: {
      patchApi: APIS.VENDOR,
      title: 'Vendor',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
        },
        {
          field: 'englishName',
          headerName: 'Name [En]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 250,
          renderCell: (params) => <div>{params.row.name.english}</div>,
          valueGetter: (params) => params.row.name.english,
        },
        {
          field: 'hindiName',
          headerName: 'Name [Hi]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => <div>{params?.row?.name.hindi || '-'}</div>,
          valueGetter: (params) => params.row.name.hindi,
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    fuelVendors: {
      patchApi: APIS.FUELVENDORS,
      title: 'Fuel Vendors',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
        },
        {
          field: 'englishName',
          headerName: 'Name [En]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 250,
          renderCell: (params) => (
            <div>{params.row.contractorName.english}</div>
          ),
          valueGetter: (params) => params.row.contractorName.english,
        },
        {
          field: 'hindiName',
          headerName: 'Name [Hi]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.contractorName.hindi || '-'}</div>
          ),
          valueGetter: (params) => params.row.contractorName.hindi,
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.shortname,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.contractorName?.shortname || '-'}</div>
          ),
          valueGetter: (params) => params.row.contractorName?.shortname,
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    workshop: {
      patchApi: APIS.WORKSHOP,
      title: 'Workshop',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
        },
        {
          field: 'englishName',
          headerName: 'Name [En]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 250,
          renderCell: (params) => <div>{params.row.name.english}</div>,
          valueGetter: (params) => params.row.name.english,
        },
        {
          field: 'hindiName',
          headerName: 'Name [Hi]',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => <div>{params?.row?.name.hindi || '-'}</div>,
          valueGetter: (params) => params.row.name.hindi,
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'state',
          headerName: 'State',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
          renderCell: (params) => (
            <div>{params?.row?.stateId?.name?.english}</div>
          ),
        },
        {
          field: 'district',
          headerName: 'District',
          headerClassName: 'super-app-theme--header',
          width: 200,
          renderCell: (params) => (
            <div>{params?.row?.districtId?.name?.english}</div>
          ),
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },

    vehicleColour: {
      patchApi: APIS.VEHICE_COLOUR,
      title: 'Vehicle Colour',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',

          width: 200,
        },
        {
          field: 'vehicleGroupName',
          headerName: 'Name (En)',
          headerClassName: 'super-app-theme--header',
          width: 200,
          renderCell: (params) => <div>{params.row.name.english}</div>,
          valueGetter: (params) => params.row.name.english,
        },
        {
          field: 'vehicleTypeNameHindi',
          headerName: 'Name (Hi)',
          headerClassName: 'super-app-theme--header',

          width: 200,
          renderCell: (params) => <div>{params?.row?.name.hindi || '-'}</div>,
          valueGetter: (params) => params.row.name.hindi,
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    vehicleGroup: {
      patchApi: APIS.VEHICLE_GROUP,
      title: 'Vehicle Group',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          width: 200,
        },
        {
          field: 'vehicleGroupName',
          headerName: 'Name (En)',
          headerClassName: 'super-app-theme--header',
          width: 200,
          renderCell: (params) => <div>{params.row.name.english}</div>,
          valueGetter: (params) => params.row.name.english,
        },
        {
          field: 'vehicleTypeNameHindi',
          headerName: 'Name (Hi)',
          headerClassName: 'super-app-theme--header',

          width: 200,
          renderCell: (params) => <div>{params?.row?.name.hindi || '-'}</div>,
          valueGetter: (params) => params.row.name.hindi,
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    vehicleMake: {
      patchApi: APIS.VEHICLE_MAKE,
      title: 'Vehicle Make',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          //   type: 'number',
          width: 130,
          editable: false,
        },
        {
          field: 'makeNameEnglish',
          headerName: 'Name (En)',
          headerClassName: 'super-app-theme--header',
          width: 220,
          renderCell: (params) => <div>{params.row.name.english}</div>,
          valueGetter: (params) => params.row.name.english,
        },
        {
          field: 'makeNamehindi',
          headerName: 'Name (Hi)',
          headerClassName: 'super-app-theme--header',
          minWidth: 220,
          flex: 1,
          renderCell: (params) => <div>{params?.row?.name.hindi || '-'}</div>,
          valueGetter: (params) => params.row.name.hindi,
        },
        {
          field: 'countryOfOrigin',
          headerName: 'Origin',
          headerClassName: 'super-app-theme--header',
          width: 180,
          editable: false,
          renderCell: (params) => (
            <div>{params.row.countryOfOrigin.name.english}</div>
          ),
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 200,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    vehicleModel: {
      patchApi: APIS.VEHICLE_MODEL,
      title: 'Vehicle Model',
      columns: [
        {
          field: 'modelCode',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          width: 200,
          renderCell: (params) => <div>{params.row?.code}</div>,
        },
        {
          field: 'modelName',
          headerName: 'Name (En) ',
          headerClassName: 'super-app-theme--header',
          width: 220,
          renderCell: (params) => <div>{params.row?.name?.english}</div>,
        },
        {
          field: 'modelNameHinid',
          headerName: 'Name (Hi) ',
          headerClassName: 'super-app-theme--header',
          width: 220,
          renderCell: (params) => <div>{params.row?.name?.hindi}</div>,
        },
        {
          field: 'VehicleMakeId.vehicleMake',
          headerName: 'Name',
          headerClassName: 'super-app-theme--header',
          width: 180,
          editable: false,
          renderCell: (params) => (
            <div>{params.row?.vehicleMakeId?.name?.english}</div>
          ),
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    vehicleTrim: {
      patchApi: APIS.VEHICLE_TRIM,
      title: 'Vehicle Trim',
      columns: [
        {
          field: 'vehicleTrimCode',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          width: 150,
          renderCell: (params) => <div>{params.row.code}</div>,
        },
        {
          field: 'vehicleTrimName',
          headerName: 'Name (En)',
          headerClassName: 'super-app-theme--header',
          width: 350,
          renderCell: (params) => <div>{params?.row?.name?.english}</div>,
          valueGetter: (params) => params.row.name?.english,
        },
        {
          field: 'vehicleTrimHindi',
          headerName: 'Name (Hi)',
          headerClassName: 'super-app-theme--header',
          width: 350,
          renderCell: (params) => <div>{params?.row?.name?.hindi}</div>,
          valueGetter: (params) => params.row.name?.hindi,
        },
        {
          field: 'vehicleMake',
          headerName: 'Make',
          headerClassName: 'super-app-theme--header',
          width: 200,
          renderCell: (params) => (
            <div>{params.row.vehicleMakeId.name.english}</div>
          ),
        },
        {
          field: 'vehicleModel',
          headerName: 'Model',
          headerClassName: 'super-app-theme--header',
          width: 200,
          renderCell: (params) => (
            <div>{params?.row?.vehicleModelId?.name?.english || '-'}</div>
          ),
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    vehicleType: {
      patchApi: APIS.VEHICLE_TYPE,
      title: 'Vehicle Type',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',

          width: 200,
        },
        {
          field: 'vehicleTypeName',
          headerName: 'Name (En)',
          headerClassName: 'super-app-theme--header',
          width: 200,
          renderCell: (params) => <div>{params.row.name.english}</div>,
          valueGetter: (params) => params.row.name.english,
        },
        {
          field: 'vehicleTypeNameHindi',
          headerName: 'Name (Hi)',
          headerClassName: 'super-app-theme--header',

          width: 200,
          renderCell: (params) => <div>{params?.row?.name.hindi || '-'}</div>,
          valueGetter: (params) => params.row.name.hindi,
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    village: {
      patchApi: APIS.VILLAGE,
      title: 'Village',
      columns: [
        {
          field: 'code',
          headerName: 'Code',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
        },
        {
          field: 'englishName',
          headerName: 'Name (En)',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
          renderCell: (params) => <div>{params.row.name.english}</div>,
          valueGetter: (params) => params.row.name.english,
        },
        {
          field: 'hindiName',
          headerName: 'Name (Hi)',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
          renderCell: (params) => <div>{params?.row?.name.hindi || '-'}</div>,
          valueGetter: (params) => params.row.name.hindi,
        },
        {
          field: 'district',
          headerName: 'District',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
          renderCell: (params) => (
            <div>{params?.row?.districtId?.name?.english}</div>
          ),
        },
        {
          field: 'state',
          headerName: 'State',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
          renderCell: (params) => (
            <div>{params?.row?.stateId?.name?.english}</div>
          ),
        },
        {
          field: 'countryOfOrigin',
          headerName: 'Country',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.english,
          width: 200,
          renderCell: (params) => (
            <div>{params?.row?.countryOfOrigin?.name?.english}</div>
          ),
        },
        {
          field: 'shortName',
          headerName: 'Short Name',
          headerClassName: 'super-app-theme--header',
          valueFormatter: ({ value }) => value?.hindi,
          width: 250,
          renderCell: (params) => (
            <div>{params?.row?.shortName?.english || '-'}</div>
          ),
          valueGetter: (params) => params.row.shortName?.english,
        },
        {
          field: 'usage',
          headerName: 'Usage',
          headerClassName: '',
          width: 150,
          editable: false,
          renderCell: (params) => <div>{'-'}</div>,
        },
        {
          field: 'isActive',
          headerName: 'Status',
          headerClassName: 'super-app-theme--header',
          width: 150,
          editable: false,
          renderCell: (params) => (
            <div
              className="d-h-center cursor-pointer"
              onClick={() =>
                setModal({ isVisible: true, row: params.row, type: 'status' })
              }
            >
              <div
                className={`${
                  params.value ? 'mui-status-active' : 'mui-status-deactive'
                }`}
              >
                {params.value ? 'Active' : 'Inactive'}
              </div>
            </div>
          ),
        },
        {
          field: 'updatedAt',
          headerName: '',
          headerClassName: 'super-app-theme--header hide-img-bordersvg',
          width: 100,
          editable: false,
          renderCell: (params) => (
            <RowDetailsButton
              imgUrl="/assets/threeDotDataGrid.svg"
              imgAlt={`Image ${params.row.id}`}
              options={[
                {
                  title: 'Edit',
                  icon: editIcon({ width: 12, height: 12 }),
                  onClick: () => handleEdit(params?.row?._id),
                },
                {
                  title: 'Delete',
                  icon: deleteIcon({ width: 14, height: 14 }),
                  onClick: () => handleDelete(params?.row),
                },
              ]}
            />
          ),
        },
      ],
    },
    default: {
      patchApi: APIS.BRAKE_SYSTEM,
      title: 'Braking System',
      columns: [
        {
          field: 'name',
          headerName: 'Name(EN)',
          headerClassName: 'super-app-theme--header',
          // valueFormatter: ({ value }) => value?.english,
          width: 200,
        },
      ],
    },
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (pageSize) => {
    setPage(0);
    setPageSize(pageSize?.target.value);
  };

  const fetchData = () => {
    setLoading(true);
    const params = {
      page: page + 1,
      pageSize,
      search,
    };

    CommonMasterService.getMasterList(routeId, params)
      .then(({ data }) => {
        setRows(data?.data?.list);
        setTotalCount(data?.pagination?.totalCount);
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  };

  const onAddVechicle = () => {
    navigate(`${ROUTES.MASTERS}/${routeId}/add`);
  };
  const actionButtons = [
    {
      label: `+ Add ${
        routeId === 'busStop' ? 'Bus Stations / Stops' : startCase(routeId)
      }`,
      onClick: onAddVechicle,
      show: true,
      className: 'button',
    },
  ];
  const moreActionData = [
    {
      title: 'Import',
      type: 'vehicle',
      icon: importIcon({ width: 13, height: 13 }),
      onClick: () => {
        // const masterValue = 'depot';
        // navigate(`/import-data/${routeId}`);
        setShowModal(true);
      },
    },

    {
      title: 'Export CSV',
      icon: exportIcon({ width: 12, height: 11 }),
      // onClick: () => handleExportCSV(),
    },
  ];
  const actionData = {
    leftAction: [
      {
        title: 'Export',
        icon: exportIcon({ width: 12, height: 11 }),
        // onClick: handleSelectedExportCSV,
      },
      {
        title: 'Update Status',
        icon: exportIcon({ width: 12, height: 11 }),
        // onClick: () => setShowStatusModal(true),
      },
    ],
  };
  const breadcrumb = {
    backNavi: () => navigate(ROUTES.MASTERS),
    breadCrumbs: [],
    boldItem: 'Master',
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize, refresh, search]);

  return (
    <>
      {showModal && (
        <UpdateStatusModal routeId={routeId} setShowModal={setShowModal} />
      )}

      <DataTableComponent
        title={metaData[routeId].title}
        headers={(metaData[routeId] || metaData['default']).columns}
        rows={rows}
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
        tabComonent={
          <Tabs
            isActiveTab={''}
            // setIsActiveTab={setIsActiveTab}
            tabs={[]}
          />
        }
        actionButtons={actionButtons}
        moreActionData={moreActionData}
        // loading={loading}
        actionData={actionData}
        setSearch={setSearch}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        breadcrumb={breadcrumb}
      />
      <ConfrimationModal
        refresh={refresh}
        setRefresh={setRefresh}
        setModal={setModal}
        modal={modal}
        endpoint={metaData[routeId].patchApi}
      />
    </>
  );
};

export default CommonMastersList;
