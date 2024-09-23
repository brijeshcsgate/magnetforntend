import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { SearchIcon } from 'lucide-react';
import { DataGrid } from '@mui/x-data-grid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import useDebounce from '@/hooks/useDebounce';
import { CounterContext } from '../Layout/commonLayout/TitleOfPageProvider';
import { FilterDropdown } from '../DataGrid/DataTableAction/DataTableAction';
import {
  kanbanNotUsedButton,
  kanbanUsedButton,
  listNotUsedButton,
  listUsedButton,
} from '@/assets/Icons';
import KanbanBoard from '@/pages/issues/KanBan';

const PaginatedTableView = ({

  columns_data, rows_data, pageSizeOptions_data = [5, 10], loading = false, checkboxSelection = false,
  queryKey,
  queryFn,
  LIST_OF_FILTERS,
  columns,
  pageSizeOptions = [10, 20, 25, 50, 100],
  defaultPageSize = 10,
  searchPlaceholder = 'Search',
  headButtons = [],
  pageName = 'Table',
  tabs = [{ label: 'All', value: 'all' }],
  debounceDelay = 500,
  sortBy = 'createdAt',
  isGrid,
  isGridOpened,
  girdData,
}) => {
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState(isGridOpened ? 'grid' : 'list'); // State to manage view mode
  const debouncedSearch = useDebounce(search, debounceDelay);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: defaultPageSize,
    page: 0,
  });
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [activeTab, setActiveTab] = useState(tabs[0].value); // Track the active tab
  const order = 'desc';
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };
  const handlePaginationModelChange = (newPaginationModel) => {
    setPaginationModel(newPaginationModel);
  };

  const { isFetching } = useQuery({
    queryKey: [
      queryKey,
      paginationModel,
      debouncedSearch,
      sortBy,
      order,
      activeTab,
    ],
    queryFn: () =>
      queryFn({
        page: paginationModel.page,
        pageSize: paginationModel.pageSize,
        search: debouncedSearch,
        sortBy,
        order,
        tab: activeTab, // Pass the active tab to the query function
      }).then((data) => {
        setRows(data.data);
        setTotalCount(data.totalCount);
        return data;
      }),
    keepPreviousData: true,
  });
  const { setCount } = useContext(CounterContext);

  useEffect(() => {
    setCount(pageName);
  }, []);

  function FilterButtons({ LIST_OF_FILTERS }) {
    return (
      <>
        <div className="flex gap-2 items-center justify-center">
          {LIST_OF_FILTERS?.map((item, index) => {
            return item.type === 'button' ? (
              <button onClick={item.submitAction} className={item.className}>
                {item.title}
              </button>
            ) : (
              <FilterDropdown
                title={item.title}
                submitAction={item.submitAction}
                name={item.name}
                key={index}
                endpoint={item.endpoint}
                isClearAll={item.isClearAll}
              />
            );
          })}
        </div>
      </>
    );
  }
  return (
    <section className="bg-white w-full flex-1 py-4 shadow-lg">
      <section className="flex justify-between items-center px-4   ">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="py-2 pr-10 pl-4"
                disabled={isFetching}
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                <SearchIcon className="size-4" />
              </span>
            </div>
            <FilterButtons LIST_OF_FILTERS={LIST_OF_FILTERS} />
          </div>
        </div>
        <section className="flex items-start justify-center gap-3">
          {isGrid && (
            <div className="flex gap-3 cursor-pointer">
              <div onClick={() => handleViewModeChange('grid')}>
                {viewMode === 'grid'
                  ? kanbanUsedButton({ height: '32' })
                  : kanbanNotUsedButton({ height: '32' })}
              </div>
              <div onClick={() => handleViewModeChange('list')}>
                {viewMode === 'list'
                  ? listUsedButton({ height: '32' })
                  : listNotUsedButton({ height: '32' })}
              </div>
            </div>
          )}
          {headButtons.map((button, index) => (
            <React.Fragment key={index}>{button.children}</React.Fragment>
          ))}
        </section>
      </section>
      <Tabs defaultValue={tabs[0].value} onValueChange={setActiveTab}>
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <section className="pl-4 pr-4 flex flex-col gap-4">
              <section className="flex items-center justify-between gap-4">
                <div></div>
              </section>
              <section className="w-full h-[calc(100vh-185px)]">
                {viewMode === 'grid' ? (
                  <div className="table-container ">
                    <KanbanBoard tasks={girdData} />
                  </div>
                ) : (

                  <DataGrid
                    rows={rows_data}
                    columns={columns_data}
                    loading={loading}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={pageSizeOptions_data}
                    checkboxSelection={checkboxSelection}
                    sx={{
                      border: '1 solid grey',
                      '& .custom-header': {
                        backgroundColor: '#f0f0f0', // Custom background color for headers
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#002850', 
                        // borderColor:'grey'// Custom font color
                      },}}
                  />
                )}
              </section>
            </section>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default PaginatedTableView;














                  // <DataGrid
                  //   rows={rows}
                  //   columns={columns}
                  //   paginationMode="server"
                  //   rowCount={totalCount}
                  //   pageSizeOptions={pageSizeOptions}
                  //   paginationModel={paginationModel}
                  //   onPaginationModelChange={handlePaginationModelChange}
                  //   disableRowSelectionOnClick
                  //   loading={isFetching}
                  // />