import { DataGrid } from '@mui/x-data-grid';
import { useContext, useEffect, useState } from 'react';
import {
  dotIcon,
  kanbanNotUsedButton,
  kanbanUsedButton,
  listNotUsedButton,
  listUsedButton,
} from '@/assets/Icons';
import { TablePagination } from '@mui/material';
import RenderActionButtons from './RenderActionButtons';
import BreadCrumbs from '@/components/common/BreadCrumbs/BreadCrumbs';
import { Button } from '@/components/ui/button';
import KanbanBoard from '@/pages/issues/KanBan';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';

const TableWithHead = (props) => {
  const {
    title,
    headers,
    rows,
    loading,
    page,
    pageSize,
    totalCount,
    onPageChange,
    onPageSizeChange,
    onRowSelectionChange,
    actionButtons,
    moreActionData,
    onGetVehicleApi,
    breadcrumb,
    checkboxSelection,
    isGrid,
    isGridOpened,
    girdData,
  } = props;

  const [uploadLoader, setUploadLoader] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [viewMode, setViewMode] = useState(isGridOpened ? 'grid' : 'list'); // State to manage view mode

  const renderActionButton = (button, index) => (
    <Button onClick={button.onClick} key={index}>
      {button.label}
    </Button>
  );

  const handleMoreButtonClick = () => {
    setIsMoreOpen(true);
  };

  const handleMoreClose = () => {
    setUploadLoader(false);
    setIsMoreOpen(false);
  };

  const handleSelectRow = (rows, selectedRowsIdx) => {
    let selectedRows = Array.isArray(selectedRowsIdx)
      ? rows.filter((item) => selectedRowsIdx.includes(item._id))
      : [];
    onRowSelectionChange(selectedRows);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };
  const {setCount } = useContext(CounterContext);

  useEffect(() => { 
    setCount('Masters');
  }, []);
  
  return (
    <div className="vehicle-wrap h-100 pt-4">
      <div className="head " >
        <div>
          {breadcrumb ? (
            <BreadCrumbs
              backNavi={breadcrumb.backNavi}
              breadCrumbs={breadcrumb?.breadCrumbs}
              boldItem={breadcrumb?.boldItem}
            />
          ) : null}
          <div className="font-semibold text-2xl text-[#002850]">{title}</div>
        </div>

        <div className="head-btns">
          {isGrid && (
            <div className="flex gap-3">
              <div
                onClick={() => handleViewModeChange('grid')}
                style={{ cursor: 'pointer' }}
              >
                {viewMode === 'grid'
                  ? kanbanUsedButton({})
                  : kanbanNotUsedButton({})}
              </div>
              <div
                onClick={() => handleViewModeChange('list')}
                style={{ cursor: 'pointer' }}
              >
                {viewMode === 'list'
                  ? listUsedButton({})
                  : listNotUsedButton({})}
              </div>
            </div>
          )}
          <RenderActionButtons
            actionButtons={actionButtons}
            handleMoreButtonClick={handleMoreButtonClick}
            isMoreOpen={isMoreOpen}
            uploadLoader={uploadLoader}
            moreActionData={moreActionData}
            renderActionButton={renderActionButton}
            setIsMoreOpen={setIsMoreOpen}
            setUploadLoader={setUploadLoader}
            onGetVehicleApi={onGetVehicleApi}
            handleMoreClose={handleMoreClose}
            dotIcon={dotIcon}
            isGrid={isGrid}
            isGridOpened={isGridOpened}
          />
        </div>
      </div>
      {props.tabsComponent}
      {props.dataTableActions}
      <div className="flex-1 overflow-y-auto ">
        {viewMode === 'grid' ? (
          <div className="table-container ">
            <KanbanBoard tasks={girdData} />
          </div>
        ) : (
          <div className="table-container">
            <DataGrid
              loading={loading}
              rows={rows}
              columns={headers}
              getRowId={(r) => r._id}
              pagination={false}
              hideFooterPagination
              disableRowSelectionOnClick
              checkboxSelection={checkboxSelection}
              onRowSelectionModelChange={(selectedIdxs) =>
                handleSelectRow(rows, selectedIdxs)
              }
            />
            <div className="ml-5 flex items-end justify-end bottom-2 right-2 w-100 vehicles-footer">
              <TablePagination
                sx={{
                  backgroundColor: 'white',
                  height: '40px',
                }}
                component="div"
                count={totalCount}
                rowsPerPage={pageSize}
                page={page}
                onRowsPerPageChange={onPageSizeChange}
                onPageChange={onPageChange}
                rowsPerPageOptions={[15, 25, 50]}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableWithHead;
