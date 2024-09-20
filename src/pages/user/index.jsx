/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from 'react';
import DataTableComponent from '@/components/DataGrid/TableWithHead';
import Tabs from '@/components/common/Tabs/Tabs';

import '../Vehicles/List.css';
import {
  initialTableOptions,
  staffActionButtons,
  staffMoreActionData,
} from '@/utils/users.utils/users.options';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { APIS } from '@/constants/api.constant';
import { getApi, postApi } from '@/services/method';
import { modifyUserResponse } from '@/utils/users.utils/users.helper';
import RowDetailsButton from '@/components/DataGrid/RowDetailsButton';
import { editIcon, deleteIcon } from '@/assets/Icons';
import { ROUTES } from '@/constants/route.constant';
import ConfrimationModal from '@/components/common/ConfrimationModal';
import { Tooltip } from '@mui/material';
const UserManagement = () => {
  const navigate = useNavigate();
  const [isActiveTab, setIsActiveTab] = useState('All');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [totalCount, setTotalCount] = useState(0);
  const [rows, setRows] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState('');
  const [tableOptions, setTableOptions] = useState(initialTableOptions);
  const [loading, setLoading] = useState(false);
  const [isClearAll, setIsClearAll] = useState(false);
  const [extraFilter, setExtraFilter] = useState({
    roleId: [],
    depotId: [],
    regionId: [],
  });
  const [modal, setModal] = useState({
    isVisible: false,
    row: null,
    type: '',
  });
  const handleTable = (name, value) => {
    setTableOptions({ ...tableOptions, [name]: value });
  };
  const navigateToEdit = (rowData) => {
    navigate(`${ROUTES.UPDATE_USER}/${rowData?._id}`, {
      state: { isEditeActive: true },
    });
  };
  const handleDelete = (row) => {
    setModal({ isVisible: true, row, type: 'delete' });
  };
  const handleInvite = (row) => {
    const payload = {
      name: row?.name,
      loginEmail: row?.email,
      _id: row?._id,
    };
    postApi(APIS.INVITE, payload).then((res) => {
      toast.success('Invited');
    });
  };

  const onGetUsersApi = (isImport) => {
    !isImport && setLoading(true);
    const payload = {
      page,
      pageSize,
      search,
    };

    // if (isActiveTab === "All") {
    let url = `${APIS.USER_LIST}?pageSize=${pageSize}&page=${
      page + 1
    }&search=${search}&roleId=${extraFilter.roleId}&depotId=${
      extraFilter.depotId
    }&regionId=${extraFilter.regionId}`;
    getApi(url, null, payload)
      .then((response) => {
        modifyUserResponse({
          setRows,
          setTotalCount,
          response,
          page,
          pageSize,
        });
      })
      .finally(() => setLoading(false));
  };
  useMemo(() => {
    onGetUsersApi();
  }, [page, pageSize, refresh, isActiveTab, search, extraFilter]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (newPageSize) => {
    setPage(1);
    setPageSize(newPageSize?.target.value);
  };
  const commonKeys = {
    headerClassName: 'super-app-theme--header remove-separator',
    width: 180,
  };
  const commonKeys90 = {
    headerClassName: 'super-app-theme--header remove-separator',
    width: 90,
  };
  const commonKeys120 = {
    headerClassName: 'super-app-theme--header remove-separator',
    width: 120,
  };

  const LIST_OF_FILTERS = [
    {
      title: 'Roles',
      name: 'designation',
      endpoint: 'v2/masters/userrole/dropdown',
      submitAction: (data) => {
        if (data) {
          let getIds = data.map((item) => item.value);
          setExtraFilter({ ...extraFilter, roleId: getIds });
          setIsClearAll(true);
        } else {
          setExtraFilter({ ...extraFilter, roleId: [] });
        }
      },
      isClearAll: !isClearAll,
    },
    {
      title: 'Region',
      name: 'region',
      submitAction: (data) => {
        if (data) {
          let getIds = data.map((item) => item.value);
          setExtraFilter({ ...extraFilter, regionId: getIds });
          setIsClearAll(true);
        } else {
          setExtraFilter({ ...extraFilter, regionId: [] });
        }
      },
      isClearAll: !isClearAll,
    },
    {
      title: 'Depot',
      name: 'depot',
      submitAction: (data) => {
        if (data) {
          let getIds = data.map((item) => item.value);
          setExtraFilter({ ...extraFilter, depotId: getIds });
          setIsClearAll(true);
        } else {
          setExtraFilter({ ...extraFilter, depotId: [] });
        }
      },
      isClearAll: !isClearAll,
    },

    {
      title: isClearAll === true ? 'Clear All' : '',
      className: 'clear-all-button',
      type: 'button',
      submitAction:
        isClearAll === true
          ? (data) => {
              setIsClearAll(false);
              setIsActiveTab('All');
              setExtraFilter({ depotId: [], regionId: [], roleId: [] });
            }
          : '',
    },
  ];
  const TableHeaders = [
    // {
    //   field: "index",
    //   headerName: "S. no.",
    //   ...commonKeys120,
    // },

    {
      field: 'name',
      headerName: 'Name',
      ...commonKeys,
    },
    {
      field: 'mobileNumber',
      headerName: 'Mobile No.',
      ...commonKeys,
    },
    {
      field: 'email',
      headerName: 'Email',
      ...commonKeys,
    },
    {
      field: 'roleType',
      headerName: 'Roles',
      ...commonKeys,
    },

    {
      field: 'region',
      headerName: 'Region',
      ...commonKeys,
      renderCell: (params) => {
        const regionsNames =
          params?.row?.region?.map((item) => item?.english) || [];

        if (regionsNames.length === 1) {
          return <div>{regionsNames[0]}</div>;
        } else if (regionsNames.length > 1) {
          return (
            <Tooltip title={regionsNames.join(', ')}>
              <div>
                {regionsNames[0]}
                <span style={{ fontWeight: '200' }}>{` |  +${
                  regionsNames.length - 1
                } more`}</span>
              </div>
            </Tooltip>
          );
        }

        return <span className=" w-100">{`-`}</span>;
      },
    },
    {
      field: 'depot',
      headerName: 'Depots',
      ...commonKeys,
      renderCell: (params) => {
        // Extract service names from allData
        const depotsNames =
          params?.row?.depot?.map((item) => item?.english) || [];
        // If there is only one service, display just the name
        if (depotsNames.length === 1) {
          return <div>{depotsNames[0]}</div>;
        } else if (depotsNames.length > 1) {
          return (
            <Tooltip title={depotsNames.join(', ')}>
              <div>
                {depotsNames[0]}
                <span style={{ fontWeight: '200' }}>{` |  +${
                  depotsNames.length - 1
                } more`}</span>
              </div>
            </Tooltip>
          );
        }

        return <span className=" w-100">{`-`}</span>;
      },
    },

    {
      field: 'threedot',
      headerName: 'Action',
      headerClassName: 'super-app-theme--header hide-img-bordersvg',
      width: 100,
      renderCell: (params) => (
        <RowDetailsButton
          imgUrl={params.value}
          imgAlt={`Image ${params.row.id}`}
          options={[
            {
              title: 'Edit',
              icon: editIcon({ width: 12, height: 12 }),
              onClick: () => navigateToEdit(params.row),
            },
            {
              title: 'Delete',
              icon: deleteIcon({ width: 14, height: 14 }),
              onClick: () => handleDelete(params?.row),
            },
            {
              title: 'Invite',
              icon: deleteIcon({ width: 14, height: 14 }),
              onClick: () => handleInvite(params?.row),
            },
          ]}
        />
      ),
    },
  ];
  useMemo(() => {
    if (isActiveTab !== 'All') {
      setIsClearAll(true);
    } else {
      setIsClearAll(false);
    }
  }, [isActiveTab]);
  return (
    <>
      <DataTableComponent
        title="Users"
        headers={TableHeaders}
        rows={rows}
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
        handlePageChange={handlePageChange}
        handlePageSizeChange={handlePageSizeChange}
        tabComonent={<Tabs isActiveTab={''} setIsActiveTab={''} tabs={[]} />}
        setSearch={setSearch}
        actionButtons={staffActionButtons(navigate)}
        moreActionData={staffMoreActionData}
        onGetVehicleApi={(e) => onGetUsersApi(e)}
        loading={tableOptions.loading}
        LIST_OF_FILTERS={LIST_OF_FILTERS}
      />
      <ConfrimationModal
        refresh={refresh}
        setRefresh={setRefresh}
        setModal={setModal}
        modal={modal}
        endpoint={`${
          import.meta.env.VITE_APP_BASE_URL_V1
        }adminusers/userDeleteById`}
      />
    </>
  );
};
export default UserManagement;
