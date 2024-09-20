import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { searchIcon } from '@/assets/Icons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatDate } from '@/utils/dateHelper';

export default function TimeTablesTable({ timetables }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  let rowData =
    timetables.services?.flatMap((service) =>
      service.vehiclesTimeTable?.flatMap((vehiclesTimeTable) =>
        vehiclesTimeTable.allTimetable?.map((t) => ({
          id: Math.floor(1000 + Math.random() * 9000),
          vehicleNo_service: `${vehiclesTimeTable?.vehicle?.identification?.registrationNumber} -
          ${vehiclesTimeTable.service.name.english}`,
          code_routeName: `${timetables.route.routeCode} - ${timetables.route.name}`,
          origin_destination: `${timetables.route.outbound.origin.name.english} - ${timetables.route.outbound.destination.name.english}`,
          dateTime: `${formatDate(t.date, 'day')} ${formatDate(
            t.date,
            'date'
          )}, ${formatDate(t.stages[0].departureTime, 'time')} - ${formatDate(
            t.stages[t.stages.length - 1].arrivalTime,
            'time'
          )}`,
          date: formatDate(t.date, 'date'),
          startTime: formatDate(t.stages[0].departureTime, 'time'),
          endTime: formatDate(
            t.stages[t.stages.length - 1].arrivalTime,
            'time'
          ),
          service: service,
          vehiclesTimeTable: vehiclesTimeTable,
          t: t,
        }))
      )
    ) || [];

  rowData.sort((a, b) => new Date(a.date) - new Date(b.date));
  const filterFutureDates = (dates) => {
    return dates.filter(
      (item) =>
        new Date(item.date) >=
        new Date(new Date().setDate(new Date().getDate() - 1))
    );
  };

  const filteredRows = filterFutureDates(
    rowData.filter((row) => {
      const searchTermLower = searchTerm.toLowerCase();
      return (
        row.vehicleNo_service.toLowerCase().includes(searchTermLower) ||
        row.code_routeName.toLowerCase().includes(searchTermLower) ||
        row.origin_destination.toLowerCase().includes(searchTermLower) ||
        row.dateTime.toLowerCase().includes(searchTermLower) ||
        row.startTime.includes(searchTerm) ||
        row.endTime.includes(searchTerm)
      );
    })
  );

  const columns = [
    {
      field: 'vehicleNo_service',
      headerName: 'Vehicle No - Service',
      width: 250,
    },
    { field: 'code_routeName', headerName: 'Code & Route Name', width: 400 },
    {
      field: 'origin_destination',
      headerName: 'Origin - Destination',
      width: 250,
    },
    { field: 'dateTime', headerName: 'Date & Time', width: 300 },
  ];
  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setOpen(true);
  };

  return (
    <section className="h-[calc(100vh-169px)]">
      <section className="p-4 flex justify-between items-center ">
        <div />
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="border border-[#E0E0E0] w-full rounded-full py-2 text-sm pr-10 pl-4 focus:outline-none"
          />
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
            {searchIcon({ width: 20, height: 20, fill: '#424850' })}
          </span>
        </div>
      </section>
      <section className="w-full h-[calc(100vh-240px)] px-5 pb-5 ">
        <DataGrid
          rows={filteredRows}
          columns={columns}
          onRowClick={handleRowClick}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 50, 100]}
          disableRowSelectionOnClick
        />
      </section>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedRow?.vehicleNo_service}</DialogTitle>
            <DialogDescription>{selectedRow?.code_routeName}</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-4 p-4">
            <section>
              <div className="flex flex-col md:grid grid-cols-12 text-gray-50">
                {selectedRow?.t?.stages.map((p) => {
                  return (
                    <div className="flex md:contents" key={p._id}>
                      <div className="col-start-2 col-end-4 mx-4 md:mr-10 md:mx-auto relative">
                        <div className="h-full w-6 flex items-center justify-center">
                          <div className="h-full w-0.5 bg-black pointer-events-none"></div>
                        </div>
                        <div className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-gray-100 shadow text-center flex justify-center items-center">
                          <div className="bg-[#002850] w-4 h-4 rounded-full" />
                        </div>
                      </div>
                      <div className="bg-gray-100 text-black col-start-4 col-end-12 p-4 rounded-md my-2 mr-4 md:mr-auto w-full">
                        <p className="font-semibold text-justify text-sm truncate">
                          {p?.stage?.name?.english}
                        </p>
                        <span className="">
                          {formatDate(p.arrivalTime, 'time')} -{' '}
                          {formatDate(p.departureTime, 'time')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
