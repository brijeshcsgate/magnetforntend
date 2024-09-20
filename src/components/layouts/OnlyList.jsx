import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '../ui/input';
import { SearchIcon } from 'lucide-react';
import { DataGrid } from '@mui/x-data-grid';
import useDebounce from '@/hooks/useDebounce';

const ListView = ({
  queryKey,
  queryFn,
  columns,
  pageSizeOptions = [10, 20, 25, 50, 100],
  defaultPageSize = 10,
  searchPlaceholder = 'Search',
  debounceDelay = 500,
  sortBy = 'createdAt',
}) => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, debounceDelay);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: defaultPageSize,
    page: 0,
  });
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const order = 'desc'; // You can change this if you need different sorting

  const { isFetching } = useQuery({
    queryKey: [queryKey, paginationModel, debouncedSearch, sortBy, order],
    queryFn: () =>
      queryFn({
        page: paginationModel.page,
        pageSize: paginationModel.pageSize,
        search: debouncedSearch,
        sortBy,
        order,
      }).then((data) => {
        setRows(data.data);
        setTotalCount(data.totalCount);
        return data;
      }),
    keepPreviousData: true,
  });

  const handlePaginationModelChange = (newPaginationModel) => {
    setPaginationModel(newPaginationModel);
  };

  return (
    // <section className="bg-white w-full flex-1 py-4 shadow-lg">
    //   {/* Search Input */}
    //   <section className="flex justify-between items-center px-4">
    //     <div className="flex items-center gap-4">
    //       <div className="relative">
    //         <Input
    //           type="text"
    //           value={search}
    //           onChange={(e) => setSearch(e.target.value)}
    //           placeholder={searchPlaceholder}
    //           className="py-2 pr-10 pl-4"
    //           disabled={isFetching}
    //         />
    //         <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
    //           <SearchIcon className="size-4" />
    //         </span>
    //       </div>
    //     </div>
    //   </section>

    //   {/* DataGrid Component */}
    <section className="w-full h-[calc(70vh-185px)]">
      <DataGrid
        rows={rows} // Make sure 'rows' is being populated correctly
        columns={columns} // Ensure 'columns' field names match 'rows' object keys
        paginationMode="server"
        rowCount={totalCount} // Ensure 'totalCount' is correctly fetched
        pageSizeOptions={pageSizeOptions}
        paginationModel={paginationModel}
        onPaginationModelChange={handlePaginationModelChange}
        disableRowSelectionOnClick
        loading={isFetching}
      />
    </section>
  );
};

export default ListView;
